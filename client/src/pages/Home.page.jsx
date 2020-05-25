import React from "react";
import Alerts from '../components/Alerts';
import Posts from '../components/Posts';
import Words from '../components/Words';

const HomePage = props => <div>
    <Alerts />
    <Words { ...props } />
</div>

export default HomePage;