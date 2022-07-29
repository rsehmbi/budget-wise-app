import React from 'react';
import {Skeleton, PageHeader, message, Button, Table, Select, Space, Popconfirm, Modal, Input, Tag} from 'antd';
import { DeleteFilled, EditFilled, DollarOutlined } from "@ant-design/icons";
import {useState, useEffect} from 'react';
// @ts-ignore
import { currencyFormatter } from "../Utils/CurrencyUtils.tsx";
// @ts-ignore
import AddOwing from './AddOwing.tsx';
// @ts-ignore
import { parseDate, addCurrency} from "../Utils/UtilFunctions.ts";
// @ts-ignore
import {getAllOwingLogs, getMyOwingLogs, getOwingMeLogs, deleteOweLog, updateOweLogAPICall, getTotalOwingsAPI} from '../Services/BudgetServices.ts';

const { Option } = Select;

const tableProperties = {                      // Table Style Properties
    width: '90%',
    margin: 'auto'
}

const ALL_LOGS = 'All';                       // For state where we get all information

const SelectMenuProperties = {                // Drop down menu style proeprties
    width: "10rem",
}

function FriendWise() {
    const [isSkeleton, setSkeleton] = useState(true);
    const [oweModal, setOweModal] = useState(false);
    const [owingLogs, setOwingLogs] = useState([]); 
    const [curLogs, setCurLogs] = useState(ALL_LOGS)   
    const [totalOwings, setTotalOwings]= useState(0)

    // Edit Modal
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [modalAmount, setModalAmount] = useState(0);
    const [modalDescrip, setModalDescrip] = useState("")
    const [currentId, setCurrentId] = useState(0)

    // Columns to display in logs
    const columns = [
        {
            title: 'Sender',
            dataIndex: 'sender',
            key: 'budgetname',
        },
        {
            title: 'Receiver',
            dataIndex: 'receiver',
            key: 'recevier',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Desciption',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
              <Space size="middle">
                <Button type="link" onClick={()=>showEditModal(record)} icon={<EditFilled />}></Button>
                <Popconfirm
                        title={`Are you sure to delete?`}
                        onConfirm={() => confirmDelete(record)}
                        onCancel={cancel}
                        okText="Delete"
                        cancelText="Cancel"
                    >
                    <Button type="link" danger icon={<DeleteFilled />}></Button>
                    </Popconfirm>
                {/* <Button type="link" onClick={()=>console.log(record)} danger icon={<DeleteFilled />}></Button> */}
                
              </Space>
          
              </>
            ),
          }
    ] 

    // Modal functions
    const showEditModal = (record) => {
        setModalDescrip(record.description)
        setModalAmount(parseInt(record.amount.match(/(\d+)/)))
        setCurrentId(record.id)

        setIsEditModalVisible(true);
    };

    const hideEditModal = () => {
        setIsEditModalVisible(false);
    };

    const cancel = () => {
        message.error('Cancelled');
    };

    const okClickHandle = () => {
        if (validateInputs() === true) {
            updateOweLog();

            hideEditModal()
            handlePreCancel()
        }
    }

    function updateOweLog(){
        updateOweLogAPICall(currentId, modalAmount, modalDescrip).then((response) => {
            response.json().then((response) => {
                if (response.isSuccess) {
                    getOwingLogs(curLogs);
                    getTotalOwings()
                    message.success('Owings updated successfully');
                }
                else{
                    console.log("Error in adding expense:" + response.error)
                }
            })
        })
    }

    const validateInputs = () => {
        if (modalDescrip === ""){
            message.warning("Please enter a description")
            return false

        } else if (modalAmount === 0){
            message.warning("Amount should not be equal to 0")
            return false

        }else if (!Number.isInteger(Number(modalAmount))){
            message.warning("Amount should be integer")
            return false
        }else{
            return true
        }
    }

    const confirmDelete = (record) => {
        console.log("Going to delete")
        deleteOweLog(record.id).then((response) => {
            response.json().then((response) => {
                if (response['isSuccess']) {
                    getOwingLogs(curLogs);
                    getTotalOwings()
                    message.success('Log Deleted Successfully');
                }
            })
        })
    };

    useEffect(() => {
        getOwingLogs(ALL_LOGS);
        getTotalOwings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const showOweModal = () => {
        setOweModal(true)
    }

    const hideOweModal = () => {
        setOweModal(false)
    }

    const handlePreCancel = () => {
        hideEditModal()
    }

    const handleAmountChange = (event) => { 
        setModalAmount(event.target.value)
    }

    const handleDescripChange = (event) => { 
        setModalDescrip(event.target.value)
    }

    function getOwingLogs(value){
        setCurLogs(value)
        if(value===ALL_LOGS){
            getAllOwingLogs().then((response) => {response.json().then((response) => {
                if (response.isSuccess) {
                    parseDate(response.res)        // Set date format
                    addCurrency(response.res)      // Add currency type
                    setOwingLogs(response.res)
                    setSkeleton(false)
                    getTotalOwings()
                 
                }
                else{
                    console.log("Failed to get all owing logs: " + response.error)
                }
                })
            })
        }
        else if(value==="youOwe"){
            getMyOwingLogs().then((response) => {response.json().then((response) => {
                if (response.isSuccess) {
                    parseDate(response.res)        // Set date format
                    addCurrency(response.res)      // Add currency type
                    setOwingLogs(response.res)
                    setSkeleton(false)
                    getTotalOwings()
                 
                }
                else{
                    console.log("Failed to get my owing logs: " + response.error)
                }
                })
            })   
        }
        else{
            getOwingMeLogs().then((response) => {response.json().then((response) => {
                if (response.isSuccess) {
                    parseDate(response.res)        // Set date format
                    addCurrency(response.res)      // Add currency type
                    setOwingLogs(response.res)
                    setSkeleton(false)
                    getTotalOwings()
                 
                }
                else{
                    console.log("Failed to get owing me logs: " + response.error)
                }
                })
            })
        }

    }

    const getTotalOwings = () => { 
        getTotalOwingsAPI().then((response) => {
            response.json().then((response) => {
                if (response.isSuccess) {
                    setTotalOwings(response.res)
                }
                else{
                    console.log("Error updating response" + response.error)
                }
            })
        })

    }


    return (
       <div style={{paddingTop: "60px"}}>
            <Skeleton style={{padding: "50px 50px 50px 50px"}} loading={isSkeleton}>   
            
            <PageHeader
            title={`Total Owings  `}
            tags={<Tag style={{ width: "120px", height:"25px", fontSize:"16px", textAlign: 'center'}} icon={<DollarOutlined />} color="blue">{currencyFormatter.format(totalOwings)}</Tag>} 
                
                extra={
                    [
                        <Button onClick={showOweModal} key="1">Add Owing</Button>, 
                        <Select
                        defaultValue = {ALL_LOGS}
                        style={SelectMenuProperties}
                        onSelect={getOwingLogs}
                        >
                            <Option value="All">All</Option>
                            <Option value="youOwe">You Owe</Option>
                            <Option value="OweMe">Owes Me</Option>
                        </Select>  
                    ]
            }    
            />
            <Table columns={columns} dataSource={owingLogs} style={tableProperties}></Table>;

            <AddOwing getTotalOwings={getTotalOwings} getOwingLogs={getOwingLogs} dropDown={curLogs} visible={oweModal} hideOweModal={hideOweModal}/>

            <Modal title="Edit Amount" visible={isEditModalVisible} onOk={okClickHandle} onCancel={handlePreCancel}>
                <label> Description: </label> <br/>
                <Input onChange={handleDescripChange} value={modalDescrip} type="string"/><br/>

                <br/>
                <label> Amount  </label> <br/>
                <Input  onChange={handleAmountChange} value={modalAmount} type="number" /> <br />        
                
                </Modal>

            </Skeleton>
       </div>)
}

export default FriendWise;