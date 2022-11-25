import { APPTYPES } from "../actions/appTypes";

const statusReducer = (state = false, action) => {
    switch (action.type){
        case APPTYPES.STATUS:
            return action.payload;
        default:
            return state;
    }
}


export default statusReducer