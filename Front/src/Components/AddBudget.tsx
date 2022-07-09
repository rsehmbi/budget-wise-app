import { Modal, Input } from 'antd';
import React from 'react';


function AddBudget({ visible, handleCancel, handleOk }) {

    return (
      <>
            <Modal title="Add Budget" visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <label> Expense </label> <br/>
                <Input placeholder="Ex: Groceries, car payment etc." /> <br />
                
                <br/>

                <label> Maximum Amount  </label> <br/>
                <Input type="number" placeholder="Ex: $500, $800 etc." /> <br />

      </Modal>
      </>

  )
}

export default AddBudget