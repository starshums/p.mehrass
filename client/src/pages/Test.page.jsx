import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Words from '../components/Words';
import Posts from '../components/Posts';
import AddPost from "../components/AddPost";

const TestPage = (props) => {

    if( !props.isAuthenticated ) return <Redirect to="/login" />

    return (
        // <Post />
        <Fragment>
            <Words { ...props } />
            <h1> المفاهيم </h1>
            <Posts { ...props } />
            <h1> إضافة مفهوم </h1>
            <AddPost />
        </Fragment>
    )
}

export default connect( store => ({
    isAuthenticated: store.auth.isAuthenticated
}) )(TestPage);