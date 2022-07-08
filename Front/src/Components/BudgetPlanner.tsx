import { PageHeader, Button } from 'antd';
import BudgetCard from './BudgetCard.tsx';
import React from 'react'

export default function BudgetPlanner() {
    return (
        <>
        <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Budget Planner"
            subTitle="Plan your budget"
            extra={
                [
                    <Button key="1">Add Budget</Button>,
                    <Button key="2">Add Expense</Button>,
                ]
            }
                
        />
        <BudgetCard cardTitle="Grocery" amount={200} maxAmount={1000}></BudgetCard>
      </>

  )
}