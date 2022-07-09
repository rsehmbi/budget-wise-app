import React from 'react'
import { Card } from 'antd';
import { Progress } from 'antd';
import { Button } from 'antd';
import { currencyFormatter } from '../Utils/CurrencyUtils.tsx'
import { redColor, blueColor, yellowColor } from '../Constants/Colors.tsx'

export default function BudgetCard({ cardTitle, amount, maxAmount }) {
    function getProgressBarColor() {
        let percent = (amount / maxAmount)
        console.log(percent)
        if (percent >= 0.5 && percent <= 0.75) {
            return yellowColor
        }
        else if (percent > 0.75) { 
            return redColor
        }
        return blueColor
    }

    function getProgressPercentage() { 
        return  (amount / maxAmount) * 100 
    }
    

  return (
      <Card title={cardTitle} style={cardStyle} extra={<div>{currencyFormatter.format(amount)} / {currencyFormatter.format(maxAmount)}</div>}>
          <Progress percent={getProgressPercentage()} strokeColor={getProgressBarColor()} status="active" />
            <div style={btnContainer}>
                <Button> Add Expense</Button>
                <Button style={btnStyle}> View Expense</Button>
            </div>
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
    height: 200, 
    width: 400,
};