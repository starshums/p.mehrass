import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getUserPosts } from "../store/actions";
import UserPosts from "../components/UserPosts";
import { Redirect } from "react-router-dom";

const ProfilePage = (props) => {

    if( !props.auth.isAuthenticated ) return <Redirect to="/login" />

    return (
        <Fragment>
            <h1> { props.auth.user.username } </h1>
            <UserPosts { ...props } />
        </Fragment>
    )
}

export default connect( store => ({
    auth: store.auth,
    posts: store.posts }), { getUserPosts} )(ProfilePage);