import React, { useState } from "react";
import { Card, Form, Row, Col, Button, Layout, Input } from "antd";
import { Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
const Register = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [rePass, setRePass] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      email: email,
      password: pass,
      confirmpassword: rePass,
    }
    dispatch(register(data))
}

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
            <Input onChange={(e) => setEmail(e.target.value)}  />

            <div style={{marginTop: 15}}>Password:</div>
            <Input.Password onChange={(e) => setPass(e.target.value)} />

            <div style={{marginTop: 15}}>Re-Password:</div>
            <Input.Password onChange={(e) => setRePass(e.target.value)}/>

            <Row gutter={[12,12]} style={{marginTop: 20}}>
                <Col>
                    <Button onClick={handleSubmit} size='large' type='primary'>Register</Button>
                </Col>
                <Col>
                  <Link to="/login">
                    <Button path size='large'>Login Now</Button>
                  </Link>
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
