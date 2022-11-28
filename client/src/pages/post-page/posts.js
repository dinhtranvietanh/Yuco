import React, { useState } from 'react'
import { useSelector, useDispatch} from "react-redux";
import PostItem from './items/postItem'
const Posts = () => {
    const {post} = useSelector(state => state)
  return (
    <div style={{overflowY: 'scroll', height: '550px', marginTop: '20px'}}>
    <div className="postList-wrap">
      {
          post?.posts?.map((post) => (
            <div key={post._id}>
                <PostItem post={post} />
            </div>
          ))
      }
    </div>
  </div>
  )
}

export default Posts