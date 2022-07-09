import React from 'react'
import { Card } from 'antd';
import { Progress } from 'antd';
import { Button } from 'antd';
import { currencyFormatter } from '../Utils/CurrencyUtils.tsx'
import { redColor, blueColor, yellowColor } from '../Constants/Colors.tsx'
import AddExpense from './AddExpense.tsx';

export default function BudgetCard({ budgetApiCall, cardTitle, amount, maxAmount }) {
    const [isModalVisible, setIsModalVisible] = React.useState(false); 

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    function getProgressBarColor() {
        let percent = (amount / maxAmount)
        var color = blueColor
        if (percent >= 0.5 && percent <= 0.75) {
            color =  yellowColor
        }
        else if (percent > 0.75) { 
            color = redColor
        }
        return color
    }

    function getProgressPercentage() { 
        return  (amount / maxAmount) * 100 
    }
    

  return (
      <Card title={cardTitle} style={cardStyle} extra={<div>{currencyFormatter.format(amount)} / {currencyFormatter.format(maxAmount)}</div>}>
          <Progress percent={getProgressPercentage()} strokeColor={getProgressBarColor()} status="active" />
            <div style={btnContainer}>
                <Button onClick={showModal}> Add Expense</Button>
                <Button style={btnStyle}> View Expense</Button>
            </div>
          <AddExpense budgetApiCall={ budgetApiCall } title={cardTitle} maxamount={ maxAmount } visible={isModalVisible} handleCancel={handleCancel} handleOk={handleOk} ></AddExpense>

      </Card>
  )
}

const btnContainer = {
    marginTop: "40px",
    display: "flex",
    justifyContent: "flex-end",
};

const btnStyle = {
    marginLeft: "10px",
};

const cardStyle = {
    margin: 10, 
    height: 200, 
    width: 430,
};