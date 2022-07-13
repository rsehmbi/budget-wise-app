
import '../Css/App.css';
import * as React from "react";
import {GoogleLogin} from 'react-google-login'
import {useEffect, useState} from "react";
import {gapi} from "gapi-script"
import {Button, Form, Input, message, Modal, Row} from "antd";
// @ts-ignore
import {deleteAllCookies, encrypted} from "./Main.tsx";
// @ts-ignore
import {LoginCall, SignUp} from "../Services/Login.ts";
import {MailOutlined} from "@ant-design/icons";


function Login(props) {
    const [form] = Form.useForm()
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

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

    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            await form.validateFields();
            SignUp(encrypted(email)).then((response) => {
                response.json().then((response) => {
                    if (response.isSuccess) {
                        form.setFieldsValue(({ email: '' }))
                        setVisible(false);
                        setConfirmLoading(false);
                    }
                    else {
                        form.setFieldsValue(({ email: '' }))
                        setVisible(false);
                        setConfirmLoading(false);
                    }
                })
            })
        } catch (errorInfo) {
            setConfirmLoading(false);
            message.error("The input is not valid E-mail!")
        }
    };

    const handleCancel = () => {
        form.setFieldsValue(({ email: '' }))
        setEmail("")
        setVisible(false);
    };

  return (
      <div className="container">
          <div className="login-section" style={{width: "60vh"}}>
              <Row style={{justifyContent: "center", alignItems: "center", height: "50px", fontSize: "35px"}}>Budget Wise App</Row>
              <br />
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
                  <Button onClick={() => {setVisible(true)}} style={{marginLeft: "20px"}}>Sign up</Button>
                  <Modal
                      title="Write your email please"
                      visible={visible}
                      onOk={handleOk}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                  >
                      <Form form={form} className="login-form" >
                          <Form.Item name={'email'} label="Email" rules={[{ type: 'email',message: "The input is not valid E-mail!" }]}>
                     {/* <Form.Item rules={[{required: true,type: "email",message: "The input is not valid E-mail!"}]} name={"email"}>*/}
                              <Input
                                  onChange={(e) => {setEmail(e.target.value)}}
                                  prefix={<MailOutlined  style={{ color: "rgba(0,0,0,.25)" }}/>}
                                  placeholder="Email"
                              />
                      </Form.Item>
                      </Form>
                  </Modal>
              </Row>
          </div>
      </div>
  );
}

export default Login;
