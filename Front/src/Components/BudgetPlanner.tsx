import { PageHeader, Button, Popconfirm, message, Skeleton, Tag } from 'antd';
import { DollarOutlined } from '@ant-design/icons'
import BudgetCard from './BudgetCard.tsx';
import React, {useState} from 'react';
import AddBudget from './AddBudget.tsx';
import AddCreditCard from './AddCreditCardModal.tsx';
import CardList from './CardList.tsx';


export default function BudgetPlanner() {
    const [budgetList, setBudgetList] = React.useState([]);
    const [availableCredit, setavailableCredit] = React.useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCreditModalVisible, setIsCreditModalVisible] = useState(false);
    const [isCreditListModalVisible, setIsCreditListModalVisible] = useState(false);
    const [isSkeleton, setSkeleton] = useState(true);

    const getBudgetListAPICall = async () => {
        await fetch('/getBudgetList', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            }
        }).then((response) => {
            response.json().then((response) => {
                if (response['isSuccess']) {
                    setBudgetList(response.res)
                    setTimeout(() => {
                        setSkeleton(false)
                    }, 500);
                }
                else{
                    console.log("Error while calling getBudgetList API"+ response.message)
                }
            })
        })
    }

    const getAvailableCreditAPICall = async () => { 
        await fetch('/getAvailableCredit', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            }, 
        }).then((response) => {
            response.json().then((response) => {
                if (response.isSuccess) {
                    setavailableCredit(response.res)
                }
                else{
                    console.log("Error in adding expense:" + response.error)
                }
            })
        })

    }


    const showCreditListModal = () => {
        setIsCreditListModalVisible(true);
    };

    const handleCreditListCancel = () => {
        setIsCreditListModalVisible(false);
    };

    const handleCreditListOk = () => {
        getAvailableCreditAPICall()
        setIsCreditListModalVisible(false);
    };


    const showCreditModal = () => {
        setIsCreditModalVisible(true);
    };

    const handleCreditCancel = () => {
        setIsCreditModalVisible(false);
    };

    const handleCreditOk = () => {
        setIsCreditModalVisible(false);
    };

    const showModal = async () => {
        await fetch('/getAvailableCredit', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            }, 
        }).then((response) => {
            response.json().then((response) => {
                if (response.isSuccess) {
                    if (response.res) {
                        setIsModalVisible(true);
                    }
                    else { 
                        message.error('No credit detected. Please add credit before adding budget.');
                    }
                }
                else {
                    console.log("Error in fetching credit card info")
                }
            })
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    React.useEffect(() => {
        getBudgetListAPICall();
    }, [])

    React.useEffect(() => {
        getAvailableCreditAPICall();
    }, [])

    const cancel = (e: React.MouseEvent<HTMLElement>) => {
        message.error('Cancelled');
    };

    const confirm = async (e: React.MouseEvent<HTMLElement>) => {
        await fetch('/deleteAllBudgets', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('token')?.toString()
            }
        }).then((response) => {
            response.json().then((response) => {
                if (response['isSuccess']) {
                    getBudgetListAPICall();
                    getAvailableCreditAPICall();
                    message.success('All budgets deleted Successfully');
                }
            })
        })
    };
    
    return (
        <div style={{paddingTop: "60px"}}>
        <Skeleton style={{padding: "50px 50px 50px 50px"}} loading={isSkeleton}>
            <PageHeader
                title={`Available Credit  `}
                tags={<Tag style={{ width: "120px", height:"25px", fontSize:"16px", textAlign: 'center'}} icon={<DollarOutlined />} color="blue">CA ${availableCredit}</Tag>}
                extra={
                    [
                        <Button onClick={showCreditModal} key="3">Add Credit/Debit Card</Button>,
                        <Button onClick={showCreditListModal} key="4">My Cards</Button>,
                        <Button onClick={showModal} key="1">Add Budget</Button>,
                        <Popconfirm
                            title="Are you sure to delete all entries?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Delete"
                            cancelText="Cancel"
                        >
                        <Button danger key="2">Delete All</Button>,
                        </Popconfirm>,
                        
                    ]
            }    
            />
            <div style={budgetRows}>
            {
                budgetList.map(budget => (
                    <BudgetCard creditApiCall={getAvailableCreditAPICall} budgetApiCall={getBudgetListAPICall} key={ budget["budgetname"] } cardTitle={ budget["budgetname"] } amount={budget["amount"]} maxAmount={ budget["maximumamount"]}></BudgetCard>
            )) 
            }
            </div>
                <AddBudget budgetApiCall={getBudgetListAPICall} visible={isModalVisible} handleCancel={handleCancel} budgetList={budgetList} handleOk={handleOk}></AddBudget>
                <AddCreditCard creditApiCall={getAvailableCreditAPICall} visible={isCreditModalVisible} handleCancel={handleCreditCancel} handleOk={handleCreditOk}></AddCreditCard>
                <CardList creditApiCall={getAvailableCreditAPICall} visible={isCreditListModalVisible} handleCancel={handleCreditListCancel} handleOk={handleCreditListOk} ></CardList>
        </Skeleton>
        </div>
  )
}

const budgetRows = {
    margin: 45,
    display: "inline-flex",
    flexWrap: "wrap",
}