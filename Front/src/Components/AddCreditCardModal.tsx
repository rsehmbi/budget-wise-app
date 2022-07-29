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

    const updatedValue = {}
    updatedValue[name] = value
    
    setState({
      ...state,
      ...updatedValue
    })
  }
    
    const handleOkClick = async () => {
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
                    console.log("Error in adding credit card:" + response.error)
                }
            })
        })
        creditApiCall()
        handleOk()
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
            type="tel"
            name="number"
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
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            />

            <br />
            <br />
            <label> Amount  </label> 
            <Input
            type="tel"
            name="amount"
            placeholder="Amount"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            />
        </div>
        </Modal>
    </>

}

export default AddCreditCard