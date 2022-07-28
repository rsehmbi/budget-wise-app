import React from 'react';
import {Skeleton, PageHeader, Button, Table, Select} from 'antd';
import {useState, useEffect} from 'react';
// @ts-ignore
import AddOwing from './AddOwing.tsx';
// @ts-ignore
import { parseDate, addCurrency} from "../Utils/UtilFunctions.ts";
// @ts-ignore
import {getAllOwingLogs, getMyOwingLogs, getOwingMeLogs } from '../Services/BudgetServices.ts';

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
    const [isSkeleton, setSkeleton] = useState(false);
    const [oweModal, setOweModal] = useState(false);
    const [owingLogs, setOwingLogs] = useState([]);    

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
        }
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <>
        //       <Space size="middle">
        //         <Button type="link" onClick={()=>showEditModal(record)} icon={<EditFilled />}></Button>
        //         <Popconfirm
        //                 title={`Are you sure to delete?`}
        //                 onConfirm={() => confirmDelete(record)}
        //                 onCancel={cancel}
        //                 okText="Delete"
        //                 cancelText="Cancel"
        //             >
        //             <Button type="link" danger icon={<DeleteFilled />}></Button>
        //             </Popconfirm>
        //         {/* <Button type="link" onClick={()=>console.log(record)} danger icon={<DeleteFilled />}></Button> */}
                
        //       </Space>
          
        //       </>
        //     ),
        //   }
    ]

    useEffect(() => {
        getOwingLogs(ALL_LOGS);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const showOweModal = () => {
        setOweModal(true)
    }

    const hideOweModal = () => {
        setOweModal(false)
    }

    function getOwingLogs(value){
        if(value==ALL_LOGS){
            getAllOwingLogs().then((response) => {response.json().then((response) => {
                if (response.isSuccess) {
                    parseDate(response.res)        // Set date format
                    addCurrency(response.res)      // Add currency type
                    setOwingLogs(response.res)
                 
                }
                else{
                    console.log("Failed to get all owing logs: " + response.error)
                }
                })
            })
        }
        else if(value=="youOwe"){
            getMyOwingLogs().then((response) => {response.json().then((response) => {
                if (response.isSuccess) {
                    parseDate(response.res)        // Set date format
                    addCurrency(response.res)      // Add currency type
                    setOwingLogs(response.res)
                 
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
                 
                }
                else{
                    console.log("Failed to get owing me logs: " + response.error)
                }
                })
            })
        }

    }


    return (
       <div style={{paddingTop: "60px"}}>
            <Skeleton style={{padding: "50px 50px 50px 50px"}} loading={isSkeleton}>    
            <PageHeader
                
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
            <AddOwing visible={oweModal} hideOweModal={hideOweModal}/>

            </Skeleton>
       </div>)
}

export default FriendWise;