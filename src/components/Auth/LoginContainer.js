import React, {Component} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import LoginView from './LoginView';
import RegisterView from './RegisterView';
import {loginUser, registerUser} from '../../actions/auth';




class LoginContainer extends Component{
  constructor(props) {
    super(props);

    this.toggleRegister = this.toggleRegister.bind(this);

    this.state = {
      showRegistration: false
    }
  }

  componentWillMount() {
    if(this.props.authState.isAuthenticated){
      this.props.push('/');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.authState.registered) {
      this.setState({
        showRegistration: false
      })
    }
  }


  toggleRegister() {
    this.setState({
      showRegistration:!this.state.showRegistration
    })
  }

  render(){
    return (
      <div className="login-page-body">
        {this.state.showRegistration ?
          <RegisterView registerUser={this.props.registerUser} authState={this.props.authState} toggleRegister={this.toggleRegister}/>
          :
          <LoginView loginUser={this.props.loginUser} authState={this.props.authState} toggleRegister={this.toggleRegister}/>
        }
      </div>
    );
  }
}

function select(state) {
  return {
    authState : state.authState
  };
}

export default connect(
  select, {
    loginUser,
    registerUser,
    push
  }
)(LoginContainer);


