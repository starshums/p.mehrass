import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "./Spinner";

const Word = ({ word, isFetching }) => {
  // return isFetching ? <Spinner /> : <Fragment>
  return <Fragment>
  <div className="word-content word-post clearfix">
    <div className="main-word clearfix">
      <div className="word">{word.text}</div>
      <div className="word-latin">[zga : α]</div>
      <div className="word-tifinagh">[ⵣⴳⴰ : ⵣ]</div>
    </div>

    <div className="post-count">{ word.postsCount } مفاهيم</div>
  </div>

  <div className="word-latin-tag">
    <b>لاتيني</b> : zga
  </div>
  <div className="word-tifinagh-tag">
    <b>تيفيناغ</b> : ⵣⴳⴰ
  </div>
</Fragment>

};

export default connect((store) => ({
  word: store.currentWord,
  isFetching: store.isFetching.isFetching
}))(Word);
