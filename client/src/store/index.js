import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const DEFAULT_STATE = {
    error: { message: null },
    currentWord: {
        posts: []
    },
    currentPost: {
        word: { text: "" },
        user: { username: "" }
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
        console.log(error);
        return DEFAULT_STATE;
    }
}

const PERSISTED_STATE = loadState();
const store = createStore(
    rootReducer,
    PERSISTED_STATE,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.subscribe( () => saveState( store.getState() ));

export default store;