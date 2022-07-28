import React from 'react';
import {Skeleton, PageHeader, Button} from 'antd';
import {useState} from 'react';
// @ts-ignore
import AddOwing from './AddOwing.tsx';

function FriendWise() {
    const [isSkeleton, setSkeleton] = useState(false);
    const [oweModal, setOweModal] = useState(false);

    const showOweModal = () => {
        setOweModal(true)
    }

    const hideOweModal = () => {
        setOweModal(false)
    }


    return (
       <div style={{paddingTop: "60px"}}>
            <Skeleton style={{padding: "50px 50px 50px 50px"}} loading={isSkeleton}>    
            <PageHeader
                
                extra={
                    [
                        <Button onClick={showOweModal} key="1">Add Owing</Button>,   
                    ]
            }    
            />
            <AddOwing visible={oweModal} hideOweModal={hideOweModal}/>

            </Skeleton>
       </div>)
}

export default FriendWise;