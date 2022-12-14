import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from '../../redux/actions/postAction';
import DetailItem from '../detail-item/DetailItem'
const DetailPost = () => {
  const {id} = useParams()
  const [post, setPost] = useState([])

  const {auth, detailPost} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getPost({detailPost, id, auth}))

      if(detailPost.length > 0) {
        const newArr = detailPost.filter(post => post._id === id)
        setPost(newArr)
      }
  }, [detailPost, auth, dispatch, id])
  
  return (
    <div>
        {
            post.map((item) => (
                  <DetailItem key={item._id} post={item} />
            ))
        }    
  
    </div>
  )
}

export default DetailPost