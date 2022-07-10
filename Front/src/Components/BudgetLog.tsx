import React from 'react';
import {Table} from 'antd';

// Columns to display in logs
const columns = [
    {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: 'Budget Name',
        dataIndex: 'budgetName',
        key: 'budgetName',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Max Amount',
        dataIndex: 'maxAmount',
        key: 'maxAmount',
    }
]

// Table to display
function BudgetTable(){
    return(
    <Table columns={columns}></Table>);
}

export default BudgetTable;