import React, { Component } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";

const Post = ({ post }) => {

    return <div className="">
        <h1> { post.word.text } </h1>
        <h3> { parse(post.text) } </h3>
    </div>
}

export default connect( store => ({
    post: store.currentPost
}))(Post);