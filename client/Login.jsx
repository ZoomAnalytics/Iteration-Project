import React from 'react';

function Login(props) {
  return (
    <div id="login-container">
      <h1> Login Page </h1>    
      {/* <button onClick = {props.loginPage}>Log in with Zoom</button> */}
      <a href="https://zoom.us/oauth/authorize?response_type=code&client_id=150y1dfvSZa9MV9NgIQKwA&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fhome">Log in with zoom</a>
    </div>
  )
}

export default Login;