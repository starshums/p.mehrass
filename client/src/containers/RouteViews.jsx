import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import AuthPage from "../pages/Auth.page";
import TestPage from "../pages/Test.page";
import HomePage from "../pages/Home.page";
import PostPage from "../pages/Post.page";
import AddPostPage from "../pages/AddPost.page";
import PostsPage from "../pages/Posts.page";
import ProfilePage from "../pages/Profile.page";
import SearchPage from "../pages/Search.page";

// renders a specific route
const RouteViews = ({ auth }) => (
  <main>
    <Switch>
      <Route exact path="/" render={ (props) => <HomePage { ...props } /> } />
      <Route exact path="/profile" render={ (props) => <ProfilePage { ...props } /> } />
      <Route exact path="/words/:id" render={ (props) => <PostsPage { ...props } /> } />
      <Route exact path="/search/:query" render={ (props) => <SearchPage { ...props } /> } />
      <Route exact path="/login" render={() => <AuthPage authType="login" isAuthenticated={auth.isAuthenticated} />} />
      <Route exact path="/register" render={() => <AuthPage authType="register" isAuthenticated={auth.isAuthenticated} />} />
      <Route exact path="/post/:id" render={ props => <PostPage { ...props } /> } />
      <Route exact path="/add-post" component={ (props) => <AddPostPage isAuthenticated={auth.isAuthenticated} history={props.history} /> } />
      <Route exact path="/test" render={ (props) => <TestPage { ...props } /> } />
    </Switch>
  </main>
);

export default withRouter(connect( (store) => ({ auth: store.auth }) )(RouteViews));
