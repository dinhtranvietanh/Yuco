import React from 'react';
import { Link } from "react-router-dom";
import '../posts/status.css'
import { useSelector, useDispatch } from 'react-redux'

import moment from 'moment'
import { APPTYPES } from '../../../redux/actions/appTypes';
import {deletePost} from '../../../redux/actions/postAction'

const StatusItem = ({post}) => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()

  const handleEditPost = () => {
      dispatch({type: APPTYPES.STATUS, payload: {...post, onEdit: true}})
  }

  const handleDeletePost = () => {
    if(window.confirm('Do you really want to delete post ?'))
      dispatch(deletePost({post, auth}))
  }

  return (
    <div className='statusItem-wrap'>
        <div className="header">
          <div className="d-flex">
            <img src={post.user.avatar} alt={post.user.avatar} className="small-avatar"/> 
            <h6>
              <Link to={`/profile/${post.user._id}`} style={{ textDecoration: 'none' }} className="text-dark">
                  {post.user.username}
              </Link>
            </h6>
          </div>

            <div className='nav-item dropdown'>
              {
                (auth.user._id === post.user._id || auth.auth.role === 1)  &&
                  <>

                    <span className="material-icons" id="moreLink" data-toggle="dropdown">
                      more_horiz
                    </span>

                    <div className="dropdown-menu">
                      <div className="dropdown-item" onClick={handleEditPost}>
                        <span className="material-icons">create</span> Edit Post
                      </div>
                      <div className="dropdown-item" onClick={handleDeletePost}>
                        <span className="material-icons">delete_outline</span> Delete Post
                      </div>
                    </div>

                  </>
              }
            </div>
        </div>

        
           {post.images.length > 0}  
        

        
        <small className='text-muted'>
          {moment(post.createdAt).fromNow()} 
        </small>

        <h3>{post.title}</h3>
        
      <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
      <p className='info'>{post.information}</p>
      </Link>

      

      <div className='d-flex justify-content-between'>
      <Link to={`/post/${post._id}`} className='text-dark'>
        <i className='far fa-comment'/>
      </Link>
        <p className="cmt">
          {post.comments.length} comments
        </p>
      </div>
    </div>
  );
};

export default StatusItem;