import { Card, Col, Divider, Layout, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { auth } = useSelector((state) => state);
  console.log(auth);
  return (
    <Layout
      style={{
        maxWidth: "100%",
        padding: 19
      }}
    >
      <Row>
        <Col span={12}>
          <h1>Welcome to Yuco!</h1>
          <small>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,{" "}
          </small>
        </Col>

        <Col span={8}>
          <Card
            hoverable
            style={{
              width: '100%',
              borderRadius: 40
            }}
          >
            <Card.Meta title={`Hello ${auth?.user?.fullname}`} description="How are you today?" />
          </Card>
        </Col>
      </Row>
      <Divider/>
    </Layout>
  );
};

export default Welcome;
