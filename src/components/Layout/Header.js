import React from 'react';
import {Link} from 'react-router';

const Header = () => (
    <nav id="main-header" >
        <Link to={'/'} className="pull-right app-title">React Redux</Link>
    </nav>
);

export default Header;