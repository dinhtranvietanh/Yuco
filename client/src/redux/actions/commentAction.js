import { deleteDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { APPTYPES, EditData } from './appTypes'
import { POST_TYPES } from './postAction'

export const createComment = ({post, newComment, auth}) => async (dispatch) =>{
    console.log({post, newComment, auth})

    const newPost = {...post, comments: [...post.comments, newComment]}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    try{
        const data = {...newComment, postId: post._id}
        const res = await postDataAPI('comment', data, auth.token)
        
        const newData = {...res.data.newComment, user: auth.user}
        const newPost = {...post, comments: [...post.comments, newData]}
        dispatch({type: POST_TYPES.UPDATE_POST, payload:newPost})

    } catch (error) {
        dispatch({ type: APPTYPES.NOTIFY, payload: {error: error.response.data.msg} })

    }
}

export const updateComment = ({comment, post, content, auth}) => async (dispatch) => {
    const newComments = EditData(post.comments, comment._id, {...comment, content})
    const newPost = {...post, comments: newComments}
    
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    try {
        patchDataAPI(`comment/${comment._id}`, { content }, auth.token)
    } catch (error) {
        dispatch({ type: APPTYPES.NOTIFY, payload: {error: error.response.data.msg} })

    }
}
export const deleteComment = ({post, comment, auth}) => async (dispatch) => {
    const deleteArr = [...post.comments.filter(cm => cm.reply === comment._id), comment]
    
    const newPost = {
        ...post,
        comments: post.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))
    }

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    try {
       deleteArr.forEach(item => {
            deleteDataAPI(`comment/${item._id}`, auth.token)

           })
    } catch (error) {
        dispatch({ type: APPTYPES.NOTIFY, payload: {error: error.response.data.msg} })

        }

}