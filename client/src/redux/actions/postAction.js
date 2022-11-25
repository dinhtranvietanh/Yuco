

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
    dispatch({ type: APPTYPES.NOTIFY, payload: {loading: true} })
    if(images.length> 0) media = await uploadImage(images)
    const data = await postDataAPI('createPost', {...post,images: media}, auth.token);
    dispatch({ type: POST_TYPES.CREATE, payload: data });
    dispatch({ type: APPTYPES.NOTIFY, payload: {loading: false} })

  } catch (error) {
    notification.error({message: error})
  }
}
export const updatePost = ({postData, images, authReducer, statusReducer}) => async (dispatch) => {
  let media = []
  
  const imgNewUrl = images.filter(img => !img.url)
  const imgOldUrl = images.filter(img => img.url)

  if(statusReducer.title === postData.title
     && imgNewUrl.length === 0
     && imgOldUrl.length === statusReducer.images.length 
  ) 
  return;

  try {
      if(imgNewUrl.length > 0) media = await uploadImage(imgNewUrl)

      const res = await patchDataAPI(`post/${statusReducer._id}`,{
          ...postData, images: [...imgOldUrl,...media]}, authReducer.token);
      
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

export const deletePost = ({post, authReducer}) => async (dispatch) => {
  dispatch({type: POST_TYPES.DELETE_POST, payload: post})
  try {
      
      deleteDataAPI(`post/${post._id}`, authReducer.token)

  } catch (err) {
      dispatch({ 
          type: APPTYPES.NOTIFY, 
          payload: {
              error: err.response.data.msg
          } 
      })
  }
}

export const getPost = ({detailPostReducer, id, authReducer}) => async (dispatch) => {
  if(detailPostReducer.every(post => post._id !== id)){
      try {
          const res = await getDataAPI(`post/${id}`, authReducer.token)
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

