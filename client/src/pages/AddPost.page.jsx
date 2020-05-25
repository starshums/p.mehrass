import React from "react";
import { Redirect } from "react-router-dom";
import Alerts from "../components/Alerts";
import AddPost from "../components/AddPost";

const AddPostPage = ({isAuthenticated}) => {

    if( !isAuthenticated ) return <Redirect to="/login" />

    return (
        <div>
            <Alerts />
            <AddPost />
        </div>
    );
}

export default AddPostPage;