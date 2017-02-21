import React from 'react';
import {Link} from 'react-router';

const MenuItems = ({currentRoutePath, authState}) => {
    return (
      <ul className="sidebar-menu">
        <li className={currentRoutePath === '/root' ? 'active' : ''}><Link to={'/'}><i className="fa fa-home"></i><span>Home</span></Link></li>
        {authState && authState.isAuthenticated &&
          <li className={currentRoutePath === '/todos' ? 'active' : ''}><Link to={'/todos'}><i className="fa fa-th-list"></i> <span>Todos</span></Link></li>
        }
      </ul>
    )
};

export default MenuItems;
