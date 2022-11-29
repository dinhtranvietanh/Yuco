import { getDataAPI } from "../../utils/fetchData"
import { APPTYPES } from "./appTypes"

export const PROFILE_TYPES = {
    GET_USER: 'GET_PROFILE_USER',
    GET_ID: 'GET_PROFILE_ID',
    GET_POSTS: 'GET_PROFILE_POSTS',
}

export const getProfileUsers = ({id}) => async (dispatch) => {

    dispatch({type: PROFILE_TYPES.GET_ID, payload: id})

        try { 
            const res = getDataAPI(`user/${id}`)
            const resDetail = getDataAPI(`authPost/${id}`)

            const users = await res
            const posts = await resDetail

            dispatch({
                type: PROFILE_TYPES.GET_USER,
                payload: users.data
            })

            dispatch({
                type: PROFILE_TYPES.GET_POSTS,
                payload: {...posts.data, _id: id}
            })
            
        } catch(err){
            dispatch({
                type: APPTYPES.NOTIFY, 
                payload: {
                    error: err.response.data.msg
                }
            })
        }
}