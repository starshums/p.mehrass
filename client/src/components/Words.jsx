import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getWords, getWordPosts } from "../store/actions";
import Spinner from "../components/Spinner";

class Words extends Component {

    constructor(props) {
        super(props);

        this.handleWordClick = this.handleWordClick.bind(this);
    }

    componentWillMount() {
        this.props.getWords();
    }

    handleWordClick(id) {
        this.props.getWordPosts(id);
        this.props.history.push(`/words/${id}`);
    }

    renderWords() {
      return this.props.words.map( word =>  (
        <Fragment key={word._id}>
            <br />

            <a onClick={ () => this.handleWordClick(word._id) } className="word-link">
            <div className="word-content clearfix">
              <div className="main-word clearfix">
                <div className="word">
                    { word.text }
                </div>
                <div className="word-latin">
                  [zga : α]
                </div>
                <div className="word-tifinagh">
                  [ⵣⴳⴰ : ⵣ]
                </div>
              </div>

              <div className="post-count">
                { word.posts_count } مفاهيم
              </div>

              <div className="date">
                { new Date(word.created_at).toLocaleString('en-GB') }
              </div>
            </div>
          </a>
        </Fragment>
      ));
    }

    render() {
        return <div>
          <h1> الكلمات : </h1>
          { this.props.isFetching ? <Spinner /> : this.renderWords() }
        </div>
    }
}

export default connect( store => ({
    words: store.words,
    posts: store.posts,
    isFetching: store.isFetching.isFetching
}), { getWords, getWordPosts })(Words);