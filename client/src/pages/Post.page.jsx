import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../store/actions";
import Post from "../components/Post";
import Alerts from "../components/Alerts";

class PostPage extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        this.props.getPost(id);
    }

    render() {
        return (
            <div>
                <Alerts />
                <Post />
            </div>
        );
    }

}


export default connect( store => ({}), { getPost })(PostPage);