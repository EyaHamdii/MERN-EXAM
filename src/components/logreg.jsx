import React from 'react'
import Login from "./login"
import Signup from "./registration"
import "bootstrap/dist/css/bootstrap.css"

const LoginRegister = () => {
  return (
    <div >
              
            <div className='nav align-items-center justify-content-center '>
            </div>
        <div className='d-flex'>
        <Signup/>
        <Login/>
        </div>

    </div>
  )
}

export default LoginRegister