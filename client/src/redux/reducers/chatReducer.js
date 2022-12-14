import { DeleteData } from "../actions/appTypes";
import { CHAT_TYPES } from "../actions/chatAction";

const initialState = {
    users: [],
    resultUsers: 0,
    data: [],
    resultData: 0,
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHAT_TYPES.GET_INFO_USER:
            return{
                ...state,
                users: [action.payload, ...state.users]
        }
        case CHAT_TYPES.CREATE_CHAT:
            return{
                ...state,
                data: [...state.data, action.payload],
                users: state.users.map(user => 
                    user._id === action.payload.recipient || user.id === action.payload.sender
                    ? {...user, text: action.payload.text}
                    : user
                )
            };
        case CHAT_TYPES.GET_USER_CONVERSATION:
                return{
                    ...state,
                    users: action.payload.newArr,
                    resultUsers: action.payload.result
                };
        case CHAT_TYPES.GET_CHAT:
                return{
                    ...state,
                    data: action.payload.chat.reverse(),
                    resultData: action.payload.result
                };
        case CHAT_TYPES.DELETE_CHAT:
                return{
                    ...state,
                    data: action.payload.newData,
                    resultData: action.payload.newData.length
                };  
        case CHAT_TYPES.DELETE_CONVERSATION:
                return{
                    ...state,
                    users: DeleteData(state.users, action.payload),
                    data: DeleteData(state.data, action.payload)
               };   
        default:
            return state;
    }
}

export default chatReducer