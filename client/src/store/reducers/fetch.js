import { REQUEST_SENT, REQUEST_RECIEVED } from "../action.types";

export default (state = { isFetching : true }, action) => {
    switch(action.type) {
        case REQUEST_SENT:
            return action.isFetching;
        case REQUEST_RECIEVED:
            return action.isFetching;
        default: return state;
    }
}