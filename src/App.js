import React from 'react'

import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Login from './components/Login'
import SignUp from './components/SignUp'
import Todos from './components/Todos'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" Component={Login}/>
        <Route exact path='/signup' Component={SignUp}/>
        <Route exact path="/" Component={Todos}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App