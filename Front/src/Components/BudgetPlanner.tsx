import {PageHeader, Button} from 'antd';
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
                'Accept': 'application/json'}
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

    return (
        <>
        <PageHeader
            title="Budget Planner"
            subTitle="Plan your budget"
            extra={
                [
                    <Button onClick={showModal} key="1">Add Budget</Button>,
                ]
            }
                
            />
            <div style={budgetRows}>
            {
                budgetList.map(budget => (
                    <BudgetCard budgetApiCall={getBudgetListAPICall} key={ budget["budgetname"] } cardTitle={ budget["budgetname"] } amount={budget["amount"]} maxAmount={ budget["maximumamount"]}></BudgetCard>
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