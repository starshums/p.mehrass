import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getWords, getWordPosts } from "../store/actions";
import Spinner from "../components/Spinner";

class Words extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: {},
      page: 2,
      limit: 2
    };

    this.handleWordClick = this.handleWordClick.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentWillMount() {
    console.log(this.props.words);
    this.props.getWords();
    this.setState({
      words: this.props.words
    });
  }

  handleWordClick(id) {
    this.props.getWordPosts(id);
    this.props.history.push(`/words/${id}`);
    this.setState({
      words: {}
    });
  }

  handleLoadMore() {
    const query = `?page=${this.state.page++}&limit=${this.state.limit++}`;
    this.props.getWords(query).then( () => {
      this.setState( prevState => ({
        words: [...prevState.words, ...this.props.words],
      }));
    });
    // window.scrollTo(0,document.body.scrollHeight);
  }

  renderWords() {
    return this.state.words.map((word) => (
      <Fragment key={word._id}>
        <br />
        <a onClick={() => this.handleWordClick(word._id)} className="word-link">
          <div className="word-content clearfix">
            <div className="main-word clearfix">
              <div className="word">{word.text}</div>
              <div className="word-latin">[zga : α]</div>
              <div className="word-tifinagh">[ⵣⴳⴰ : ⵣ]</div>
            </div>
            <div className="post-count">{ word.posts_count } مفاهيم</div>
            <div className="date">
              {new Date(word.created_at).toLocaleString("en-GB")}
            </div>
          </div>
        </a>
      </Fragment>
    ));
  }

  render() {
    return (
      <div>
        <h1> الكلمات : </h1>
        <div id="words">
          { this.renderWords() }
          { this.props.isFetching ? <Spinner /> : "" }
        </div>
        {this.props.pagination.hasMore && !this.props.isFetching && (
          <button onClick={this.handleLoadMore} className="btn-load-more-words">
           إظهار المزيد ({ this.props.pagination.remaining }) </button>
        )}
      </div>
    );
  }
}

export default connect(
  (store) => ({
    words: store.words.words,
    pagination: store.words.pagination,
    posts: store.posts,
    isFetching: store.isFetching.isFetching,
  }),
  { getWords, getWordPosts }
)(Words);
