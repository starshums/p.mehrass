import React from "react";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth";
import Alerts from "../components/Alerts";

const AuthPage = ({ authType, isAuthenticated }) => {

    if( isAuthenticated ) return <Redirect to="/" />

    return (
        <div>
            <Alerts />
            <Auth authType={authType} />
        </div>
    );
}

export default AuthPage;