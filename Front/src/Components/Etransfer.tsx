import React from 'react';
import {Skeleton, PageHeader, Button} from 'antd';
import {useState} from 'react';

function Etransfer() {
    const [isSkeleton, setSkeleton] = useState(false);
    const [modalHidden, setModalHidden] = useState(true);

    const showModal = () => {
        setModalHidden(false)
    }

    return (
       <div style={{paddingTop: "60px"}}>
            <Skeleton style={{padding: "50px 50px 50px 50px"}} loading={isSkeleton}>    
            <PageHeader
                
                extra={
                    [
                        <Button onClick={showModal} key="1">Send E-Transfer</Button>,   
                    ]
            }    
            />


            </Skeleton>
       </div>)
}

export default Etransfer;