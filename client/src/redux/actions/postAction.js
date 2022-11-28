
import {APPTYPES} from './appTypes'
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI  } from '../../utils/fetchData'
import {uploadImage} from '../../utils/uploadImage'
import { notification } from 'antd';

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  DELETE_POST: "DELETE_POST",
  GET_POST: "GET_POST",
}

export const getPosts = (auth) => async (dispatch) => {
  try {
    const {data} = await getDataAPI('getPosts', auth.token)
    dispatch({ type: POST_TYPES.GET_POSTS, payload: data });
  } catch (error) {
    dispatch({
      type: APPTYPES.NOTIFY,
      payload: {error: error.response.data.msg}
  })  
}
};

export const createPost = ({ post,images, auth}) => async (dispatch) => {
  let media = []
  try {
    if(images.length> 0) media = await uploadImage(images)
    const res = await postDataAPI('createPost', {...post, images: media}, auth.token);
    dispatch({ type: POST_TYPES.CREATE_POST, payload: res.data.data });

  } catch (err) {
    console.log(err)
  }
}
export const updatePost = ({postData, images, auth, post}) => async (dispatch) => {
  let media = []
  
  const imgNewUrl = images.filter(img => !img.url)
  const imgOldUrl = images.filter(img => img.url)

  console.log(postData, post)

  if(post.title === postData.title
     && imgNewUrl.length === 0
     && imgOldUrl.length === post.images.length 
  ) 
  return;

  try {
      if(imgNewUrl.length > 0) media = await uploadImage(imgNewUrl)

      const res = await patchDataAPI(`updatePost/${post._id}`,{
          ...postData, images: [...imgOldUrl,...media]}, auth.token);
      
      dispatch({ 
          type: POST_TYPES.UPDATE_POST, 
          payload: res.data.updatePost
      })

      dispatch({ 
          type: APPTYPES.NOTIFY, 
          payload: {
              success: res.data.msg
          } 
      });
  } catch (err) {
      dispatch({ 
          type: APPTYPES.NOTIFY, 
          payload: {
              error: err.response.data.msg
          } 
      })
  }
}

export const deletePost = ({post, auth}) => async (dispatch) => {
  dispatch({type: POST_TYPES.DELETE_POST, payload: post})
  try {
      
      deleteDataAPI(`deletePost/${post._id}`, auth.token)

  } catch (err) {
      dispatch({ 
          type: APPTYPES.NOTIFY, 
          payload: {
              error: err.response.data.msg
          } 
      })
  }
}

export const getPost = ({detailPost, id, auth}) => async (dispatch) => {
  if(detailPost.every(post => post._id !== id)){
      try {
          const res = await getDataAPI(`getPost/${id}`, auth.token)
          dispatch({ type: POST_TYPES.GET_POST, payload: res.data.getDetailPost})
      } catch (err) {
          dispatch({
              type: APPTYPES.NOTIFY,
              payload: {
                  error: err.response.data.msg
              } 
          })
      }
  }
  
}

export const likePost = ({auth, post}) => async (dispatch) => {
  const newPost = {...post, likes: [...post.likes, auth.user]}
  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost})

  try {
    await patchDataAPI(`updatePost/${post._id}/like`, null , auth.token);

  } catch (err) {
    dispatch({
      type: APPTYPES.NOTIFY,
      payload: {
          error: err.response.data.msg
      } 
  })}
};

export const unLikePost = ({auth, post}) => async (dispatch) => {
  const newPost = {...post, likes: post.likes.filter(like => like._id !== auth.user._id )}
  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost})

  try {
    await patchDataAPI(`updatePost/${post._id}/unlike`, null, auth.token);

  } catch (err) {
    dispatch({
      type: APPTYPES.NOTIFY,
      payload: {
          error: err.response.data.msg
      } 
  })}
};


