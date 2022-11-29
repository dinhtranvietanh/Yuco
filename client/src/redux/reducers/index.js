import { combineReducers } from "redux";
import auth from './authReducer'
import notify from './notifyReducer'
import post from './postReducer'
import detailPost from './detailPostReducer'
import profile from './profileReducer'
export default combineReducers({
    auth,
    notify,
    post,
    detailPost,
    profile,
})