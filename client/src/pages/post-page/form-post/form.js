

import { Button, Col, Modal, Row } from 'antd'
import React from 'react'

const Form = ({status, setStatus}) => {

    const handleSubmitForm = () => {

    }
  return (
    <Modal 
        closable={false}
        visible={status}
        title={<span style={{fontWeight:'bold'}}>CREATE NEW POST</span>}
        footer={[
            <Row justify="">
                <Col offset={15}>
                    <Button style={{marginRight: 15, color: 'yellow',background:'black',borderRadius: 10}}>Upload</Button>
                </Col>
                <Col>
                    <Button style={{borderRadius: 10}} onClick={() => setStatus(false)}>Cancel</Button>
                </Col>
            </Row>
        ]}
    >
        

    </Modal>
  )
}

export default Form