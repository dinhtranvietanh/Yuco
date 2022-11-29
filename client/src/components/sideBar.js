import { Affix, Button, Col, Divider, Layout, Row } from "antd";
import {
  HomeOutlined,
  FormOutlined,
  MessageOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const styleButton = {
  background: "black",
  color: "yellow",
  borderRadius: 12,
  boxShadow: "2px 2px 2px #876800",
  marginTop: "10px",
};

export const SideBar = () => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch();
  return (
    <div style={{ height: "750px", width: "100%" }}>
      <Layout
        style={{
          padding: "20px",
          width: "100%",
          background: "#fadb14",
          boxShadow: "2px 2px 2px #d4b106",
          height: "100%",
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
          <strong>Yuco</strong>
        </span>
        <Divider style={{ background: "black" }} />
        <Link to="/">
          <Row style={styleButton}>
            <Col span={5}>
              <HomeOutlined
                style={{ fontSize: 30, marginTop: 12, marginLeft: 12 }}
              />
            </Col>
            <Col span={18}>
              <Button type="text" style={{ height: 50, width: "100%" }}>
                <span style={{ fontSize: 24, color: "yellow" }}>HOME</span>
              </Button>
            </Col>
          </Row>
        </Link>

        <Link to="/posts">
          <Row style={styleButton}>
            <Col span={5}>
              <FormOutlined
                style={{ fontSize: 30, marginTop: 12, marginLeft: 12 }}
              />
            </Col>
            <Col span={18}>
              <Button type="text" style={{ height: 50, width: "100%" }}>
                <span style={{ fontSize: 24, color: "yellow" }}>POSTS</span>
              </Button>
            </Col>
          </Row>
        </Link>

        <Link to="/chat">
          <Row style={styleButton}>
            <Col span={5}>
              <MessageOutlined
                style={{ fontSize: 30, marginTop: 12, marginLeft: 12 }}
              />
            </Col>
            <Col span={18}>
              <Button type="text" style={{ height: 50, width: "100%" }}>
                <span style={{ fontSize: 24, color: "yellow" }}>CHAT</span>
              </Button>
            </Col>
          </Row>
        </Link>

        <Link to={`/profile/${auth?.user?._id}`}>
          <Row style={styleButton}>
            <Col span={5}>
              <ProfileOutlined
                style={{ fontSize: 30, marginTop: 12, marginLeft: 12 }}
              />
            </Col>
            <Col span={18}>
              <Button type="text" style={{ height: 50, width: "100%" }}>
                <span style={{ fontSize: 24, color: "yellow" }}>PROFILE</span>
              </Button>
            </Col>
          </Row>
        </Link>
        <Row style={styleButton}>

        <Link
          to="/"
          onClick={() => dispatch(logout())}
        >
          <Button type="text" style={{ height: 50, width: "100%" }}>
            <span style={{ fontSize: 24, color: "yellow" }}>LOGOUT</span>
          </Button>
        </Link>
        </Row>

      </Layout>
    </div>
  );
};
