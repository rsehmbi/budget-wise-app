import React from 'react';
import {Table, Select} from 'antd';
import { useState, useEffect } from 'react';

const {Option} = Select;

// Columns to display in logs
const columns = [
    {
        title: 'Budget Name',
        dataIndex: 'budgetname',
        key: 'budgetname',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Max Amount',
        dataIndex: 'maximumamount',
        key: 'maximumamount',
    }
]

// Properties for the whole table
const tableProperties = { 
    width: "80%",
    margin: "auto"
}


// Table to display
function BudgetTable(){
    const [budgetLogs, setBudgetLogs] = useState([]);
    // const [budgetName, setBudgetNames] = useState([]);
    // const [selectedName, setSelectedNames] = useState([]);

    // API to get the logs specific to userselected budget names
    useEffect(() => {
        fetch('http://localhost:3000/getbudgetList', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
        }).then((response) => {
            response.json().then((response) => {
                if (response) {
                    setBudgetLogs(response.res)
                    console.log(response.res)
                }
            })
        })
    } )

    // // API to get all the budget names
    // useEffect(() => {
    //     fetch('http://localhost:3000/getBudgetNames',{
    //         method: 'Get',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'}
    //     }).then((response) => {
    //         response.json().then((response) => {
    //             if (response) {
    //                 setBudgetNames(response.res.map(item => ({value: item, label: item}) ))
    //             }
    //         })
    //     })
    // })

    // To check when value is changed
    // const handleChange = (value) => {
    // }

    return(
    <>
        {/* <Select
            defaultValue="lucy"
            style={{
            width: 120,
            }}
            onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
        </Select> */}

        <Table columns={columns} dataSource={budgetLogs} style={tableProperties}></Table>;
    </>
    )
}

export default BudgetTable;