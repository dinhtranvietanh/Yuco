import { Col, Row } from 'antd'
import React from 'react'
import Header from '../components/home/header'
import { SideBar } from '../components/sideBar'


const Home = () => {
    return (
        <div>
        <Row gutter={[3,0]}>
            <Col>
                <SideBar/>
            </Col>

            <Col flex={24}>
                <Header/>
            </Col>
        </Row>
        </div>

    )
}

export default Home