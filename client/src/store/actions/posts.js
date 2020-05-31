import { SET_POSTS, SET_CURRENT_POST } from "../action.types";
import { addError, removeError } from "./error";
import api from "../../services/api";
import { requestSent, requestRecieved } from "./fetch";

export const setPosts = posts => ({
    type: SET_POSTS,
    posts
});

export const setCurrentPost = post => ({
    type: SET_CURRENT_POST,
    post
});

export const getPosts = () => {
    return async dispatch => {
        try {
            dispatch(requestSent(false));
            const { data: posts } = await api.call("get", "posts");
            dispatch(setPosts(posts));
            dispatch(removeError())
            dispatch(requestRecieved(false));
        } catch(error) {
            const err = error.response.data.message;
            dispatch(addError(err));
        }
    }
}

export const getUserPosts = ( query = "" ) => {
    return async dispatch => {
        try {
            dispatch(requestSent(true));
            const { data: userPosts } = await api.call("get", `posts/user${query}`);
            const posts = {
                posts: userPosts.posts[0].posts,
                pagination: userPosts.pagination
            }
            dispatch(setPosts(posts));
            dispatch(removeError())
            dispatch(requestRecieved(false));
        } catch(error) {
            dispatch(addError(error));
        }
    }
}

export const createPost = data => {
    return async dispatch => {
        try {
            const post = await api.call("post", "posts", data);
            dispatch(setCurrentPost(post));
            dispatch(removeError())
        } catch(error) {
            const err = error.response.data.message;
            dispatch(addError(err));
        }
    }
}

export const getPost = id => {
    return async dispatch => {
        try {
            const { data: post } = await api.call("get", `posts/${id}`);
            dispatch(setCurrentPost(post));
            dispatch(removeError())
        } catch(error) {
            const err = error.response.data.message;
            dispatch(addError(err));
        }
    }
}