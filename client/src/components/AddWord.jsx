import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { addWord } from "../store/actions";

class AddWord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            tifinagh: "",
            latin: ""
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        });
        console.log( this.state );
    }

    handleOnSubmit(e) {
        const { addWord, history, word } = this.props;
        e.preventDefault();
        addWord(this.state);
        history.push(`/words/${word._id}`);
    }

    render() {

        const { text, tifinagh, latin } = this.state;

        return <Fragment>
            <form onSubmit={ this.handleOnSubmit }>

                <h2> <FontAwesomeIcon icon={ faPlusCircle } /> زيد كلمة جديدة :  </h2>

                <br/>

                <label htmlFor="text"> <b> الكلمة : </b> </label><br />
                <input type="text"
                    value={ text }
                    name="text"
                    autoComplete="off"
                    onChange={this.handleOnChange} />
                <small> <i>  مثال : واخا </i> </small>
                <br /><br />

                <label htmlFor="tifinagh"> <b> الكلمة بالأمازيغية : </b> </label><br />
                <input type="text"
                    value={ tifinagh }
                    name="tifinagh"
                    autoComplete="off"
                    onChange={this.handleOnChange} />
                <small> <i> مثال : ⵡⴰⴿⴰ </i> </small>
                <br /><br />

                <label htmlFor="latin"> <b>  الكلمة بالاتينية : </b> </label><br />
                <input type="text"
                    value={ latin }
                    name="latin"
                    autoComplete="off"
                    onChange={this.handleOnChange} />
                <small> <i> مثال : Wakha </i>  </small>
                <br /><br />

                <button type="submit" className="btn-load-more-words"> 
                    <FontAwesomeIcon icon= { faSave } /> </button>
            </form>
        </Fragment>
    }
}

export default connect( (store) => ({
    word: store.currentWord
}), { addWord })(AddWord);