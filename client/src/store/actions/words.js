import { SET_WORDS, SET_CURRENT_WORD } from "../action.types";
import { addError, removeError } from "./error";
import { requestSent, requestRecieved } from "./fetch";
import { setPosts } from "./posts";
import api from "../../services/api";

export const setWords = words => ({
    type: SET_WORDS,
    words
});

export const setCurrentWord = word => ({
    type: SET_CURRENT_WORD,
    word
});

export const getWords = () => {
    return async dispatch => {
        try {
            dispatch(requestSent(true));
            const { data: words } = await api.call("get", "words");
            dispatch(setWords(words));
            dispatch(removeError())
            dispatch(requestRecieved(false));
        } catch(error) {
            const err = error.response.data.message;
            dispatch(addError(err));
        }
    }
}

export const getWordPosts = id => {
    return async dispatch => {
        try {
            dispatch(requestSent(true));
            const { data: word } = await api.call("get", `words/${id}`);
            dispatch(setPosts(word.posts));
            dispatch(setCurrentWord(word));
            dispatch(removeError())
            dispatch(requestRecieved(false));
        } catch(error) {
            const err = error.response.data.message;
            dispatch(addError(err));
        }
    }
}