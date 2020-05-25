import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions";

const NavBar = ({ auth, logout }) => (
  <Fragment>
    <div className="wrapper main-menu">
      <div className="main">
        <div className="navbar">
          
          <div className="main-nav-links clearfix">

              <ul className="nav-links">
                <li> <a className="logo" href="/" style={{color: "white"}}> % </a> </li>
                <li> <Link to="/" >الصفحة الرئيسية</Link></li>
                <li> <Link to="/test">تجريبي</Link> </li>
                <li> <Link to="/add-post">إضافة</Link> </li>
              </ul>

              <ul className="login-links"> 
              { !auth.isAuthenticated ?
                      <Fragment>
                          <li> <Link className="register-link" to="/register"> تسجيل </Link> </li>
                          <li> <Link className="login-link" to="/login"> دخول </Link> </li>
                      </Fragment> :
                      <Fragment>
                          <li>
                            <Link className="profile-link" to="/profile"> { auth.user.username ? auth.user.username : auth.user.email } </Link>
                              <a className="logout-link" onClick={ logout }> خروج </a>
                          </li>
                      </Fragment>
                  }
              </ul>
            </div>
            

        </div>
      </div>
    </div>
  </Fragment>
);

export default connect((store) => ({ auth: store.auth }), { logout })(NavBar);
