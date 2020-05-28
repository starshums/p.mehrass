import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWrench, faPlusCircle, faXRay, faUser, faDoorOpen, faDoorClosed, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ auth, logout }) => (
  <Fragment>
    <div className="wrapper main-menu">
      <div className="main">
        <div className="navbar">
          
          <div className="main-nav-links clearfix">

              <ul className="nav-links">
                <li> <a className="logo" href="/" style={{color: "white"}}> <FontAwesomeIcon icon={faWrench} /> </a> </li>
                <li> <Link to="/" ><FontAwesomeIcon icon={faHome} /> الصفحة الرئيسية </Link></li>
                <li> <Link to="/test"><FontAwesomeIcon icon={faXRay} /> تجريبي</Link> </li>
                <li> <Link to="/add-post"><FontAwesomeIcon icon={faPlusCircle} /> إضافة</Link> </li>
              </ul>

              <ul className="login-links"> 
              { !auth.isAuthenticated ?
                      <Fragment>
                          <li> <Link className="register-link" to="/register"> <FontAwesomeIcon icon={faInfoCircle} /> تسجيل </Link> </li>
                          <li> <Link className="login-link" to="/login"> <FontAwesomeIcon icon={faDoorClosed} /> دخول </Link> </li>
                      </Fragment> :
                      <Fragment>
                          <li>
                            <Link className="profile-link" to="/profile">
                            { auth.user.username ? auth.user.username : auth.user.email } <FontAwesomeIcon icon={faUser} /> </Link>
                              <a className="logout-link" onClick={ logout }> <FontAwesomeIcon icon={faDoorOpen} /> خروج </a>
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
