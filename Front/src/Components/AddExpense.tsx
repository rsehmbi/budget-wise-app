import { Modal, Input, message } from 'antd';
import * as React from "react";

function AddExpense({ budgetApiCall, title, visible, handleOk, handleCancel}) {
    const [amount, setAmount] = React.useState(0);
    const [expenseDescrip, SetExpenseDescrip] = React.useState("")

    const setDefaultValues = () => {
        setAmount(0)
        SetExpenseDescrip("")
    }
    
    const validateInputs = () => {
        if (amount !== 0 && expenseDescrip !== "") { 
            return true
        }
        return false
    }

    const okClickHandle = () => {
        if (validateInputs() === true) {
            addExpenseAPICall();

            handleOk();
            setDefaultValues();
        }
        handleCancel()
    }

    const handleDesciptionChange = (event) => { 
        SetExpenseDescrip(event.target.value)
    }

    const handleAmountChange = (event) => { 
        setAmount(event.target.value)
    }

    const addExpenseAPICall = async () => {
        await fetch('/addExpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            },
            body: JSON.stringify({
              'budgetcategory': title,
              'amount': amount,
              'description': expenseDescrip ,
            }) 
        }).then((response) => {
            response.json().then((response) => {
                if (response.isSuccess) {
                    budgetApiCall();
                    message.success('Expense added successfully');
                }
                else{
                    console.log("Error in adding expense:" + response.error)
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
          <label> Description </label> <br/>
          <Input onChange={handleDesciptionChange} placeholder={"Describe your expense"} maxLength={20} value={expenseDescrip} type="string"/> <br />
      </Modal>
      </>
  )
}

export default AddExpense