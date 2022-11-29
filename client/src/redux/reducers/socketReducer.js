import { APPTYPES } from "../actions/appTypes"

const socketReducer = (state = [], action) => {
    switch(action.type){
        case APPTYPES.SOCKET:
            return action.payload
        default:
            return state
    }
}

export default socketReducer