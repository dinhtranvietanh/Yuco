

import {ACTIONS} from './index';
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData'
import {uploadImage} from '../../utils/uploadImage'

export const getPosts = (auth) => async (dispatch) => {
  try {
    const {data} = await getDataAPI('getPosts', auth.token)
    dispatch({ type: ACTIONS.FETCH_ALL, payload: data });
  } catch (error) {
    dispatch({
      type: ACTIONS.ALERT,
      payload: {error: error.response.data.msg}
  })  }
};

export const createPost = ({ post,images, auth}) => async (dispatch) => {
  let media = []
  try {
    dispatch({ type: ACTIONS.ALERT, payload: {loading: true} })
    if(images.length> 0) media = await uploadImage(images)
    const { data } = await postDataAPI('createPost', {...post,images: media}, auth.token);
    dispatch({ type: ACTIONS.CREATE, payload: data });
    dispatch({ type: ACTIONS.ALERT, payload: {loading: false} })

  } catch (error) {
    dispatch({
      type: ACTIONS.ALERT,
      payload: {error: error.response.data.msg}
  })
  }
};

export const updatePost = ({id, post, auth, status, images}) => async (dispatch) => {
  let media = []
  const imgOld = images.filter(img => img.url)
  const imgNew = images.filter(img => !img.url)
  if(status.title === post.title && imgOld.length === status.images.length
    && imgNew.length === 0
    )
  return;
  try {
    dispatch({ type: ACTIONS.ALERT, payload: {loading: true} })

    if(imgNew.length > 0 ) media = await imageUpload(imgNew)
    const {data} = await patchDataAPI(`updatePost/${status._id}`, {...post, images: [...imgOld, ...media]}, auth.token, id);

    dispatch({ type: ACTIONS.UPDATE, payload: data});

    dispatch({ type: ACTIONS.ALERT, payload: {success: data.msg} })

  } catch (error) {
    dispatch({
      type: ACTIONS.ALERT,
      payload: {error: error.response.data.msg}
  })  }
};