import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getWordPosts } from "../store/actions";
import Word from "../components/Word";
import Spinner from "./Spinner";
import PostCard from "./PostCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      page: 2,
      limit: 5
    }

    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleAddPostClick = this.handleAddPostClick.bind(this);
  }

  clearState() {
    this.setState({ posts: {} });
  }

  componentDidMount() {
    this.clearState();
    const wordId = this.props.match.params.id;
    this.props.getWordPosts(wordId).then( () => { this.setState({ posts: this.props.posts }); });
    this.setState({ posts: this.props.posts });
  }

  handleLoadMore() {
    const query = `?page=${this.state.page++}&limit=${this.state.limit}`;
    const wordId = this.props.match.params.id;
    this.props.getWordPosts(wordId, query).then( () => {
      this.setState( prevState => ({
        posts: [...prevState.posts, ...this.props.posts],
      }));
    });
  }

  renderPosts() {
    return this.state.posts.map((post) => (
      <PostCard ket={post._id} history={this.props.history} post={post} />
    ));
  }

  handleAddPostClick() {
    this.props.history.push("/posts/new");
  }

  render() {
    return (
      <Fragment>
        <br />
        <br />
        <Word />
        <br />
        <br/>
        <br/>
        <a className="btn-load-more-words"
          onClick={() => this.handleAddPostClick()} > 
          <FontAwesomeIcon icon={ faPlusCircle } /> </a>
        <br />
        <div className="posts">
          { this.renderPosts() }
          { this.props.isFetching ? <Spinner /> : ""}
        </div>
        {this.props.pagination.hasMore && !this.props.isFetching && (
          <button onClick={this.handleLoadMore} className="btn-load-more-words"> زيد ({ this.props.pagination.remaining }) </button>
        )}
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    word: store.currentWord,
    posts: store.posts.posts,
    pagination: store.posts.pagination,
    isFetching: store.isFetching
  }), { getWordPosts }
)(Posts);
