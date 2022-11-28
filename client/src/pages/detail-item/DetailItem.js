import React from "react";
import { Link } from "react-router-dom";
import "./detailItem.css";
import { useSelector, useDispatch } from "react-redux";
import DetailListImage from "./detailListImage";
import moment from "moment";
import InputComment from "../../components/comment/InputComment";
import ShowComment from "../../components/comment/ShowComment";
import { APPTYPES } from "../../redux/actions/appTypes";
import { deletePost } from "../../redux/actions/postAction";

const PostItem = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeletePost = () => {
    if (window.confirm("Are you sure want to delete ?"))
      dispatch(deletePost({ post, auth }));
  };

  console.log(post)


  return (
    <div style={{padding: 10}} className="detailItem-wrap">
      <section style={{
        background: 'rgb(250, 219, 20)',
        borderRadius: '20px',
        boxShadow: '3px 3px 3px gray'
      }}>
        <div className="header">
          <div className="d-flex" >
            <img src={auth?.user?.avatar} alt="cover" className="small-avatar"/> 
            <h6>
              <Link to={`/profile/${post.userId}`} style={{ textDecoration: 'none', color: 'yellow', fontWeight: 'bold' }}>
                  {post.creator}
              </Link>
              <small style={{marginLeft: 12}} className="text-muted">{moment(post.createdAt).fromNow()}</small>
            </h6>
          </div>

          <div className="nav-item dropdown">
          {
            (auth.user._id === post.userId || auth.user.role === 1) && 
              <>
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                  more_horiz
                </span>

                <div className="dropdown-menu">
                      {/* <div className="dropdown-item" onClick={handleEditPost}>
                        <span className="material-icons">create</span> Edit Post
                      </div> */}
                      <div className="dropdown-item" onClick={handleDeletePost}>
                        <span className="material-icons">delete_outline</span> Delete
                        Post
                      </div>
                </div>
              </>
          }
          </div>
        </div>

        <div style={{display: 'flex', textAlign: 'center'}}><h3>{post.title}</h3></div>
        <div style={{display: 'flex', textAlign: 'center'}}><h3>{post.message}</h3></div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <small className="text-muted">{moment(post.createdAt).format('DD/MM/YYYY')}</small>
        </div>


        {post.images.length > 0 && (
          <DetailListImage images={post.images} id={post._id} />
        )}

        <p className="content">{post.content}</p>
      </section>

    <section>
      <InputComment post={post}/>
      <ShowComment post={post}/>
    </section>

    </div>
  );
};

export default PostItem;