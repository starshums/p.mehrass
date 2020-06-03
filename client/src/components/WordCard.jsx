import React, { Component, Fragment } from "react";

class WordCard extends Component {

    constructor(props) {
        super(props);

        this.handleWordClick = this.handleWordClick.bind(this);
    }

    handleWordClick(id) {
        this.props.history.push(`/words/${id}`);
    }

    render() {
        return <Fragment>
        <br />
        <a onClick={() => this.handleWordClick(this.props.word._id)} className="word-link">
          <div className="word-content clearfix">
            <div className="main-word clearfix">
              <div className="word">{this.props.word.text}</div>
              <div className="word-latin">
                { this.props.word.latin ? `· ${this.props.word.latin} : α` : ""}
              </div>
              <div className="word-tifinagh">
                { this.props.word.tifinagh ? `· ${this.props.word.tifinagh} : ⵣ` : ""}
              </div>
            </div>
            <div className="post-count">{ this.props.word.posts_count } مفاهيم</div>
            <div className="date">
              {new Date(this.props.word.created_at).toLocaleString("en-GB")}
            </div>
          </div>
        </a>
      </Fragment>;
    }
}

export default WordCard;