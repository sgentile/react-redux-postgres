import React from 'react';
import {Link} from 'react-router';

const Header = ({authState, logout}) => (
    <nav id="main-header" >
        {authState && authState.isAuthenticated &&
          <a href="" className="pull-right app-user" onClick={logout.bind(this)}>{authState.name}</a>
        }
        <Link to={'/'} className="app-title">React Redux</Link>

    </nav>
);

export default Header;
