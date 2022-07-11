import * as React from "react";
import {Table, Select} from 'antd';
import { useState, useEffect } from 'react';
// @ts-ignore
import { getBudgetList, getBudgetNames, getBudNameLogs } from '../Services/BudgetServices.ts';

const {Option} = Select;                         // For specifiying drop down menu options

const ALL_LOGS = 'All';                          // For state where we get all information

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


const tableProperties = {                      // Table Style Properties
    width: '60%',
    margin: 'auto'
}

const SelectMenuProperties = {                // Drop down menu style proeprties
    width: "10rem",
    marginLeft: "65%",
    marginBottom: "2rem"
}

// Component for Table and drop down menu
function BudgetTable(){
    const [budgetLogs, setBudgetLogs] = useState([]);             // State indicatingcurrently displayed logs on table
    const [budgetNames, setBudgetNames] = useState([]);           // State indicating distinc budget names
    const [selectedName, setSelectedName] = useState([]);         // State indicating currently selected budget name

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

    // API to get all the budget names
    useEffect(() => {
        let mounted = true;
        getBudgetNames().then((response) => {response.json().then((response) => {
                if (response) {
                    var expensesType = response.res.map(item => ({value: item.budgetname, label: item.budgetname}))
                    var total = expensesType.length
                    expensesType.push({value: ALL_LOGS, label: ALL_LOGS})
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
        console.log(selectedName);
    }

    // Get budget logs according to the budget name selected
    function getBudgetLogs(value){
        if ( value === ALL_LOGS){                  // Get all logs if state is ALL               
            getBudgetList().then((response) => {response.json().then((response) => {
                if (response) {
                    setBudgetLogs(response.res)
                    console.log(response.res)
                }
            })
        })
        }
        else{                                     // Otherwise get log specific to the budget name
            getBudNameLogs(value).then((response) => {response.json().then((response) => {
                if (response) {
                    setBudgetLogs(response.res)
                    console.log(response.res)
                }
            })
        })
        }
    }
    return(
    <>
        <Select
            defaultValue = {ALL_LOGS}
            style={SelectMenuProperties}
            onChange={handleChange}
            onSelect={getBudgetLogs}
            >
                {budgetNames.map((item, index) => <Option value={item.value} key={index}>{item.label}</Option>)}
        </Select>

        <Table columns={columns} dataSource={budgetLogs} style={tableProperties}></Table>;
    </>
    )
}

export default BudgetTable;