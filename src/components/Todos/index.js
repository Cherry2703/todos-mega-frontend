
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import './index.css';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoStatus, setNewTodoStatus] = useState('pending'); // Default status
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate(); 

  useEffect(() => {
    // Check for JWT token in cookies
    const jwtToken = Cookies.get('jwtToken'); 
    if (!jwtToken) {
      navigate('/login'); 
      return;
    }

    const fetchTodos = async () => {
      try {
        const response = await fetch('https://todos-2-k8dk.onrender.com/todos/', {
          headers: {
            Authorization: `Bearer ${jwtToken}` // Include token in the request headers
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [navigate]); // Include navigate in dependency array

  const handleAddTodo = async () => {
    if (!newTodoText) return; // Do not add empty todo

    const response = await fetch('https://todos-2-k8dk.onrender.com/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwtToken')}`, // Include token in the request headers
      },
      body: JSON.stringify({ todo_text: newTodoText, todo_status: newTodoStatus }),
    });

    if (response.ok) {
      const newTodo = await response.json(); // Await the response to ensure it is processed
      setTodos((prevTodos) => [...prevTodos, newTodo]); // Update the state with the new todo
      setNewTodoText(''); // Clear the input field after adding
      setNewTodoStatus('pending'); // Reset to default status after adding
      window.location.reload();
    } else {
      setError('Failed to add todo'); // Handle error
    }
  };

  const onClickLogoutbtn=()=>{
    Cookies.remove('jwtToken');
    navigate('/login')
  }

  const handleUpdateTodo = async (todoId) => {
    const todoToUpdate = todos.find(todo => todo.todo_id === todoId);

    // Prompt the user for new values
    const updatedText = prompt('Enter new todo text:', todoToUpdate.todo_text);
    const updatedStatus = prompt('Enter new todo status (pending, in progress, completed):', todoToUpdate.todo_status);

    if (!updatedText || !updatedStatus) {
      return; 
    }

    const updatedTodo = {
      todo_text: updatedText,
      todo_status: updatedStatus,
    };

    const response = await fetch(`https://todos-2-k8dk.onrender.com/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwtToken')}`, // Include token in the request headers
      },
      body: JSON.stringify(updatedTodo),
    });

    if (response.ok) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id === todoId ? { ...todo, todo_text: updatedText, todo_status: updatedStatus } : todo
        )
      );
      // Clear input fields after updating
      setNewTodoText('');
      setNewTodoStatus('pending');
    } else {
      setError('Failed to update todo'); // Handle error
    }
  };

  const handleDeleteTodo = async (todoId) => {
    const response = await fetch(`https://todos-2-k8dk.onrender.com/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`, // Include token in the request headers
      },
    });

    if (response.ok) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== todoId));
    } else {
      setError('Failed to delete todo'); // Handle error
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className='todo-main-cont'>
    
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="todo-form">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)} // Update state on input change
          placeholder="Add a new todo"
        />
        <select
          value={newTodoStatus}
          onChange={(e) => setNewTodoStatus(e.target.value)} // Update status on change
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.todo_id} className="todo-item">
            <span>{todo.todo_text} - <strong>{todo.todo_status}</strong></span>
            <div className="todo-buttons">
              <button onClick={() => handleUpdateTodo(todo.todo_id)}>Update</button>
              <button onClick={() => handleDeleteTodo(todo.todo_id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <button className='logout-btn' onClick={onClickLogoutbtn}>Logout</button>
      </div>
    </div>
    </div>
  );
};

export default Todos;


