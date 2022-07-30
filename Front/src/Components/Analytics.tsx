import * as React from "react";
import {Select, Button, Skeleton, Col, Row, DatePicker, Tooltip} from 'antd';
import { useState, useEffect } from 'react';
// @ts-ignore
import {
    getAllOwingLogs,
    getBudgetLogs,
} from '../Services/BudgetServices.ts';
// @ts-ignore
import { parseDate, addCurrency} from "../Utils/UtilFunctions.ts";
import { CaretLeftOutlined } from "@ant-design/icons";
import {Bar, Line, Pie} from '@ant-design/plots';



function Analytics(props: any){
    const [budgetList, setBudgetList] = React.useState([]);
    const [selectedGraph, setSelectedGraph] = useState("Line Chart");
    const [isSkeleton, setSkeleton] = useState(true);
    const [startYear, setStartYear] = React.useState("");
    const [endYear, setEndYear] = React.useState("");
    const [startMonth, setStartMonth] = React.useState("");
    const [endMonth, setEndMonth] = React.useState("");
    const [isSpecificPie, setSpecificPie] = React.useState(false);
    const [specificPieType, setSpecificPieType] = React.useState("");
    const [budgetLogs, setBudgetLogs] = useState([]);
    const [owingLogs, setOwingLogs] = useState([]);


    const { RangePicker } = DatePicker;

    useEffect(() => {
        getBudgetListAPICall();
        getAllBudgetLogs();
        getOwingLogs();

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

    function getOwingLogs(){
            getAllOwingLogs().then((response) => {response.json().then((response) => {
                if (response.isSuccess) {
                    parseDate(response.res)        // Set date format
                    setOwingLogs(response.res)

                }
                else{
                    console.log("Failed to get all owing logs: " + response.error)
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

    const LineChart = () => { 
        const [data, setData] = useState([]);

        useEffect(() => {
            asyncFetch();
        }, []);

        const asyncFetch = () => {
            fetch('/getDateAmountDescription', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            }
        }).then((response) => response.json())
                .then((json) => setData(json.res))

            .catch((error) => {
                console.log('fetch data failed', error);
            });
        };
        const config = {
            data,
            legend: { position: 'top' },
            padding: 'auto',
            xField: 'to_char',
            yField: 'amount',
            xAxis: {
                label: {
                },
                // type: 'timeCat',
                tickCount: 5,
            },
            smooth: true,
            label: {
                style: {
                    fill: '#aaa',
                },
            },
            point: {
                size: 5,
                shape: 'circle',
            },
            animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
                },
            },
            
        };

        return <>
            <h2 style={{ width: "100%", textAlign: "center" }}>Spendings per day (Date Vs Amount Spent)</h2>
            <Line {...config} />    
            <p style={{width: "100%",  textAlign: "center", margin:"10px"}}> Dates </p>
            </>
    }

    const BarChart = (isFriendWise?: boolean) => {
        let data = []
        if (isFriendWise){
            data.push({type: "You owe", value: 0})
            data.push({type: "Owes you", value: 0})

            owingLogs.forEach((el) => {
                if (el.sender === props.email){
                    data[0].value = data[0].value + parseInt(el.amount)
                }
                else{
                    data[1].value = data[1].value + parseInt(el.amount)
                }
            })
        }
        else{
            budgetList.forEach((el) => {
                data.push({type: el.budgetname, value: parseInt(el.amount)})
            })
        }

        const config = {
            data,
            xField: 'value',
            yField: 'type',
            seriesField: 'type',
            legend: {
                position: 'top-left',
            },
        };
        return <Bar {...config} />;
    };


    const PieChart = (specificType?: string) => {
        let data = []
        if (specificType === null){
                budgetList.forEach((el) => {
                    data.push({type: el.budgetname, value: parseInt(el.amount)})
                })
        }
        else{
            if (startMonth !== "" && endMonth !== "" && startYear !== "" && endYear !== ""){
                budgetLogs.forEach((el) => {
                    let year = parseInt(el.date.substring(0,4))
                    let month = el.date[6] === "-" ?  parseInt(el.date.substring(5,6)) : parseInt(el.date.substring(5,7))
                    if (el.budgetcategory === specificType){
                        if (year > parseInt(startYear) && year < parseInt(endYear)){
                            data.push({type: el.description, value: parseInt(el.amount.substring(3, el.amount.length))})
                        }
                        else{
                            if (year === parseInt(startYear) && year === parseInt(endYear)){
                                if (month <= parseInt(endMonth) && month >= parseInt(startMonth)){
                                    data.push({type: el.description, value: parseInt(el.amount.substring(3, el.amount.length))})
                                }
                            }
                            else if (year === parseInt(startYear)){
                                if ( month >= parseInt(startMonth)){
                                    data.push({type: el.description, value: parseInt(el.amount.substring(3, el.amount.length))})
                                }
                            }
                            else if (year === parseInt(endYear)){
                                if ( month <= parseInt(endMonth)){
                                    data.push({type: el.description, value: parseInt(el.amount.substring(3, el.amount.length))})
                                }
                            }
                        }

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
            setStartMonth(e[0]._d.getMonth())
            setEndMonth(e[1]._d.getMonth())
            setStartYear(e[0]._d.getFullYear())
            setEndYear(e[1]._d.getFullYear())
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
                        setStartMonth("")
                        setEndMonth("")
                    }}>
                        <CaretLeftOutlined />
                    </Button>
                    </Tooltip>
                    :
                    null
                }
                <Select defaultValue={selectedGraph} onChange={(e) => {
                    setSpecificPieType("")
                    setSpecificPie(false)
                    setStartMonth("")
                    setEndMonth("")
                    setSelectedGraph(e)}} style={{width: "200px", marginLeft: "30px"}}>
                        <Select.Option value={"Line Chart"} >Line chart</Select.Option>
                        <Select.Option value={"Pie Chart"} >Pie chart</Select.Option>
                        <Select.Option value={"Bar Chart for budgets"} >Budget Bar Chart</Select.Option>
                        <Select.Option value={"Bar Chart for friend wise"} > Split Trac Bar Chart</Select.Option>
                </Select>
                {specificPieType !== "" && selectedGraph === "Pie Chart" ?
                    <RangePicker format="YYYY-MM" allowClear={false} onChange={(e) => {handlePicker(e)}} style={{width: "250px", marginLeft: "30px"}} picker="month" />
                    :
                    null
                }
            </Row>
            <Row>
                <Col span={2}>
                </Col>
                <Col span={20} style={{height: "800px", padding: "50px 50px 50px 50px"}}>

                    {selectedGraph === "Pie Chart" && isSpecificPie ? PieChart(specificPieType)
                        :
                        null
                    }
                    {
                        selectedGraph === "Pie Chart" && !isSpecificPie ? PieChart(null)
                            :
                            null
                    }
                    {
                        selectedGraph === "Line Chart" ? <LineChart/>:null
                    }
                    {
                        selectedGraph === "Bar Chart for budgets" ? BarChart() : null
                    }
                    {
                        selectedGraph === "Bar Chart for friend wise" ? BarChart(true) : null
                    }
                </Col>
                <Col span={2}>
                </Col>
            </Row>
        </Skeleton>
        </div>
    )
}

export default Analytics;