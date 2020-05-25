import { REQUEST_SENT, REQUEST_RECIEVED } from "../action.types";

export default (state = { isFetching : true }, action) => {
    switch(action.type) {
        case REQUEST_SENT:
            return {
                isFetching: action.isFetching
            };
        case REQUEST_RECIEVED:
            return {
                isFetching: action.isFetching
            };
        default: return state;
    }
}