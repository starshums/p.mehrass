import { SET_CURRENT_POST, SET_POSTS } from "../action.types";

export const posts = (state = {}, action) => {
    switch(action.type) {
        case SET_POSTS:
            return action.posts;
        default:
            return state;
    }
}

export const currentPost = (state = {}, action) => {
    switch(action.type) {
        case SET_CURRENT_POST:
            return action.post;
        default:
            return state;
    }
}