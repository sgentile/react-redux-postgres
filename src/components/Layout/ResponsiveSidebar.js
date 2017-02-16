import React from 'react';
import {Link} from 'react-router';
import MenuItems from './MenuItems';

const ResponsiveMenu = ({currentRoute}) => {
    const currentRoutePath = currentRoute.path ? currentRoute.path : '/root';
    return (
        <section id="responsive-menu">
            <MenuItems currentRoutePath={currentRoutePath} />
        </section>
    )
};

export default ResponsiveMenu;
