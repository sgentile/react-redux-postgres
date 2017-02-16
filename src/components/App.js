import React, {PropTypes, Component} from 'react';
import {Header, Footer, Sidebar, ResponsiveSidebar} from './Layout';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        const currentRoutePath = children.props.route;
        return (
            <div>
                <Header />
                <section id="main-section">
                    <article id="main-content">
                        <ResponsiveSidebar currentRoute={currentRoutePath} />
                        { children }
                    </article>
                    <Footer />
                    <Sidebar currentRoute={currentRoutePath}/>
                </section>

            </div>
        );
    }
}

