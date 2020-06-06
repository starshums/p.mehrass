import React from "react";
import { Redirect } from "react-router-dom";
import Alerts from "../components/Alerts";
import AddPost from "../components/AddPost";

const AddPostPage = ({isAuthenticated, history}) => {

    if( !isAuthenticated ) return <Redirect to="/login" />

    return (
        <div>
            <Alerts />
            <AddPost history={history} />
        </div>
    );
}

export default AddPostPage;