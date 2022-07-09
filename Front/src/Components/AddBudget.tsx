import { Modal, Input } from 'antd';
import React from 'react';


function AddBudget({ budgetApiCall, visible, handleCancel, handleOk }) {
  const [expense, setexpense] = React.useState("");
  const [maxamount, setmaxamount] = React.useState(0);

  const addbudgetAPICall = async () => {
      await fetch('http://localhost:3000/addbudget', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              'expense': expense,
              'maxamount': maxamount
          }) 
      }).then((response) => {
          response.json().then((response) => {
              if (response) {
                budgetApiCall()
              }
          })
      })
  }
  
  const handleExpenseChange = (event) => { 
    setexpense(event.target.value)
  }

  const handleAmountChange = (event) => { 
    setmaxamount(event.target.value)
  }

  const validateInputs = () => {
    if (expense !== "" && maxamount !== 0) { 
      return true
    }
    return false
  }

  const setDefaultValues = () => {
    setexpense("")
    setmaxamount(0)
  }
  
  const okClickHandle = () => {
    if (validateInputs() === true) { 
      addbudgetAPICall();
      handleOk();
      setDefaultValues();
    }
    handleCancel()
  }

    return (
      <>
        <Modal title="Add Budget" visible={visible} onOk={okClickHandle} onCancel={handleCancel}>
          <label> Expense </label> <br/>
          <Input onChange={handleExpenseChange} value={expense} placeholder="Ex: Groceries, car payment etc." /> <br />
          
          <br/>

          <label> Maximum Amount  </label> <br/>
          <Input onChange={handleAmountChange}  value={maxamount} type="number" placeholder="Ex: $500, $800 etc." /> <br />
      </Modal>
      </>

  )
}

export default AddBudget