import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "./Spinner";

const Word = ({ word, isFetching }) => {
  // return isFetching ? <Spinner /> : <Fragment>
  return <Fragment>
  <div className="word-content word-post clearfix">
    <div className="main-word clearfix">
      <div className="word">{word.text}</div>
      <div className="word-latin">{ word.latin ? `· [${word.latin} : α]` : ""}</div>
      <div className="word-tifinagh">{ word.tifinagh ? `· [${word.tifinagh} : ⵣ]` : ""}</div>
    </div>

    <div className="post-count">{ word.postsCount } ديال المفاهيم</div>
  </div>

  { word.latin ?
  <div className="word-latin-tag">
    <b>لاتيني</b> : {word.latin}
  </div>
  : "" }

  { word.tifinagh ?
  <div className="word-tifinagh-tag">
    <b>تيفيناغ</b> : {word.tifinagh}
  </div>
  : "" }

</Fragment>

};

export default connect((store) => ({
  word: store.currentWord,
  isFetching: store.isFetching.isFetching
}))(Word);
