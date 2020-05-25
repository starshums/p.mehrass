import { REQUEST_SENT, REQUEST_RECIEVED } from "../action.types";

export const requestSent = isFetching => ({
    type: REQUEST_SENT,
    isFetching
});

export const requestRecieved = isFetching => ({
    type: REQUEST_RECIEVED,
    isFetching
});