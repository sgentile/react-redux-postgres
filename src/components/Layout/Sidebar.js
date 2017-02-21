import React from 'react';
import {Link} from 'react-router';
import MenuItems from './MenuItems';

const Sidebar = ({currentRoute, authState}) => {
    const currentRoutePath = currentRoute.path ? currentRoute.path : '/root';
    return (
        <nav id="main-sidebar" role="navigation">
            <div className="sidebar">
                <MenuItems authState={authState} currentRoutePath={currentRoutePath} />
            </div>
        </nav>
    )
};

export default Sidebar;
