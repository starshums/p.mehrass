import React, { Component, Fragment } from "react";

class PostCard extends Component {

    constructor(props) {
        super(props);
        
        this.handlePostClick = this.handlePostClick.bind(this);
    }

    handlePostClick(id) {
        this.props.history.push(`/post/${id}`);
    }

    render() {
        return <Fragment>
        <div className="word-content post-main-content clearfix">
          <div className="main-word clearfix">{this.props.post.text}</div>

          <div className="post-count" onClick={() => this.handlePostClick(this.props.post._id)} >
            {new Date(this.props.post.created_at).toLocaleString("en-GB")}
          </div>

          <div className="date">
            <a href="">
              {this.props.post.user.username ? this.props.post.user.username : this.props.post.user.email}
            </a>
          </div>
        </div>

        <br />
      </Fragment>
    }
}

export default PostCard;