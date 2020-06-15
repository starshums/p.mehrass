import React, { Component } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";
import Word from "../components/Word";

const Post = ({ post }) => {

    return <div className="">
        <Word />
        <br/><br/><br/>
        <p> { parse(post.text) } </p>
    </div>
}

export default connect( store => ({
    post: store.currentPost
}))(Post);