import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getWords, getWordPosts } from "../store/actions";
import Spinner from "../components/Spinner";
import WordCard from "./WordCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFile, faLanguage, faList, faListAlt, faListUl, faThList, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

class Words extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: {},
      page: 2,
      limit: 5,
      isSearch: false
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  clearState() {
    this.setState({ words: {} });
  }

  componentWillMount() {
    this.clearState();
    const { query } = this.props.match.params;
    if( !query ) this.props.getWords().then(() => { this.setState({ words: this.props.words }); });
      else this.props.getWords(`?q=${query}`).then(() => { this.setState({ words: this.props.words }); });
    this.setState({ words: this.props.words });
    if( window.location.href.includes("search") ) this.setState({ isSearch: true });
  }

  handleLoadMore() {
    const query = `?page=${this.state.page++}&limit=${this.state.limit}`;
    this.props.getWords(query).then( () => {
      this.setState( prevState => ({
        words: [...prevState.words, ...this.props.words],
      }));
    });
  }

  renderWords() {
    return this.state.words.map((word) => (
      <WordCard key={word._id} history={this.props.history} word={word} />
    ));
  }

  render() {

    const { isSearch } = this.state;

    return (
      <Fragment>
        { isSearch ? <h3> <FontAwesomeIcon icon={ faSearch } /> · تم العثور على {this.props.pagination.total} مفهوم </h3>:
        <h3> <FontAwesomeIcon icon={ faQuoteLeft } /> · الكلمات ({ this.props.pagination.total }) : </h3>}
        <div id="words">
          { this.renderWords() }
          { this.props.isFetching ? <Spinner /> : "" }
        </div>
        {this.props.pagination.hasMore && !this.props.isFetching && (
          <button onClick={this.handleLoadMore} className="btn-load-more-words">
           إظهار المزيد ({ this.props.pagination.remaining }) </button>
        )}
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    words: store.words.words,
    pagination: store.words.pagination,
    isFetching: store.isFetching.isFetching,
  }),
  { getWords, getWordPosts }
)(Words);
