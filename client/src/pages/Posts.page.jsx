import React from "react";
import Alerts from '../components/Alerts';
import Posts from '../components/Posts';

const PostsPage = props => <div>
    <Alerts />
    <Posts { ...props } />
</div>

export default PostsPage;