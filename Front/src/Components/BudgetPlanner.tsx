import {PageHeader, Button, Popconfirm, message} from 'antd';
import BudgetCard from './BudgetCard.tsx';
import React, { useState } from 'react';
import AddBudget from './AddBudget.tsx';


export default function BudgetPlanner() {
    const [budgetList, setBudgetList] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); 

    const getBudgetListAPICall = async () => {
        await fetch('http://localhost:3000/getBudgetList', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            }
        }).then((response) => {
            response.json().then((response) => {
                if (response['isSuccess']) {
                    setBudgetList(response.res)
                }
                else{
                    console.log("Error while calling getBudgetList API"+ response.message)
                }
            })
        })
    }    

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    React.useEffect(() => {
        getBudgetListAPICall();
    }, [])

    const cancel = (e: React.MouseEvent<HTMLElement>) => {
        message.error('Cancelled');
    };

    const confirm = async (e: React.MouseEvent<HTMLElement>) => {
        await fetch('http://localhost:3000/deleteAllBudgets', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            }
        }).then((response) => {
            response.json().then((response) => {
                if (response['isSuccess']) {
                    getBudgetListAPICall();
                    message.success('Budget Deleted Successfully');
                }
            })
        })
    };
    
    return (
        <>
        <PageHeader
            title="Budget Planner"
            subTitle="Plan your budget"
            extra={
                [
                    <Button onClick={showModal} key="1">Add Budget</Button>,
                    <Popconfirm
                        title="Are you sure to delete all entries?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Delete"
                        cancelText="Cancel"
                    >
                    <Button danger key="2">Delete All</Button>,
                    </Popconfirm>  
                ]
            }    
            />
            <div style={budgetRows}>
            {
                    budgetList.map((budget, index) => (
                    <ul key={index}></ul>
                    // <BudgetCard budgetApiCall={getBudgetListAPICall} cardTitle={ budget["budgetname"] } amount={budget["amount"]} maxAmount={ budget["maximumamount"]}></BudgetCard>
            )) 
            }
            </div>
            <AddBudget budgetApiCall={getBudgetListAPICall} visible={isModalVisible} handleCancel={handleCancel} handleOk={handleOk}></AddBudget>
      </>
  )
}

const budgetRows = {
    margin: 45,
    display: "inline-flex",
    flexWrap: "wrap",
}