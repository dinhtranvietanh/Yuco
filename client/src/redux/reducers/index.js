import { combineReducers } from "redux";
import auth from './authReducer'
import notify from './notifyReducer'
import post from './postReducer'
export default combineReducers({
    auth,
    notify,
    post,
})