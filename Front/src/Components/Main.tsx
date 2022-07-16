import {LoginOutlined} from '@ant-design/icons';
import '../Css/App.css';
// @ts-ignore
import BudgetPlanner from './BudgetPlanner.tsx';
// @ts-ignore
import BudgetTable from './BudgetLog.tsx';
import * as React from "react";
// @ts-ignore
import Login from "./Login.tsx";
import CryptoJS from "crypto-js"
import {useEffect} from "react";
import {gapi} from "gapi-script";
// @ts-ignore
import {isAuth} from "../Services/Login.ts";
import {Button, Col, message, Row, Tooltip} from "antd";
import {HashRouter, Route, Routes} from 'react-router-dom'
// @ts-ignore
import App from "./App.tsx";


export function encrypted(encryptString: string){
    return encodeURIComponent(CryptoJS.AES.encrypt(encryptString, process.env.REACT_APP_EncryptedPass).toString())
}

export function decrypted(decryptedString: string){
    let newDecryptedString = decodeURIComponent(decryptedString)
    const decrypted = CryptoJS.AES.decrypt(newDecryptedString, process.env.REACT_APP_EncryptedPass);
    return decrypted.toString(CryptoJS.enc.Utf8)
}

export function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}


function Main() {
    const [email, setEmail] = React.useState(undefined);

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
        if ((email === undefined) && localStorage.getItem("token") !== null ){
            isLoggedIn()
        }
    }, []);

    const isLoggedIn =() => {
        isAuth().then((response) => {
            response.json().then((response) => {
                if (!response.auth) {
                    console.log(response.status)
                    logOut()
                }
                else {
                    setEmail(response.email)
                }
            })
        })
    }

    const logOut = () => {
        deleteAllCookies()
        localStorage.clear()
        setEmail(undefined)
    }

    const renderMenu = () => {
        return (
            <div>
                <Row style={{height: "50px", width: "100%", position: "fixed", top: 0, boxShadow: "0 2px 8px #f0f1f2",zIndex: 1000, backgroundColor: "#e7e7e7"}}>
                    <Col span={6}>
                        <Row style={{paddingTop: "10px", paddingLeft: "25px", height: "40px", alignItems: "center"}}>
                            Budget Wise App
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row style={{paddingTop: "10px", paddingLeft: "25px", height: "40px", alignItems: "center", justifyContent: "center"}}>
                           <Button type={"link"}>
                               Budget Log
                           </Button>
                            <Button style={{marginLeft: "50px"}} type={"link"}>
                                Budget Planner
                            </Button>
                        </Row>

                    </Col>
                    <Col span={6}>
                        <Row style={{paddingRight: "25px", justifyContent: "flex-end", alignItems: "center", height: "40px", paddingTop: "10px"}}>
                            <div className={'text'} style={{paddingRight: "20px"}}>{email}</div>
                            <Tooltip placement="bottom" title={"Log out"}>
                                <Button ghost={true} type="link" onClick={logOut} shape="circle"><LoginOutlined  style={{color: "#000000"}} /></Button>
                            </Tooltip>
                        </Row>
                    </Col>
                </Row>
                 <Routes>
                    <Route path="/" >
                        <div>
                            <BudgetPlanner/>
                        </div>

                    </Route>
                </Routes>
            </div>
        )
    }

    return (
        localStorage.getItem("token") === null ?
            <Login setEmail={setEmail}/>
            :
            renderMenu()
  );
}

export default Main;
