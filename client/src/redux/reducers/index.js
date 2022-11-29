import { combineReducers } from "redux";
import auth from './authReducer'
import notify from './notifyReducer'
import post from './postReducer'
import detailPost from './detailPostReducer'
import profile from './profileReducer'
import chatReducer from "./chatReducer";
import socketReducer from './socketReducer'
export default combineReducers({
    auth,
    notify,
    post,
    detailPost,
    profile,
    chatReducer,
    socketReducer,
})