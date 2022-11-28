import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  deletePost,
  likePost,
  unLikePost,
} from "../../../redux/actions/postAction";
import EditPost from "../form-post/edit-post";
import ListImage from "./listImage";
import { Col, Row } from "antd";
import { LikeFilled } from "@ant-design/icons";
import ButtonLike from "./buttonLike";

const PostItem = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [like, setLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);


  const handleDeletePost = () => {
    if (window.confirm("Are you sure want to delete post ?"))
      dispatch(deletePost({ post, auth }));
  };

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth }));
    setLoadLike(false);
  };
  
  useEffect(()=>{
    if(post.likes.find(like => like._id == auth.user._id)){
      setLike(true)
    }else{
      setLike(false)
    }
  },[post.likes, auth.user._id])

  return (
    <div className="postItem-wrap">
      <div className="header">
        <div className="d-flex">
          <h6>
            <Link
              to={`/profile/${post?.userId}`}
              style={{ textDecoration: "none" }}
              className="text-dark"
            >
              {post?.creator}
            </Link>
          </h6>
        </div>

        <div className="nav-item dropdown">
          {(auth.user._id === post?.userId || auth.user.role === 1) && (
            <>
              <span
                className="material-icons"
                id="moreLink"
                data-toggle="dropdown"
              >
                more_horiz
              </span>

              <div className="dropdown-menu">
                <EditPost post={post} />
                <div className="dropdown-item" onClick={handleDeletePost}>
                  <span className="material-icons">delete_outline</span> Delete
                  Post
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {post.images.length > 0 && (
        <ListImage images={post.images} id={post._id} />
      )}

      <small className="text-muted">{moment(post.createAt).fromNow()}</small>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <h3>{post.title}</h3>
          </div>
          <div style={{marginRight: '40px'}}>
            <ButtonLike like={like} handleUnLike={handleUnLike} handleLike={handleLike}/>
          </div>
        </div>


          <Link to={`/post/${post._id}`} style={{ textDecoration: "none" }}>
            <p className="info">{post.information}</p>
          </Link>

          <div className="d-flex justify-content-between">
            <Link to={`/post/${post._id}`} className="text-dark">
              <i className="far fa-comment" />
            </Link>
            <p className="cmt">{post.comments.length} comments</p>
            <span style={{marginRight: '35px'}}>{post.likes.length} likes</span>
          </div>

    </div>
  );
};

export default PostItem;
