import { PageHeader, Button } from 'antd';
import BudgetCard from './BudgetCard.tsx';
import React, { useState } from 'react';
import AddBudget from './AddBudget.tsx';

export default function BudgetPlanner() {
    const [isModalVisible, setIsModalVisible] = useState(false);    

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => { 
        setIsModalVisible(false);
    };

    return (
        <>
        <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Budget Planner"
            subTitle="Plan your budget"
            extra={
                [
                    <Button onClick={showModal} key="1">Add Budget</Button>,
                ]
            }
                
        />
            <BudgetCard cardTitle="Grocery" amount={200} maxAmount={1000}></BudgetCard>
            <AddBudget visible={isModalVisible} handleCancel={handleCancel} handleOk={handleOk}></AddBudget>
      </>

  )
}