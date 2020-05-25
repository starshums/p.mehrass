import { addError, removeError } from "./error";
import { SET_CURRENT_USER } from "../action.types";
import api from "../../services/api";

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    user
});

export const setToken = token => {
    api.setToken(token);
}

export const logout = () => {
    return dispatch => {
        localStorage.clear();
        api.setToken(null);
        dispatch(setCurrentUser({}));
        dispatch(removeError());
    }
}

export const authUser = (path, data) => {
    return async dispatch => {
        try {
            const { ...userData } = await api.call("post","auth/" + path, data);
            const { token, ...user } = userData.data;
            localStorage.setItem("ACCESS_TOKEN", token);
            api.setToken(token);
            dispatch(setCurrentUser(user));
            dispatch(removeError());
        } catch(error) {
            const err = error.response.data.message;
            dispatch(addError(err));
        }
    }
}