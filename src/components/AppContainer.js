import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { logoutAndRedirect } from '../actions/auth';
import { push } from 'react-router-redux';

import {Header, Footer, Sidebar, ResponsiveSidebar} from './Layout';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
      this.checkAuth(this.props.auth.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.location.pathname !== '/login' && !nextProps.auth.isAuthenticated){
        this.checkAuth(nextProps.isAuthenticated, nextProps.location.pathname);
      }
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        this.props.push('/login');
      }
    }

    logout(){
      this.props.logoutAndRedirect();
    }

    render() {
        const { children, auth } = this.props;
        const currentRoutePath = children.props.route;
        return (
            <div>
                <Header authState={auth} logout={this.logout}/>
                <section id="main-section">
                    <article id="main-content">
                        <ResponsiveSidebar currentRoute={currentRoutePath} />
                        { children }
                    </article>
                    <Footer />
                    <Sidebar authState={auth} currentRoute={currentRoutePath} />
                </section>

            </div>
        );
    }
}

const select = (state) => {
  return {
    auth: state.authState || null
  }
};

export default connect(
  select, {
    logoutAndRedirect,
    push
  }
)(AppContainer);

