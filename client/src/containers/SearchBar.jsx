import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getWords } from "../store/actions";

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: ""
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
        e.preventDefault();
        const query = `?q=${this.state.query}`;
        this.props.getWords(query);
    }
    
    render() {

        const { query } = this.state;

        return (
            <div className="wrapper searchbar">
                <div className="main">
                    <div className="search-container">
                        <form onSubmit={ this.handleOnSubmit }>
                            <label htmlFor=""><FontAwesomeIcon icon={ faSearch } /> <b> إبحث عن الكلمة التالية : </b> </label>
                            <input type="text"
                                name="query"
                                id="query"
                                value={ query }
                                onChange={ this.handleOnChange }
                                autoComplete="off" />
                            <small> مثال : صافي, مزيان, باركا ...</small>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect( null, { getWords })(SearchBar);