import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Word from "./Word";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from "html-react-parser";

class AddPost extends Component {

    constructor(props) {
        super(props);

        const { _id } = this.props.word;

        this.state = {
            text: "",
            wordId: _id
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleOnSubmit(e) {
        const { createPost, history } = this.props;
        e.preventDefault();
        createPost(this.state);
        history.push(`/post/${this.props.post._id}`);
    }

    render() {

        const { text } = this.state;

        return <div>
            <Word />
            <br/>
            <br/>
            <br/>

            <form onSubmit={ this.handleOnSubmit }>

                <div>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={ text }
                        config={{
                            language: {
                                ui: 'ar',
                                content: 'ar'
                            },
                            removePlugins: [ 'ImageUpload', 'Table', 'MediaEmbed' ]
                        }}
                        onChange={ (e, editor) => {
                            const data = editor.getData();
                            this.setState({ text: data })
                        }}
                    />
                </div>

                <br/>
                {/* <textarea type="text"
                    className="add-post-area"
                    value={ text }
                    name="text"
                    autoComplete="off"
                    onChange={ this.handleOnChange }
                    rows="30"/>
                <br /><br /> */}

                <button type="submit" className="btn-load-more-words"> 
                    <FontAwesomeIcon icon= { faSave } />   إضافة    </button>

                <br/>
                <p> { parse(text) } </p>
            </form>
        </div>
    }
}

export default connect( (store) => ({
    word: store.currentWord,
    isFetching: store.isFetching.isFetching,
    post: store.currentPost
}), { createPost })(AddPost);