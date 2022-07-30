import {Modal, Input, message} from 'antd';
import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'

function AddCreditCard({ creditApiCall, visible, handleCancel, handleOk }) {
    const [state, setState] = React.useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
        amount: ''
    })
 
  const handleInputFocus = (e) => {
    const updatedValue = {}
    updatedValue['focus'] = e.target.name
    
    setState({
      ...state,
      ...updatedValue
    }) 
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") { 
      if (value < 0) { 
        message.warn("Number can't be negative")
      }
      if (value.toString().length > 16) { 
        message.warn("Number can't be greater than 16 digits")
      }
    }

    if (name === "expiry") { 
      if (value < 0) { 
        message.warn("Expiry can't be negative")
      }
      if (value.toString().length > 4) { 
        message.warn("Please enter correct expiry date, month followed by year")
      }
      if (value.toString().length === 2) { 
        let digits = value.toString()
        let one = digits[0]
        let two = digits[1]
        let first_two = parseInt(one + two)
        if (first_two <= 0 || first_two > 12) { 
          message.warn("Please enter correct month for expiry")
        }
      }
      if (value.toString().length === 4) { 
        let digits = value.toString()
        let one = digits[0]
        let two = digits[1]
        let three = digits[2]
        let four = digits[3]
        
        let first_two = parseInt(one + two)
        let last_two = parseInt(three + four)
        if (first_two <= 0 || first_two > 12) { 
          message.warn("Please enter correct month for expiry")
        }
        let currentYear = parseInt(new Date().getFullYear().toString().substr(2, 2), 10);
        let currentMonth = new Date().getMonth() + 1
        if (first_two < currentMonth && last_two < currentYear) { 
          message.warn("Your Credit card is expired")
        }
      
      }
    }

    if (name === "amount") { 
      if (value < 0) { 
        message.warn("Amount can't be negative")
      }
    }

    const updatedValue = {}
    updatedValue[name] = value
    
    setState({
      ...state,
      ...updatedValue
    })
  }

  const validateInputs = () => { 
    let ccnumber = document.getElementById("ccnumber")
    let ccName = document.getElementById("ccName")
    let ccExpiry = document.getElementById("ccexpiry")
    let ccAmount = document.getElementById("ccAmount")
    if (ccnumber?.value.toString().length < 16 || ccnumber?.value < 0 || ccnumber?.value.toString().length === 0 || ccnumber?.value.toString().length > 16) { 
      message.error("Unable to add Credit. Please enter correct credit card number")
      return false
    }

    if (ccName?.value.toString().length <= 0) { 
      message.error("Unable to add Credit. Please enter Card Name")
      return false
    }

    if (ccExpiry?.value.toString().length <= 0 || ccExpiry?.value.toString().length > 4 || ccExpiry?.value < 0) { 
      message.error("Unable to add Credit. Please enter correct Expiry date")
      return false
    }

    if (ccAmount?.value.toString().length <= 0 || ccAmount?.value <= 0) { 
      message.error("Unable to add Credit. Please enter correct Amount ")
      return false
    }
    return true
  }
    
  const handleOkClick = async () => {
    if (validateInputs()) { 
        await fetch('/addCreditCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            },
            body: JSON.stringify({
              'expiry': state.expiry,
              'amount': state.amount,
              'cardname': state.name,
              'number': state.number,
            }) 
        }).then((response) => {
            response.json().then((response) => {
                if (response.isSuccess) {
                    message.success('Credit added successfully');
                }
                else{
                    console.log(response.error)
                }
            })
        })
        creditApiCall()
        handleOk()
      }
    }

    
    return<>
        <Modal title="Add Credit/Debit Card" visible={visible} onOk={handleOkClick} onCancel={handleCancel}>
        <div id="PaymentForm">
            <Cards
            cvc={state.cvc}
            expiry={state.expiry}
            focused={state.focus}
            name={state.name}
            number={state.number}
            />
            <br/>
            <label> Card Number  </label> <br/>
            <Input
            type="number"
            name="number"
            id="ccnumber"
            placeholder="Card Number"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            />
            
            <br />
            <br />
            <label> Card Nick Name  </label> 
            <Input
            type="text"
            name="name"
            id="ccName"
            placeholder="Joint Visa/Mastercard"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            />

            <br />
            <br />
            <label> Expiry  </label> 
            <Input
            type="number"
            name="expiry"
            placeholder="mmYY"
            id="ccexpiry"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            />

            <br />
            <br />
            <label> Amount  </label> 
            <Input
            type="number"
            name="amount"
            id="ccAmount"
            placeholder="Amount"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            />
        </div>
        </Modal>
    </>

}

export default AddCreditCard