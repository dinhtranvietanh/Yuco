import { Affix, Button, Col, Divider, Layout, Row } from "antd";
import { HomeOutlined, FormOutlined ,MessageOutlined, ProfileOutlined } from "@ant-design/icons";

const styleButton = {
    background: 'black', color: 'yellow', borderRadius: 12, boxShadow: "2px 2px 2px #876800", marginTop: '10px'
}
    


export const SideBar = () => {

  return (
    <div style={{ width: "100%", height: '700px' }}>
      <Layout
        style={{
          padding: "20px",
          width: "250px",
          background: "#fadb14",
          boxShadow: "2px 2px 2px #d4b106",
          height: '100%'
        }}
      >
        <span style={{ fontSize: 30 }}>
          {" "}
          <img
            style={{
              width: "75px",
              borderRadius: 10,
              boxShadow: "2px 2px 2px 0",
            }}
            src={`./mill-eye-icon.png`}
          />{" "}
          <strong>
          Yuco
          </strong>
        </span>
        <Divider style={{background: 'black'}} />

        <Row style={styleButton}>
          <Col span={5}>
            <HomeOutlined style={{ fontSize: 30, marginTop: 12, marginLeft: 12 }} />
          </Col>
          <Col span={18}>
            <Button type="text" style={{ height: 50, width: '100%' }}>
              <span style={{ fontSize: 30, color: 'yellow' }}>HOME</span>
            </Button>
          </Col>
        </Row>


        <Row style={styleButton}>
          <Col span={5}>
            <FormOutlined style={{ fontSize: 30, marginTop: 12, marginLeft: 12 }} />
          </Col>
          <Col span={18}>
            <Button type="text" style={{ height: 50, width: '100%' }}>
              <span style={{ fontSize: 30, color: 'yellow' }}>POST</span>
            </Button>
          </Col>
        </Row>

        <Row style={styleButton}>
          <Col span={5}>
            <MessageOutlined style={{ fontSize: 30, marginTop: 12, marginLeft: 12 }} />
          </Col>
          <Col span={18}>
            <Button type="text" style={{ height: 50, width: '100%' }}>
              <span style={{ fontSize: 30, color: 'yellow' }}>MESSAGE</span>
            </Button>
          </Col>
        </Row>

        <Row style={styleButton}>
          <Col span={5}>
            <ProfileOutlined style={{ fontSize: 30, marginTop: 12, marginLeft: 12 }} />
          </Col>
          <Col span={18}>
            <Button type="text" style={{ height: 50, width: '100%' }}>
              <span style={{ fontSize: 30, color: 'yellow' }}>PROFILE</span>
            </Button>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};
