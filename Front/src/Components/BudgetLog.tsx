import React from 'react';
import {Table, Select} from 'antd';
import { useState, useEffect } from 'react';
import { getBudgetList, getBudgetNames } from '../Services/BudgetServices.ts';

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
    width: '80%',
    margin: 'auto'
}

const SelectMenuProperties = {
    width: 120,
    marginLeft: "70%",
    marginBottom: "2rem"
}

// Table to display
function BudgetTable(){
    const [budgetLogs, setBudgetLogs] = useState([]);
    const [budgetNames, setBudgetNames] = useState([]);
    const [selectedName, setSelectedName] = useState([]);

    // API to get the logs specific to userselected budget names
    useEffect(() => {
        let mounted = true;
        getBudgetList().then((response) => {response.json().then((response) => {
                if (response) {
                    setBudgetLogs(response.res)
                    console.log(response.res)
                }
            })
        })
        return () => mounted = false;
    }, [])

    // // API to get all the budget names
    useEffect(() => {
        let mounted = true;
        getBudgetNames().then((response) => {response.json().then((response) => {
                if (response) {
                    var expensesType = response.res.map(item => ({value: item.budgetname, label: item.budgetname}))
                    var total = expensesType.length
                    expensesType.push({value: 'All', label: 'All'})
                    setBudgetNames(expensesType)
                    // setBudgetNames(response.res)
                    console.log(total)
                    console.log(budgetNames)
                }
            })
        })
        return () => mounted = false;
    },[])

    // To check when value is changed
    const handleChange = (value) => {
        setSelectedName(value)
    }

    return(
    <>
        <Select
            defaultValue = "All"
            style={SelectMenuProperties}
            onChange={handleChange}>
                {budgetNames.map((item, index) => <Option value={item.value} key={index}>{item.label}</Option>)}
        </Select>

        <Table columns={columns} dataSource={budgetLogs} style={tableProperties}></Table>;
    </>
    )
}

export default BudgetTable;