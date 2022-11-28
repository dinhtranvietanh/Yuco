import { postDataAPI, getDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { APPTYPES , DeleteData } from './appTypes'

export const CHAT_TYPES = {
    DELETE_CHAT: 'DELETE_CHAT',
    DELETE_CONVERSATION: 'DELETE_CONVERSATION',
    GET_INFO_USER: 'GET_INFO_USER',
    CREATE_CHAT: 'CREATE_CHAT',
    GET_USER_CONVERSATION: 'GET_USER_CONVERSATION',
    GET_CHAT: 'GET_CHAT',
   
}

export const getInfoUser = ({user, chatReducer}) => (dispatch) => {
    if(chatReducer.users.every(item => item._id !== user._id)){
        dispatch({
            type: CHAT_TYPES.GET_INFO_USER,
            payload: user
        })
    }
} 
export const createChat = ({message, auth, socketReducer}) => async (dispatch) => {
    dispatch({
        type: CHAT_TYPES.CREATE_CHAT,
        payload: message
    })

    socketReducer.emit("createChat", {...message})
    
    try {
        await postDataAPI('chat', message, auth.token)

    } catch (err) {
        dispatch({
            type: APPTYPES.NOTIFY, 
            payload: {
                error: err.response.data.msg
            }
        })
    }
}
export const getUserConversation = ({auth}) => async (dispatch) => {
    try {
        const res = await getDataAPI('conversation', auth.token)

        let newArr = [];

        res.data.conversation.forEach(item => {
            item.recipients.forEach(info => {
                if(info._id !== auth.user._id){
                    newArr.push({...info, text: item.text})
                }
            })
        })

        dispatch({
            type: CHAT_TYPES.GET_USER_CONVERSATION,
            payload: {newArr, result: res.data.result}
        })

    } catch (err) {
        dispatch({
            type: APPTYPES.NOTIFY, 
            payload: {
                error: err.response.data.msg
            }
        })
    }
}
export const getChat = ({auth, id, page = 1}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`chat/${id}?limit=${page * 9}`, auth.token)
        dispatch({
            type: CHAT_TYPES.GET_CHAT, 
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: APPTYPES.NOTIFY, 
            payload: {
                error: err.response.data.msg
            }
        })
    }
}
export const deleteChat = ({msg, auth, chatReducer}) => async (dispatch) => {
    const newData = DeleteData(chatReducer.data, msg._id)
    // console.log(newData)
    dispatch({
        type: CHAT_TYPES.DELETE_CHAT, 
        payload: {newData, _id: msg.recipient}}) 
    
    try {
        await deleteDataAPI(`chat/${msg._id}`, auth.token)
    } catch (err) {
        dispatch({
            type: APPTYPES.NOTIFY, 
            payload: {
                error: err.response.data.msg
            }
        })
    }
}
export const deleteConversation = ({auth, id}) => async (dispatch) => {
    dispatch({
        type: CHAT_TYPES.DELETE_CONVERSATION,
        payload: id
    })
    try {
        await deleteDataAPI(`conversation/${id}`, auth.token)
    } catch (err) {
        dispatch({
            type: APPTYPES.NOTIFY, 
            payload: {
                error: err.response.data.msg
            }
        })
    }
}