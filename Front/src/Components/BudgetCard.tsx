import * as React from "react";
import { Card, Modal, Input} from 'antd';
import { Progress } from 'antd';
import { Button, Popconfirm, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
// @ts-ignore
import { currencyFormatter } from '../Utils/CurrencyUtils.tsx'
// @ts-ignore
import { redColor, blueColor, yellowColor } from '../Constants/Colors.tsx'
// @ts-ignore
import AddExpense from './AddExpense.tsx';

export default function BudgetCard({ creditApiCall, budgetApiCall, cardTitle, amount, maxAmount }) {
    const [isModalVisible, setIsModalVisible] = React.useState(false); 
    const [isEditModalVisible, setIsEditModalVisible] = React.useState(false);
    const [maxEditCardAmount, setMaxEditAmount] = React.useState(maxAmount);

    const updateMaxAmountAPICall = async () => {
        await fetch('/updateMaxAmount', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            },
            body: JSON.stringify({
                'maxamount': maxEditCardAmount,
                'budgetname': cardTitle,
            }) 
        }).then((response) => {
            response.json().then((response) => {
                if (response) {
                    budgetApiCall();
                }
            })
        })
    }
    
    const showEditModal = () => {
        setIsEditModalVisible(true);
    };


    const handleEditOk = () => {
        if (!Number.isInteger(Number(maxEditCardAmount))) {
            message.warning("Max amount should be integer")
        }
        else{
            updateMaxAmountAPICall();
            setMaxEditAmount(maxEditCardAmount)
            setIsEditModalVisible(false);
        }
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
    };
    
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
        return  ((amount / maxAmount) * 100).toFixed(0) 
    }
    
    const confirm = async (e: React.MouseEvent<HTMLElement>) => {
        await fetch('/deleteBudget', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            },
            body: JSON.stringify({
              'budgetname': cardTitle,
            }) 
        }).then((response) => {
            response.json().then((response) => {
                if (response['isSuccess']) {
                    budgetApiCall();
                    message.success('Budget Deleted Successfully');
                }
            })
        })
    };

    const cancel = (e: React.MouseEvent<HTMLElement>) => {
        message.error('Cancelled');
    };
    
    const handleMaxAmountChange = (event) => { 
        if (parseInt(event.target.value) < 0) {
            message.info('Please enter positive values');
        }
        else { 
            setMaxEditAmount(event.target.value)
        } 
    }

  return (
      <Card title={cardTitle} style={cardStyle}
          extra=
          {
              <div>{currencyFormatter.format(amount)} / {currencyFormatter.format(maxAmount)}
                  {' '}<EditOutlined onClick={showEditModal} />
                   <Modal title="Edit Maximum Amount" visible={isEditModalVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
                    <br/>
                    <label> Maximum Amount  </label> <br/>
                    <Input onChange={handleMaxAmountChange} min="0" value={maxEditCardAmount} type="number"/> <br />
                   </Modal>
              </div>
          }>
          <Progress percent={getProgressPercentage()} strokeColor={getProgressBarColor()} status="active" />
            <div style={btnContainer}>
              <Button onClick={showModal}> Add Expense</Button>
              <Popconfirm
                    title={`Are you sure to delete ${cardTitle} ?`}
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Delete"
                    cancelText="Cancel"
                >
                <Button danger style={btnStyle}> Delete Budget</Button>
                </Popconfirm>
            </div>
          <AddExpense creditApiCall={ creditApiCall } budgetApiCall={ budgetApiCall } title={cardTitle} visible={isModalVisible} handleCancel={handleCancel} handleOk={handleOk} ></AddExpense>

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