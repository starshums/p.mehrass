import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getWords } from "../store/actions";
import { withRouter } from "react-router-dom";

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: "",
            showSuggestions: false
        }

        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnFocus() {
        if( !this.state.showSuggestions ) this.setState({ showSuggestions: true })
    }
    handleOnBlur() {
        if( this.state.showSuggestions ) setTimeout(() => this.setState({ showSuggestions: false }), 100);
    }

    handleOnChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.props.getWords(`?q=${e.target.value}`);
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const { query } = this.state;
        this.props.history.push(`/search/${query}`);
        this.props.getWords(`?q=${query}`);
        window.location.reload();
    }

    handleSuggestedWordClick(id) {
        this.props.history.push(`/words/${id}`);
        window.location.reload();
    }
    
    render() {

        const { query, showSuggestions } = this.state;
        const { words } = this.props;

        return (
            <div className="wrapper searchbar">
                <div className="main">
                    <div className="search-container">
                        <form onSubmit={ this.handleOnSubmit }>
                            <h2><label htmlFor=""><FontAwesomeIcon icon={ faSearch } /> <b> إبحث عن الكلمة التالية : </b> </label></h2>
                            <input type="text"
                                name="query"
                                id="query"
                                value={ query }
                                onChange={ this.handleOnChange }
                                onFocus={ this.handleOnFocus }
                                onBlur={ this.handleOnBlur }
                                autoComplete="off" />
                                {
                                    showSuggestions ? <div className="search-query-results">
                                    {
                                        words.map( (word, index) => (
                                            <Fragment>
                                                <span>
                                                    <a onClick={ () => this.handleSuggestedWordClick(word._id) }>
                                                        { word.text} · [{ word.latin } : α] · [{ word.tifinagh } : ⵣ]
                                                    </a>
                                                </span><br/>
                                            </Fragment>
                                        ))
                                    }
                                    </div> : <small> مثال : صافي, مزيان, باركا ...</small>
                                }
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect( store => ({
    words: store.words.words
}), { getWords })(SearchBar));