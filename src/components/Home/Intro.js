import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import {Link} from 'react-router';

const Intro = () => (
    <Jumbotron>
        <div className="centerText">
            <h1>Welcome</h1>
            <p>This is a starter template for setting up React with Redux, Bootstrap and Flex Layout</p>
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            <p><Link to={'/todos'}>View All Todos</Link></p>
        </div>
    </Jumbotron>
);

export default Intro;
