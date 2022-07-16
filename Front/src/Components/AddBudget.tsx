import { Modal, Input } from 'antd';
import React from 'react';


function AddBudget({ budgetApiCall, visible, handleCancel, handleOk }) {
  const [expense, setexpense] = React.useState("");
  const [maxamount, setmaxamount] = React.useState(0);
  const [amount, setamount] = React.useState(0);

  const addbudgetAPICall = async () => {
      await fetch('http://localhost:3000/addbudget', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'x-access-token': localStorage.getItem('token')?.toString()
          },
          body: JSON.stringify({
              'expense': expense,
              'maxamount': maxamount,
              'amount': amount
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

  // Commenting it out until deature finalizes
  // const handleAddAmountChange = (event) => { 
  //   setamount(event.target.value)
  // }

  const validateInputs = () => {
    if (expense !== "" && maxamount !== 0 && amount !== 0) { 
      return true
    }
    return false
  }

  const setDefaultValues = () => {
    setexpense("")
    setmaxamount(0)
    setamount(0)
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

          <br/>
          {/* Can't Initial amount as we need description too for each amount, will need a query change if this is needed to add to both tables
          <label> Initial Amount  </label> <br/>
          <Input onChange={handleAddAmountChange}  value={amount} type="number" placeholder="Ex: $50, $80 etc." /> <br /> */}
      </Modal>
      </>

  )
}

export default AddBudget