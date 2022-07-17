import {Modal, Input, message} from 'antd';
import React from 'react';


 function AddBudget({ budgetApiCall, visible, handleCancel, handleOk, budgetList}) {
  const [expense, setexpense] = React.useState("");
  const [maxamount, setmaxamount] = React.useState(0);
  const [amount, setamount] = React.useState(0);

  const addbudgetAPICall = async () => {
      await fetch('/addbudget', {
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

     const validateCopies = (expens) => {
         budgetList.map((el) => {
             if(el.budgetname === expens){
                 return true
             }
         })
         return false
     }

  const validateInputs = () => {
    if (expense === ""){
        message.warning("Please enter the expense name")
        return false

    }else if(validateCopies(expense)) {
        message.warning("expense name already exists")
        return false
    }
    else if (maxamount === 0){
        message.warning("Max amount should not be equal to 0")
        return false

    }else if (!Number.isInteger(Number(maxamount))){
        message.warning("Max amount should be integer")
        return false
    }else{
        return true
    }


  }

  const handlePreCancel = () => {
      setDefaultValues()
      handleCancel()
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
      handlePreCancel()
    }

  }

    return (
      <>
        <Modal title="Add Budget" visible={visible} onOk={okClickHandle} onCancel={handlePreCancel}>
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