import * as React from "react";
import {Table, Select, Button, Space, PageHeader, message, Skeleton, Col, Row, DatePicker, Tooltip} from 'antd';
import { useState, useEffect } from 'react';
// @ts-ignore
import {getBudgetLogs, getBudgetNames, getBudNameLogs } from '../Services/BudgetServices.ts';
// @ts-ignore
import { parseDate, addCurrency} from "../Utils/UtilFunctions.ts";
import { CaretLeftOutlined } from "@ant-design/icons";
import { Pie } from '@ant-design/plots';



function Analytics(){
    const [budgetList, setBudgetList] = React.useState([]);
    const [selectedGraph, setSelectedGraph] = useState("none");
    const [isSkeleton, setSkeleton] = useState(true);
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [isSpecificPie, setSpecificPie] = React.useState(false);
    const [specificPieType, setSpecificPieType] = React.useState("");
    const [budgetLogs, setBudgetLogs] = useState([]);


    const { RangePicker } = DatePicker;

    useEffect(() => {
        getBudgetListAPICall();
        getAllBudgetLogs();

    }, [])

    function getAllBudgetLogs() {
        getBudgetLogs().then((response) => {
            response.json().then((response) => {
                if (response.isSuccess) {
                    parseDate(response.res)        // Set date format
                    addCurrency(response.res)      // Add currency type
                    setBudgetLogs(response.res)
                    // console.log("The budget log is" + response.res)
                } else {
                    console.log("Failed to get all budget logs: " + response.error)
                }
            })
        })
    }


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


    const PieChart = (specificType?: string) => {
        let data = []
        if (specificType === null){
                budgetList.forEach((el) => {
                    data.push({type: el.budgetname, value: parseInt(el.amount)})
                })
        }
        else{
            if (startDate !== "" && endDate !== ""){
                budgetLogs.forEach((el) => {
                    let date = el.date[6] === "-" ?  parseInt(el.date.substring(5,6)) : parseInt(el.date.substring(5,7))
                    if (el.budgetcategory === specificType && date <= parseInt(endDate) && date >= parseInt(startDate) ) {
                        data.push({type: el.description, value: parseInt(el.amount.substring(3, el.amount.length))})
                    }

                })
            }
            else {
                budgetLogs.forEach((el) => {
                    if (el.budgetcategory === specificType) {
                        data.push({type: el.description, value: parseInt(el.amount.substring(3, el.amount.length))})
                    }

                })
            }
        }
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
        return <Pie onReady={(plot) => {
                         plot.on('plot:click', (evt) => {
                             if (evt) {
                                 handlePieClick(evt)
                             }
                         });
                     }}
                    {...config} />
    };

    const handlePieClick = (event) => {
        if (event.data !== undefined && event.data.data.type && specificPieType === ""){
            setSpecificPie(true)
            setSpecificPieType(event.data.data.type)
        }
    }

    const handlePicker = (e) => {
            setStartDate(e[0]._d.getMonth())
            setEndDate(e[1]._d.getMonth())
    }

    return(
        <div style={{paddingTop: "60px"}}>
        <Skeleton style={{padding: "50px 50px 50px 50px"}} loading={isSkeleton}>
            <Row style={{width: "100%", justifyContent: "center", alignItems: "center", paddingTop: "30px"}}>
                {specificPieType !== "" ?
                    <Tooltip placement="bottom" title={"Back"}>
                    <Button type={"link"}  onClick={() => {
                        setSpecificPieType("")
                        setSpecificPie(false)
                        setStartDate("")
                        setEndDate("")
                    }}>
                        <CaretLeftOutlined />
                    </Button>
                    </Tooltip>
                    :
                    null
                }
                <Select defaultValue={selectedGraph} onChange={(e) => {setSelectedGraph(e)}} style={{width: "200px", marginLeft: "30px"}}>
                    <Select.Option value={"none"} >none</Select.Option>
                    <Select.Option value={"Pie Chart"} >Pie chart</Select.Option>
                </Select>
                {specificPieType !== "" ?
                    <RangePicker format="YYYY-MM" allowClear={false} onChange={(e) => {handlePicker(e)}} style={{width: "250px", marginLeft: "30px"}} picker="month" />
                    :
                    null
                }
            </Row>
            <Row>
                <Col span={6}>
                </Col>
                <Col span={12} style={{height: "600px", paddingTop: "50px"}}>

                    {selectedGraph === "Pie Chart" && isSpecificPie ? PieChart(specificPieType)
                        :
                        null
                    }
                    {
                        selectedGraph === "Pie Chart" && !isSpecificPie ? PieChart(null)
                            :
                            null
                    }


                </Col>
                <Col span={6}>
                </Col>
            </Row>
        </Skeleton>
        </div>
    )
}

export default Analytics;