import { SET_CURRENT_WORD, SET_WORDS } from "../action.types";

export const words = (state = [], action) => {
    switch(action.type) {
        case SET_WORDS:
            return action.words;
        default:
            return state;
    }
}

export const currentWord = (state = {}, action) => {
    switch(action.type) {
        case SET_CURRENT_WORD:
            return action.word;
        default:
            return state;
    }
}