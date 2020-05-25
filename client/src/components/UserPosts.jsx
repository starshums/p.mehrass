import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getPosts, getUserPosts, setPosts } from "../store/actions";
import Spinner from "./Spinner";

class UserPosts extends Component {
  constructor(props) {
    super(props);
    this.props.setPosts([]);
    this.handlePostClick = this.handlePostClick.bind(this);
  }

  componentDidMount() {}

  handlePostClick(id) {
    const { history } = this.props;
    history.push(`/post/${id}`);
  }

  renderUserPosts() {
    return this.props.posts.map((post) => (
      <Fragment key={post._id}>
        <div className="word-content post-main-content clearfix">
          <div className="main-word clearfix">{post.text}</div>

          <div
            className="post-count"
            onClick={() => this.handlePostClick(post._id)}
          >
            {new Date(post.created_at).toLocaleString("en-GB")}
          </div>

          <div className="date"> </div>
        </div>

        <br />
      </Fragment>
    ));
  }

  render() {
    return (
      <Fragment>
        <br />
        {this.renderUserPosts() != 0 ? "Posts : " + this.renderUserPosts().length : ""}
        <br />
        <br />
        { this.props.isFetching ? <Spinner /> : this.renderUserPosts() }
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    posts: store.posts,
    isFetching: store.isFetching.isFetching
  }),
  { getPosts, getUserPosts, setPosts }
)(UserPosts);
