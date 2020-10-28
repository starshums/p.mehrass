import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getUserPosts } from "../store/actions";
import Spinner from "./Spinner";
import PostCard from "./PostCard";

class UserPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      page: 2,
      limit: 5,
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  clearState() {
    this.setState({ posts: {} });
  }

  componentDidMount() {
    this.clearState();
    this.props.getUserPosts().then(() => { this.setState({ posts: this.props.posts }); });
    this.setState({ posts: this.props.posts });
  }

  handleLoadMore() {
    const query = `?page=${this.state.page++}&limit=${this.state.limit}`;
    this.props.getUserPosts(query).then( () => {
      this.setState( prevState => ({
        posts: [...prevState.posts, ...this.props.posts],
      }));
    });
  }

  renderUserPosts() {
    return this.state.posts.map((post) => (
      <PostCard key={post._id} history={this.props.history} post={post} />
    ));
  }

  render() {
    return (
      <Fragment>
        <br />
        <b>  المنشورات ديالك : {this.props.pagination.total} </b>
        <br />
        <br />
        <div className="posts">
          {this.renderUserPosts()}
          {this.props.isFetching ? <Spinner /> : ""}
        </div>
        { this.props.pagination.hasMore ? this.props.pagination.hasMore && !this.props.isFetching && (
          <button onClick={this.handleLoadMore} className="btn-load-more-words">
            زيد ({this.props.pagination.remaining}){" "}
          </button>
        ) : "" }
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    posts: store.posts.posts,
    pagination: store.posts.pagination,
    isFetching: store.isFetching,
  }),
  { getUserPosts }
)(UserPosts);
