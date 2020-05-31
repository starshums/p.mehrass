import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getUserPosts } from "../store/actions";
import Spinner from "./Spinner";

class UserPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      page: 2,
      limit: 2,
    };

    this.handlePostClick = this.handlePostClick.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  clearState() {
    this.setState({ posts: {} });
  }

  componentDidMount() {
    this.clearState();
    this.props.getUserPosts().then(() => {
      this.setState({ posts: this.props.posts });
    });
    this.setState({ posts: this.props.posts });
  }

  handlePostClick(id) {
    const { history } = this.props;
    history.push(`/post/${id}`);
  }

  handleLoadMore() {
    const query = `?page=${this.state.page++}&limit=${this.state.limit}`;
    this.props.getUserPosts(query).then( () => {
      this.setState( prevState => ({
        posts: [...prevState.posts, ...this.props.posts],
      }));
    });
    console.log("page=", this.state.page);
  }

  renderUserPosts() {
    return this.state.posts.map((post) => (
      <Fragment key={post._id}>
        <div className="word-content post-main-content clearfix">
          <div className="main-word clearfix">{post.text}</div>

          <div className="post-count" onClick={() => this.handlePostClick(post._id)} >
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
        <b>  منشوراتك : {this.props.pagination.total} </b>
        <br />
        <br />
        <div className="posts">
          {this.renderUserPosts()}
          {this.props.isFetching ? <Spinner /> : ""}
        </div>
        {this.props.pagination.hasMore && !this.props.isFetching && (
          <button onClick={this.handleLoadMore} className="btn-load-more-words">
            إظهار المزيد ({this.props.pagination.remaining}){" "}
          </button>
        )}
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    posts: store.posts.posts,
    pagination: store.posts.pagination,
    isFetching: store.isFetching.isFetching,
  }),
  { getUserPosts }
)(UserPosts);
