import * as React from "react";
import {Table, Select, Button, Space, PageHeader, message, Modal, Input, Skeleton} from 'antd';
import { useState, useEffect } from 'react';
// @ts-ignore
import {getBudgetLogs, getBudgetNames, getBudNameLogs } from '../Services/BudgetServices.ts';
// @ts-ignore
import { parseDate, addCurrency} from "../Utils/UtilFunctions.ts";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
// @ts-ignore
import {updateLogsAPICall} from '../Services/BudgetServices.ts';

const {Option} = Select;                         // For specifiying drop down menu options

const ALL_LOGS = 'All';                          // For state where we get all information

const tableProperties = {                      // Table Style Properties
    width: '90%',
    margin: 'auto'
}

const SelectMenuProperties = {                // Drop down menu style proeprties
    width: "10rem",
    // marginLeft: "80%",
    // marginBottom: "2rem",
    // marginTop: "2rem"
}


// Component for Table and drop down menu
function BudgetTable(){
    const [isSkeleton, setSkeleton] = useState(true);
    const [budgetLogs, setBudgetLogs] = useState([]);             // State indicatingcurrently displayed logs on table
    const [budgetNames, setBudgetNames] = useState([]);           // State indicating distinc budget names
    const [currentName, setCurrentName] = useState(ALL_LOGS)

    // Modal Information
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [modalAmount, setModalAmount] = useState(0);
    const [modalExpenseDescrip, setModalExpenseDescrip] = useState("")
    const [modalTitle, setModalTitle] = useState("")

    // Columns to display in logs
    const columns = [
    {
        title: 'Budget Category',
        dataIndex: 'budgetcategory',
        key: 'budgetname',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Desciption',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <>
          <Space size="middle">
            <Button type="link" onClick={()=>showEditModal(record)} icon={<EditFilled />}></Button>
            <Button type="link" onClick={()=>console.log(record)} danger icon={<DeleteFilled />}></Button>
            
          </Space>
      
          </>
        ),
      }
]
    
    // Get all budget logs
    function getBudgetCategories(){
        getBudgetLogs().then((response) => {response.json().then((response) => {
            if (response.isSuccess) {
                parseDate(response.res)       // Set date format
                addCurrency(response.res)     // Add currency type
                setBudgetLogs(response.res)
                // console.log("The budget logs are" + response.res)
            }
            else{ 
                console.log("Error in getting Budget Categoroes" + response.error)
            }
        })
    })
    }

    // Function to get the drop down functions for the API built 
    function dropDownOptions(){
        getBudgetNames().then((response) => {response.json().then((response) => {
        if (response.isSuccess) {
            var expensesType = response.res.map(item => ({value: item.budgetname, label: item.budgetname}))
            expensesType.push({value: ALL_LOGS, label: ALL_LOGS})
            setBudgetNames(expensesType)
            setTimeout(() => {
                setSkeleton(false)
            }, 500);
            // console.log("The budget names are: " + budgetNames)
        }
        else{
            console.log("Drop down menu failure: " +response.message)
        }
    })
    })}

    // API to get all the budget names
    useEffect(() => {
        dropDownOptions();
        getBudgetCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // Get budget logs according to the budget name selected by user
    function getAllBudgetLogs(value){
        setCurrentName(value);
        if ( value === ALL_LOGS){                  // Get all logs if state is ALL               
            getBudgetLogs().then((response) => {response.json().then((response) => {
                if (response.isSuccess) {
                    parseDate(response.res)        // Set date format
                    addCurrency(response.res)      // Add currency type
                    setBudgetLogs(response.res)
                    // console.log("The budget log is" + response.res)
                }
                else{
                    console.log("Failed to get all budget logs: " + response.error)
                }
            })
        })
        }
        else{                                     // Otherwise get log specific to the budget name
            getBudNameLogs(value).then((response) => {response.json().then((response) => {
                if (response.isSuccess) {
                    parseDate(response.res)       // Set date formate
                    addCurrency(response.res)     // Add currency type
                    setBudgetLogs(response.res)
                    // console.log(response.res)
                }
                else{
                    console.log("Failed to get category specific logs: "+response.error)
                }
            })
        })
        }
    }

    const showEditModal = (record) => {
        setModalExpenseDescrip(record.description)
        setModalAmount(parseInt(record.amount.match(/(\d+)/)))
        setModalTitle(record.budgetcategory)
        setIsEditModalVisible(true);
    };

    const hideEditModal = () => {
        setIsEditModalVisible(false);
    };

    // Modal functions
    const validateInputs = () => {
        if (modalExpenseDescrip === ""){
            message.warning("Please enter a description")
            return false

        } else if (modalAmount === 0){
            message.warning("Amount should not be equal to 0")
            return false

        }else if (!Number.isInteger(Number(modalAmount))){
            message.warning("Amount should be integer")
            return false
        }else{
            return true
        }
    }

    const okClickHandle = () => {
        if (validateInputs() === true) {
            updateLog();

            hideEditModal()
            handlePreCancel()
        }
    }

    const handlePreCancel = () => {
        hideEditModal()
    }

    const handleAmountChange = (event) => { 
        setModalAmount(event.target.value)
    }
    
    function updateLog(){
        updateLogsAPICall(modalTitle, modalAmount, modalExpenseDescrip).then((response) => {
            response.json().then((response) => {
                if (response.isSuccess) {
                    getAllBudgetLogs(currentName);
                    message.success('Log updated successfully');
                }
                else{
                    console.log("Error in adding expense:" + response.error)
                }
            })
        })
    }

    return(
        <div style={{paddingTop: "60px"}}>
        <Skeleton style={{padding: "50px 50px 50px 50px"}} loading={isSkeleton}>
        <PageHeader
            title="Budget Logs"
            subTitle="Check your expenditure"
            extra={
                [
                    <Select
                    defaultValue = {ALL_LOGS}
                    style={SelectMenuProperties}
                    onSelect={getAllBudgetLogs}
                    >
                        {budgetNames.map((item, index) => <Option value={item.value} key={index}>{item.label}</Option>)}
                    </Select>
                ]
            }    
            />
        <Table columns={columns} dataSource={budgetLogs} style={tableProperties}></Table>;

        <Modal title={modalTitle} visible={isEditModalVisible} onOk={okClickHandle} onCancel={handlePreCancel}>
        <label> Description </label> <br/>
                <p>{modalExpenseDescrip}</p>

                <br/>
                <label> Amount  </label> <br/>
                <Input  onChange={handleAmountChange} value={modalAmount} type="number" /> <br />        
                
        </Modal>
        </Skeleton>
        </div>
    )
}

export default BudgetTable;