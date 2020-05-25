import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../store/actions";

class AddPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ""
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log( this.state );
    }

    handleOnSubmit(e) {
        e.preventDefault();
        this.props.createPost(this.state);
    }

    render() {
        return <div>

            <form onSubmit={ this.handleOnSubmit }>

                <label htmlFor="text">Post text</label><br />
                <textarea type="text"
                    value={this.state.text}
                    name="text"
                    autoComplete="off"
                    onChange={this.handleOnChange} />
                <br /><br />

                <button type="submit"> Add post </button>
            </form>
        </div>
    }
}

export default connect( () => ({}), { createPost })(AddPost);