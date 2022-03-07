import React from 'react';

function Login(props) {
  return (
    <div id="login-container">
      <h1> Login Page </h1>    
      <button onClick = {props.loginPage}>Log in with Zoom</button>
    </div>
  )
}

export default Login;