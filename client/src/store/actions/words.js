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

export const getWords = (query = "") => {
    return async dispatch => {
        try {
            dispatch(requestSent(true));
            const { data: words } = await api.call("get", `words${query}`);
            dispatch(setWords(words));
            dispatch(removeError());
            dispatch(requestRecieved(false));
        } catch(error) {
            const err = error.response.data.message;
            dispatch(addError(err));
        }
    }
}

export const addWord = request => {
    return async dispatch => {
        try {
            const { data: word } = await api.call("post", "words", request);
            dispatch(setCurrentWord(word));
            dispatch(removeError())
        } catch(error) {
            const err = error.response.data.message;
            dispatch(addError(err));
        }
    }
}

export const getWordPosts = (id, query = "") => {
    return async dispatch => {
        try {
            dispatch(requestSent(true));
            const { data: word } = await api.call("get", `words/${id}${query}`);
            const posts = {
                posts: word.word[0].posts,
                pagination: word.pagination
            }
            dispatch(setPosts(posts));
            dispatch(setCurrentWord(word.word[0]));
            dispatch(removeError());
            dispatch(requestRecieved(false));
        } catch(error) {
            const err = error.response.data.message;
            dispatch(addError(err));
        }
    }
}