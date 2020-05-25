import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import { authUser, logout } from "../store/actions";

class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: ""
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        });
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const { username, email, password } = this.state;
        const { authType } = this.props;
        this.props.authUser(authType || "login", { username, email, password });
    }
    
    render() {

        const { username, email, password } = this.state;

        return <div>
            <form onSubmit={this.handleOnSubmit}>
                {
                    this.props.authType === "login" ?
                     <Fragment></Fragment> :
                     <Fragment>
                     <label htmlFor="username">Username</label><br />
                     <input type="text"
                         value={username}
                         name="username"
                         autoComplete="off"
                         onChange={this.handleOnChange} />
                     <br /><br />
                     </Fragment>
                }

                <label htmlFor="email">Email</label><br />
                <input type="text"
                    value={email}
                    name="email"
                    autoComplete="off"
                    onChange={this.handleOnChange} />
                <br /><br />

                <label htmlFor="password">Password</label><br />
                <input type="password"
                    value={password}
                    name="password"
                    autoComplete="off"
                    onChange={this.handleOnChange} />
                <br /><br />

                <button type="submit">
                    { this.props.authType === "login" ? "Login" : "Register" }
                </button>
            </form>
        </div>;
    }
}

export default connect(
    () => ({}),
    {authUser, logout}
)(Auth);