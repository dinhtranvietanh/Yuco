import { Affix, Button, Col, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Header = ({loadingAbout, loadingInfo , setLoadingInfo, setLoadingAbout}) => {


  return (
    <Affix offsetTop={0} style={{width: '100%'}} >
      <Row className="main-nav">
        <Col className="button-header" span={8}>
          <div style={{textAlign: 'center'}}>
            <span style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>
              Welcome
            </span>
          </div>
        </Col>
        <Col className="button-header" span={8}>
          <div onClick={() => setLoadingInfo(!loadingInfo)} style={{textAlign: 'center'}}>
            <span style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>
              Information
            </span>
          </div>
        </Col>
        <Col className="button-header" span={8}>
          <div onClick={() => setLoadingAbout(!loadingAbout)} style={{textAlign: 'center'}}>
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
