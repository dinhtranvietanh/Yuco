import { Affix, Button, Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
    const {auth} = useSelector((state) => state)
    console.log(auth)
  return (
    <Affix offsetTop={0} className="main-nav">
      <Row>
        <Col className="button-header" span={8}>
          <div style={{textAlign: 'center'}}>
            <span style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>
              Welcome
            </span>
          </div>
        </Col>
        <Col className="button-header" span={8}>
          <div style={{textAlign: 'center'}}>
            <span style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>
              Information
            </span>
          </div>
        </Col>
        <Col className="button-header" span={8}>
          <div style={{textAlign: 'center'}}>
            <span style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>
              About
            </span>
          </div>
        </Col>
      </Row>
    </Affix>
  );
};

export default Header;
