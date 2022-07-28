import React from 'react';
import {Modal, Input, message, Select, AutoComplete} from 'antd';
import {useState} from 'react';
// @ts-ignore
import { youOweAPI, friendOweAPI } from '../Services/BudgetServices.ts';

const { Option } = Select;

function AddOwing({visible, hideOweModal}) {
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState(0);
    const [whoOwes, setWhoOwes] = useState("youOwe")

    const handleEmailChange = (event) => { 
        setEmail(event.target.value)
    }

    const handleDesciptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }

    const handleOwerChange = (ower) => {
        setWhoOwes(ower)
    }

    const setDefaultValues = () => {
        setAmount(0)
        setDescription("")
        setEmail("")
        setWhoOwes("youOwe")
    }

    const okClickHandle = () => {
        // if (validateInputs() === true) {
        //     addExpenseAPICall();

        //     handleOk();
        //     setDefaultValues();
        //     handlePreCancel()
        // }
        if(whoOwes === "youOwe"){
            addYouOwe()
        }
        else{
            addFriendOwe()
        }
        
        hideOweModal()
        
    }

    const handlePreCancel = () => {
        setDefaultValues()
        hideOweModal()
    }
    
    const addYouOwe = async () => {
       youOweAPI(email, amount, description).then((response) => {
            response.json().then((response) => {
                if (response) {
                    message.success("Added the amount you owe")
                //   budgetApiCall()
                }
            })
        })
    }

    const addFriendOwe = async () => {
        friendOweAPI(email, amount, description).then((response) => {
             response.json().then((response) => {
                 if (response) {
                     message.success("Added the amount you owe")
                 //   budgetApiCall()
                 }
             })
         })
     }
    

    return (
       <>
       <Modal title="Add Owing" visible={visible} onOk={okClickHandle} onCancel={handlePreCancel}>

            <label> Who Owes? </label> <br/>
            <Select onSelect={handleOwerChange} defaultValue="youOwe" style={{ width: '30%' }}>
                <Option value="youOwe">You Owe</Option>
                <Option value="friendOwe">Friend Owes</Option>
            </Select> <br/>
          
          <br/>
          <label> Email  </label> <br/>
          <Input  placeholder="Email" onChange={handleEmailChange} value={email} maxLength={20} type="string" /> <br />        
        
         
          <br/>
          <label> Description </label> <br/>
          <Input onChange={handleDesciptionChange} placeholder={"What do you owe for?"} maxLength={20} value={description} type="string"/> <br />

          <br/>
          <label> Amount </label> <br/>
          <Input onChange={handleAmountChange} maxLength={4} value={amount} type="integer"/> <br />
       </Modal>
       </>
       )
}

export default AddOwing;