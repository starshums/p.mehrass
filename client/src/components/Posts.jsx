import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getPosts, getUserPosts } from "../store/actions";
import Word from "../components/Word";
import Spinner from "./Spinner";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.handlePostClick = this.handlePostClick.bind(this);
  }

  componentDidMount() {}

  handlePostClick(id) {
    const { history } = this.props;
    history.push(`/post/${id}`);
  }

  renderPosts() {
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

          <div className="date">
            <a href="">
              {post.user.username ? post.user.username : post.user.email}
            </a>
          </div>
        </div>

        <br />
      </Fragment>
    ));
  }

  render() {
    return (
      <Fragment>
        <br />
        <br />
        <Word />
        <br />
        <br />
        <br />
        <br />
        {this.props.isFetching ? <Spinner /> : this.renderPosts()}
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    posts: store.posts,
    isFetching: store.isFetching.isFetching,
  }),
  { getPosts, getUserPosts }
)(Posts);
