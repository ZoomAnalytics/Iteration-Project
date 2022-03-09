import React from 'react';

function Login(props) {
  return (
    <div id="login-container">
      <h1> Login Page </h1>    
      {/* <button onClick = {props.loginPage}>Log in with Zoom</button> */}
      <a href="https://zoom.us/oauth/authorize?response_type=code&client_id=ih_6n4W4SuqRMg0qIXoRtQ&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fhome">Log in with Zoom</a>
    </div>
  )
}

export default Login;