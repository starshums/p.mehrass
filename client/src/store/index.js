import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const DEFAULT_STATE = {
    error: { message: null },
    auth: {
        user: { username: "" }
    },
    words: {
        words: [],
        pagination: {}
    },
    currentWord: {
        posts: []
    },
    currentPost: {
        word: { text: "" },
        user: { username: "" }
    },
    posts: {
        posts: [],
        pagination: {
            hasMore: false,
            total: 0
        }
    }
}

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("STATE_DATA", serializedState);
    } catch(error) {
        console.log(error);
    }
}

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("STATE_DATA");
        if(serializedState === null) return DEFAULT_STATE;
        return JSON.parse(serializedState);
    } catch(error) {
        return DEFAULT_STATE;
    }
}

const PERSISTED_STATE = loadState();

const devTools = () => {
    if( process.env.REACT_APP_ENV !== 'production' )
        return window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    return null;
}

const store = createStore(
    rootReducer,
    PERSISTED_STATE,
    compose(
        applyMiddleware(thunk),
        devTools()
    )
);

store.subscribe( () => saveState( store.getState() ));

export default store;