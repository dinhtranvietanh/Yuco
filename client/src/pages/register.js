import React from "react";
import { Card, Form, Row, Col, Button, Layout, Input } from "antd";
const Register = () => {
  // ./mill-eye-icon.png
  return (
    <Layout
      style={{
        backgroundColor: "",
        marginTop: "100px",
        marginLeft: "150px",
        borderRadius: 10,
        boxShadow: "2px 2px 2px 0",
      }}
    >
      <Row style={{padding: 30}} justify="center" align="middle">
        <Col span={8}>
          <img
            style={{ borderRadius: 10, boxShadow: "2px 2px 2px 0" }}
            src={`./mill-eye-icon.png`}
          />
          <h1 style={{fontSize: 25}}>WellCome to Yuco</h1>
          <small>New Yugioh community...</small>
        </Col>
        <Col span={14}>
          <Card style={{ margin: 10 }} title={<h1>REGISTER ACCOUNT</h1>}>
            <div style={{marginTop: 15}}>Email:</div>
            <Input />

            <div style={{marginTop: 15}}>Password:</div>
            <Input/>

            <div style={{marginTop: 15}}>Re-Password:</div>
            <Input/>

            <Row gutter={[12,12]} style={{marginTop: 20}}>
                <Col>
                    <Button size='large' type='primary'>Register</Button>
                </Col>
                <Col>
                    <Button size='large'>Login Now</Button>
                </Col>
                <Col>
                    <span>Register account and join Yuco...</span>
                </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default Register;
