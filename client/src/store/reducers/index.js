import { combineReducers } from "redux";
import isFetching from "./fetch";
import error from "./error";
import auth from "./auth";
import { words, currentWord } from "./words";
import { posts, currentPost } from "./posts";

export default combineReducers({
    isFetching,
    error,
    auth,
    words, currentWord,
    posts, currentPost
});