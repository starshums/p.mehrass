import React from "react";
import Alerts from "../components/Alerts";
import Words from "../components/Words";
import { connect } from "react-redux";
import { getWords } from "../store/actions";

const HomePage = (props) => {

  return (
    <div>
      <Alerts />
      <Words {...props} />
    </div>
  );
};

export default connect( null, { getWords })(HomePage);
