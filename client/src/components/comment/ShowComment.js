import React from 'react'
import ItemComment from './ItemComment'

const ShowComment = ({post}) => {

    return (
        <div className="showComments">
            {
                post.comments.map(comment => (
                    <ItemComment key={comment._id}
                    comment={comment} post={post} />
                ))
            }
        </div>
    )
}

export default ShowComment