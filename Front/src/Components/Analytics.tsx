import * as React from "react";
import {Table, Select, Button, Space, PageHeader, message, Skeleton, Col, Row} from 'antd';
import { useState, useEffect } from 'react';
// @ts-ignore
import {getBudgetLogs, getBudgetNames, getBudNameLogs } from '../Services/BudgetServices.ts';
// @ts-ignore
import { parseDate, addCurrency} from "../Utils/UtilFunctions.ts";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Pie } from '@ant-design/plots';



function Analytics(){
    const [budgetList, setBudgetList] = React.useState([]);
    const [selectedGraph, setSelectedGraph] = useState("none");
    const [isSkeleton, setSkeleton] = useState(true);

    useEffect(() => {
        getBudgetListAPICall();
    }, [])

    const getBudgetListAPICall = async () => {
        await fetch('/getBudgetList', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            }
        }).then((response) => {
            response.json().then((response) => {
                if (response['isSuccess']) {
                    setBudgetList(response.res)
                    setTimeout(() => {
                        setSkeleton(false)
                    }, 500);
                }
                else{
                    console.log("Error while calling getBudgetList API"+ response.message)
                }
            })
        })
    }


    const DemoPie = () => {
        let data = []
        budgetList.forEach((el) => {
            data.push({type: el.budgetname, value: parseInt(el.amount)})
        })
        const config = {
            appendPadding: 10,
            data,
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            innerRadius: 0.6,
            label: {
                type: 'inner',
                offset: '-50%',
                content: '{value}',
                style: {
                    textAlign: 'center',
                    fontSize: 14,
                },
            },
            interactions: [
                {
                    type: 'element-selected',
                },
                {
                    type: 'element-active',
                },
            ],
            statistic: {
                title: false,
                content: {
                    style: {
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    },
                    content: data.length === 0 ? 'Sorry no data\n To Show' : 'Pie\nChart',
                },
            },
        };
        return <Pie {...config} />;
    };

    return(
        <div style={{paddingTop: "60px"}}>
        <Skeleton style={{padding: "50px 50px 50px 50px"}} loading={isSkeleton}>
            <Row style={{width: "100%", justifyContent: "center", alignItems: "center", paddingTop: "30px"}}>
                Please select what kind of graph you want to see
                <Select defaultValue={selectedGraph} onChange={(e) => {setSelectedGraph(e)}} style={{width: "200px", marginLeft: "30px"}}>
                    <Select.Option value={"none"} >none</Select.Option>
                    <Select.Option value={"Pie Chart"} >Pie chart</Select.Option>
                </Select>
            </Row>
            <Row>
                <Col span={6}>
                </Col>
                <Col span={12} style={{height: "600px", paddingTop: "50px"}}>

                    { selectedGraph === "Pie Chart" ?  DemoPie()
                        :
                        null}

                </Col>
                <Col span={6}>
                </Col>
            </Row>
        </Skeleton>
        </div>
    )
}

export default Analytics;