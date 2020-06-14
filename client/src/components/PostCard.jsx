import React, { Component, Fragment } from "react";
import parse from "html-react-parser";

class PostCard extends Component {

    constructor(props) {
        super(props);
        
        this.handlePostClick = this.handlePostClick.bind(this);
    }

    handlePostClick(id) {
        this.props.history.push(`/post/${id}`);
    }

    render() {
      const { post, user } = this.props;
        return <Fragment>
        <div className="word-content post-main-content clearfix">
          <div className="main-word clearfix">{ parse(post.text) }</div>

          <div className="post-count" onClick={() => this.handlePostClick(post._id)} >
            {new Date(post.created_at).toLocaleString("en-GB")}
          </div>

          <div className="date">
            <a href="">
              {post.user.username ? post.user.username : post.user.email}
            </a>
          </div>
        </div>

        <br />
      </Fragment>
    }
}

export default PostCard;