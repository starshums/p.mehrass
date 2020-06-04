import React from "react";
import Alerts from '../components/Alerts';
import Words from '../components/Words';

const HomePage = props => <div>
    <Alerts />
    <Words { ...props } />
</div>

export default HomePage;