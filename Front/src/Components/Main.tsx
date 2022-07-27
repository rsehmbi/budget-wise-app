import {LoginOutlined} from '@ant-design/icons';
import '../Css/App.css';
// // @ts-ignore
// import BudgetPlanner from './BudgetPlanner.tsx';
// // @ts-ignore
// import BudgetTable from './BudgetLog.tsx';
import * as React from "react";
// @ts-ignore
import Login from "./Login.tsx";
import CryptoJS from "crypto-js"
import {useEffect, useState} from "react";
import {gapi} from "gapi-script";
// @ts-ignore
import {isAuth} from "../Services/Login.ts";
import {Button, Col, Row, Tooltip} from "antd";
// import {Route, Routes} from 'react-router-dom'
import App from "./App.tsx";
import {Link, Route, Routes} from "react-router-dom";
import BudgetPlanner from "./BudgetPlanner.tsx";
import BudgetTable from "./BudgetLog.tsx";
import PageNotFound from "./PageNotFound.tsx";
import Analytics from "./Analytics.tsx";
import FriendWise from "./FriendWise.tsx"


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
    const [isBudgetLog, setBudgetLog] = useState(window.location.href.includes("/BudgetLog"))
    const [isAnalytics, setAnalytics] = useState(window.location.href.includes("/Analytics"))
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
        if (window.location.href.includes("/BudgetLog")){
            setBudgetLog(true)
        }
        if (window.location.href.includes("/Analytics")){
            setAnalytics(true)
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
        window.location.href = "/"
        deleteAllCookies()
        localStorage.clear()
        setEmail(undefined)
    }

    const renderMenu = () => {
        return (
            <div>
                <Row style={{height: "60px", width: "100%", position: "fixed", top: 0, boxShadow: "0 2px 8px #f0f1f2",zIndex: 1000, backgroundColor: "#ffffff"}}>
                    <Col span={6} style={{alignItems: "center", display: "flex", justifyContent: "start"}}>
                        <Row style={{paddingLeft: "25px", height: "40px", alignItems: "center", fontSize: "17px"}}>
                            Budget Wise App
                        </Row>
                    </Col>
                    <Col span={12} style={{alignItems: "center", display: "flex", justifyContent: "center"}}>
                    <Row style={{height: "40px", alignItems: "center", justifyContent: "center"}}>
                        <Link to="/" style={{fontSize: "15px"}}>
                            <Button type={"link"} onClick={() => {setBudgetLog(false)
                                                                    setAnalytics(false)}}
                                    style={{fontSize: "15px", color: isBudgetLog || isAnalytics ? "unset" : "#1890ff"}}>
                                Budget Portfolio
                            </Button>
                            </Link>
                        <Link to="/BudgetLog">
                            <Button type={"link"} onClick={() => {setBudgetLog(true)
                                                                    setAnalytics(false)
                            }}
                                    style={{marginLeft: "50px", fontSize: "15px", color: isBudgetLog ? "#1890ff" : "unset"}}>
                                Budget Logs
                            </Button>
                            </Link>
                        <Link to="/Analytics">
                            <Button type={"link"} onClick={() => {setAnalytics(true)
                                                                setBudgetLog(false)
                            }}
                                    style={{marginLeft: "50px", fontSize: "15px", color: isAnalytics ? "#1890ff" : "unset"}}>
                                Analytics
                            </Button>
                        </Link>
                        <Link to="/FriendWise">
                            <Button type={"link"} onClick={() => {setAnalytics(false)
                                                                setBudgetLog(false)
                            }}
                                    style={{marginLeft: "50px", fontSize: "15px", color: isAnalytics ? "#1890ff" : "unset"}}>
                                Etransfer
                            </Button>
                        </Link>
                    </Row>
                    </Col>
                    <Col span={6} style={{alignItems: "center", display: "flex", justifyContent: "end"}}>
                        <Row style={{paddingRight: "25px", justifyContent: "flex-end", alignItems: "center", height: "40px"}}>
                            <div className={'text'} style={{paddingRight: "20px", fontSize: "15px", paddingBottom: "2px"}}>{email}</div>
                            <Tooltip placement="bottom" title={"Log out"}>
                                <Button ghost={true} type="link" onClick={logOut} shape="circle"><LoginOutlined  style={{color: "#000000"}} /></Button>
                            </Tooltip>
                        </Row>
                    </Col>
                </Row>
                    <Routes>
                        <Route path="*" element={<PageNotFound setAnalytics={setAnalytics} setBudgetLog={setBudgetLog} />}/>
                        <Route path="/" element={<BudgetPlanner/>}/>
                        <Route path="/BudgetLog" element={<BudgetTable/>}/>
                        <Route path="/Analytics" element={<Analytics/>}/>
                        <Route path="Etransfer" element={<FriendWise/>}/>
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
