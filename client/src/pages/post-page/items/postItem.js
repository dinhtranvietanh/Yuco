import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { deletePost } from '../../../redux/actions/postAction';
import EditPost from '../form-post/edit-post';
import ListImage from './listImage';

const PostItem = ({post}) => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()

  const handleDeletePost = () => {
    if(window.confirm('Are you sure want to delete post ?'))
      dispatch(deletePost({post, auth}))
  }

  return (
    <div className='postItem-wrap'>
        <div className="header">
          <div className="d-flex">
            <h6>
              <Link to={`/profile/${post?.userId}`} style={{ textDecoration: 'none' }} className="text-dark">
                  {post?.creator}
              </Link>
            </h6>
          </div>

            <div className='nav-item dropdown'>
              {
                (auth.user._id === post?.userId || auth.user.role === 1)  &&
                  <>

                    <span className="material-icons" id="moreLink" data-toggle="dropdown">
                      more_horiz
                    </span>

                    <div className="dropdown-menu">
                      <EditPost post={post}/>
                      <div className="dropdown-item" onClick={handleDeletePost}>
                        <span className="material-icons">delete_outline</span> Delete Post
                      </div>
                    </div>

                  </>
              }
            </div>
        </div>

        {
           post.images.length > 0 && <ListImage images={post.images} id={post._id} />
        }   
        
        <small className='text-muted'>
          {moment(post.createAt).fromNow()} 
        </small>

        <h3>{post.title}</h3>
        
      <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
      <p className='info'>{post.information}</p>
      </Link>

      <div>{post.tags}</div>

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

export default PostItem;