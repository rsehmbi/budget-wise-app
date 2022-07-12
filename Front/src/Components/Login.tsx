
import '../Css/App.css';
import * as React from "react";
import {GoogleLogin} from 'react-google-login'
import {useEffect} from "react";
import {gapi} from "gapi-script"
import {Button, message, Row} from "antd";
// @ts-ignore
import {deleteAllCookies, encrypted} from "./Main.tsx";
// @ts-ignore
import {LoginCall} from "../Services/Login.ts";


function Login(props) {

  const onSuccess = (res) => {
      deleteAllCookies()
      sessionStorage.clear();
      localStorage.clear()
      LoginCall(encrypted(res.profileObj.email)).then((response) => {
          response.json().then((response) => {
              if (response.isSuccess) {
                  localStorage.setItem("token", response.token)
                  props.setEmail(res.profileObj.email)
              }
              else {
                  sessionStorage.clear();
                  localStorage.clear()
                  message.error("Your account have no permission to access")
              }
          })
      })
  }

  const onFailure = (res) => {
    console.log("Login Failed! res: ", res)
  }

  return (
    <div>
      <Row style={{justifyContent: "center", alignItems: "center", height: "50px", fontSize: "35px"}}>Budget Wise App</Row>
      <Row style={{justifyContent: "center", paddingTop: "40px"}}>
          <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                  <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    Login
                  </Button>
              )}
              buttonText="Login"
              onSuccess={(res) => {onSuccess(res)}}
              onFailure={(res) => {onFailure(res)}}
              cookiePolicy={'single_host_origin'}
          />
      </Row>


    </div>
  );
}

export default Login;
