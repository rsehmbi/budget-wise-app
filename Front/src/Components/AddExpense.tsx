import { Modal, Input } from 'antd';
import * as React from "react";

function AddExpense({ budgetApiCall, title, maxamount, visible, handleOk, handleCancel}) {
    const [amount, setAmount] = React.useState(0);
    const [maxAmount, setMaxAmount] = React.useState(maxamount);

    const setDefaultValues = () => {
        setAmount(0)
        setMaxAmount(0)
    }
    
    const validateInputs = () => {
        if (amount !== 0 && maxAmount !== 0) { 
            return true
        }
        return false
    }

    const okClickHandle = () => {
        if (validateInputs() === true) {
            updatebudgetAPICall();
            handleOk();
            setDefaultValues();
        }
        handleCancel()
        
    }

    const handleMaxAmountChange = (event) => { 
        setMaxAmount(event.target.value)
    }

    const handleAmountChange = (event) => { 
        setAmount(event.target.value)
    }

    const updatebudgetAPICall = async () => {
        console.log(title, amount, maxAmount)
        await fetch('http://localhost:3000/updatebudget', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
              'budgetname': title,
              'amount': amount,
              'maxamount': maxAmount,
            }) 
        }).then((response) => {
            response.json().then((response) => {
                if (response) {
                    budgetApiCall();
                }
            })
        })
    }
    
  return (
        <>
          <Modal title={ title } visible={visible} onOk={okClickHandle} onCancel={handleCancel}>
          <label> Amount  </label> <br/>
          <Input  onChange={handleAmountChange} value={amount} type="number" /> <br />
              
          <br/>
          <label> Maximum Amount  </label> <br/>
          <Input onChange={handleMaxAmountChange} value={maxAmount} type="number"/> <br />
      </Modal>
      </>
  )
}

export default AddExpense