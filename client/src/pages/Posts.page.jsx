import React from "react";
import Alerts from '../components/Alerts';
import Posts from '../components/Posts';
import Words from '../components/Words';

const PostsPage = props => <div>
    <Alerts />
    <Posts { ...props } />
</div>

export default PostsPage;