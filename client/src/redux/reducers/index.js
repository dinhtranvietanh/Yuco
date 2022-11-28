import { combineReducers } from "redux";
import auth from './authReducer'
import notify from './notifyReducer'
import post from './postReducer'
import detailPost from './detailPostReducer'
export default combineReducers({
    auth,
    notify,
    post,
    detailPost,
})