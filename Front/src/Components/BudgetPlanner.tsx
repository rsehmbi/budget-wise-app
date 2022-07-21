import {PageHeader, Button, Popconfirm, message, Skeleton} from 'antd';
import BudgetCard from './BudgetCard.tsx';
import React, {useEffect, useState} from 'react';
import AddBudget from './AddBudget.tsx';
import {gapi} from "gapi-script";


export default function BudgetPlanner() {
    const [budgetList, setBudgetList] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSkeleton, setSkeleton] = useState(true);

    const getBudgetListAPICall = async () => {
        await fetch('/getBudgetList', {
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
        await fetch('/deleteAllBudgets', {
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
        <div style={{paddingTop: "60px"}}>
        <Skeleton style={{padding: "50px 50px 50px 50px"}} loading={isSkeleton}>
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
                budgetList.map(budget => (
                    <BudgetCard budgetApiCall={getBudgetListAPICall} key={ budget["budgetname"] } cardTitle={ budget["budgetname"] } amount={budget["amount"]} maxAmount={ budget["maximumamount"]}></BudgetCard>
            )) 
            }
            </div>
            <AddBudget budgetApiCall={getBudgetListAPICall} visible={isModalVisible} handleCancel={handleCancel} budgetList={budgetList} handleOk={handleOk}></AddBudget>
        </Skeleton>
        </div>
  )
}

const budgetRows = {
    margin: 45,
    display: "inline-flex",
    flexWrap: "wrap",
}