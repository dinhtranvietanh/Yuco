import { Col, Row } from 'antd'
import React from 'react'
import { SideBar } from '../components/sideBar'

const Home = () => {
    return (
        <Row>
            <Col span={4}>
                <SideBar/>
            </Col>

            <Col span={20}>
            
            </Col>
        </Row>
    )
}

export default Home