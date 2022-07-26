import React from 'react'
import { Modal, Input, message } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons'
import { Avatar, List } from 'antd';

function CardList({ creditAPICall, data, visible, handleCancel, handleOk }) {
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
                    console.log(response.res)
                    setCardList(response.res)
                }
                else{
                    console.log("Error while calling Card List API"+ response.message)
                }
            })
        })
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
                        <div>
                            <label>Amount</label>
                            <Input style={{width:'80px', display:'flex'}}type='number' defaultValue={item.amount}/>
                        </div>
                       
                }>
                    <List.Item.Meta
                            avatar={<CreditCardOutlined style={{ fontSize: '18px', color: '#08c' }} />}
                            title={<a href="https://ant.design">{item.cardname}</a>}
                            description={`Card Number: ${item.number} Expiry Date (MM/YY): ${item.expiry} `}
                    />   
                </List.Item>
                )}
            />
        </Modal>
      </>
  )
}

export default CardList