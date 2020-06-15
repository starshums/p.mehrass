import React from "react";
import { Redirect } from "react-router-dom";
import Alerts from "../components/Alerts";
import AddWord from "../components/AddWord";

const AddWordPage = ({ isAuthenticated, history }) => {

    if( !isAuthenticated ) return <Redirect to="/login" />

    return (
        <div>
            <Alerts />
            <AddWord history={history} />
        </div>
    );
}

export default AddWordPage;