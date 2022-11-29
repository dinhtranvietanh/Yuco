import { Card, Col, Row } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProfileUsers } from "../../redux/actions/profileAction";

const Profile = () => {
  const { auth, profile } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id }));
    }
  }, [dispatch, id, profile.ids]);

  console.log(profile.allposts);

  return (
    <Row>
      <Col span={17}>
          <div style={{marginLeft: '30px'}}>
            <h1>Your Post In Yuco</h1>
          </div>
        <Row style={{ overflowY: "scroll", maxHeight: "750px" }}>


          {(profile?.allposts?.length > 0
            ? profile?.allposts[0].userPost
            : []
          ).map(
            (item, index) =>
              item && (
                <Col key={index}>
                  <Link to={`/post/${item._id}`} className="text-dark">
                  <h5 style={{marginLeft: '20px'}}>{item.title}</h5>
              
                  </Link>
            <h6>
              <small style={{marginLeft: 12}} className="text-muted">{moment(item.createdAt).fromNow()}</small>
            </h6>
                  <Card>
                    <img style={{ width: 300 }} src={item.images[0].url} />
                  </Card>
                </Col>
              )
          )}
        </Row>
      </Col>

      <Col>
        <Card
          hoverable
          style={{
            width: 240,
            top: 40,
          }}
          cover={
            <img
              alt="example"
              src={
                // auth?.user?.avatar ||
                "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
              }
            />
          }
        >
          <Card.Meta
            title={auth?.user?.fullname}
            description={
              <div>
                <div>Email: {auth?.user?.email}</div>
                <div>Gender: {auth?.user?.gender}</div>
                <div>Address: {auth?.user?.address || "No Address"}</div>
                <div>Role: {auth?.user?.role || "User"}</div>
              </div>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
