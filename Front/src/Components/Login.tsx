
import '../Css/App.css';
import * as React from "react";
import {GoogleLogin} from 'react-google-login'
import {useEffect} from "react";
import {gapi} from "gapi-script"
import {Button, Row} from "antd";


function Login() {

  const onSuccess = (res) => {
    console.log("Login success! current user: ", res.profileObj)
  }

  const onFailure = (res) => {
    console.log("Login Failed! res: ", res)
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <div>
      <Row style={{justifyContent: "center", alignItems: "center", height: "50px"}}>Budget Wise App</Row>
      <Row style={{justifyContent: "center"}}>
          <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
          />
      </Row>


    </div>
  );
}

export default Login;
