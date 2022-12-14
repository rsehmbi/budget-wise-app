import * as React from "react";
import '../Css/App.css';
import { Result, Button } from 'antd';
import { Link } from "react-router-dom";

function PageNotFound(props: any) {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Link to="/">
                        <Button onClick={() => {props.setBudgetLog(false)
                                                props.setAnalytics(false)
                        }}
                                style={{backgroundColor: "#ffc82c", color: "#173a64", border: "none"}} type="primary">Go back home</Button>
                    </Link>
                }
                style={{paddingTop: "15rem"}}
            />
        );
}

export default PageNotFound;