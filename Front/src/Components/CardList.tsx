import React from 'react'
import { Modal, Input} from 'antd';
import { CreditCardOutlined, DeleteOutlined } from '@ant-design/icons'
import { List } from 'antd';

function CardList({ creditAPICall, visible, handleCancel, handleOk }) {
    const [cardList, setCardList] = React.useState([]);
    
    const getCardListAPICall = async () => {
        await fetch('/getUserCreditCards', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            }
        }).then((response) => {
            response.json().then((response) => {
                if (response['isSuccess']) {
                    setCardList(response.res)
                }
                else{
                    console.log("Error while calling Card List API"+ response.message)
                }
            })
        })
    }


    const updateCCAmountAPICall = async (amt, nos) => {
        await fetch('/updateCreditCardAmount', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            },
            body: JSON.stringify({
                'amount': amt,
                'number': nos,
            }) 
        }).then((response) => {
            response.json().then((response) => {
                if (response) {
                    getCardListAPICall()
                }
            })
        })
    }

    const updateCCAmount = (amt, nos) => {
        if (amt && nos) { 
            console.log("I come here")
            updateCCAmountAPICall(amt, nos)
        } 
    }

    const deleteCreditCard = async (nos) => {
        await fetch('/deleteCreditCard', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            },
            body: JSON.stringify({
              'number': nos,
          }) 
        }).then((response) => {
            response.json().then((response) => {
                if (response['isSuccess']) {
                    getCardListAPICall()
                    creditAPICall()
                }
                else{
                    console.log("Error while calling Card List API"+ response.message)
                }
            })
        })
        }
    
    const deleteCreditCardFromList = (nos) => { 
        deleteCreditCard(nos)
    }

    React.useEffect(() => {
        getCardListAPICall();
    }, [visible])

  return (
        <>
          <Modal title="My Card List" visible={visible} onOk={handleOk} onCancel={handleCancel}>
            <List
                itemLayout="horizontal"
                dataSource={cardList}
                renderItem={item => (
                    <List.Item extra={
                        <>
                        <div>
                            <label>Amount</label>
                                <Input style={{ width: '80px', display: 'flex', justifyContent: 'center' }} type='number' onChange={(event) => updateCCAmount(event.target.value, item['number'])} defaultValue={item['amount']} />
                        </div>
                            <DeleteOutlined onClick={() => deleteCreditCardFromList(item['number'])} style={{ color:'red', marginLeft:"10px" }}/>
                        </>  
                }>
                    <List.Item.Meta
                            avatar={<CreditCardOutlined style={{ fontSize: '18px', color: '#08c' }} />}
                            title={<a href="https://ant.design">{item['cardname']}</a>}
                            description={`Card Number: ${item['number']} Expiry Date (MM/YY): ${item['expiry']} `}
                    />   
                </List.Item>
                )}
            />
        </Modal>
      </>
  )
}

export default CardList