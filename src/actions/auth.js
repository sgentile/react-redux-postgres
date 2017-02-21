import axios from 'axios';
import * as ACTION from './actionTypes';
import { pushState } from 'react-router-redux';
import { browserHistory } from 'react-router';

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: ACTION.LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  if(error.response.data.message === 'Not authorized - pending authorization'){
    return {
      type: ACTION.USER_PENDING_AUTHORIZATION,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText
      }
    }
  }else {
    return {
      type: ACTION.LOGIN_USER_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText
      }
    }
  }
}

export function loginUserRequest() {
  return {
    type: ACTION.LOGIN_USER_REQUEST
  }
}

export function logout() {
  localStorage.removeItem('token');
  return {
    type: ACTION.LOGOUT_USER
  }
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(pushState('/login'));
  }
}

export function loginUser() {
  return function (dispatch, getState) {
    const form = getState().form;
    return axios.post('/api/auth', form.login.values)
      .then((response) => {
        try {
          dispatch(loginUserSuccess(response.data));
          browserHistory.push('/');
          //const router = getState().routing.locationBeforeTransitions.query.redirectAfterLogin
        } catch (e) {
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }));
        }
      }, (error) => {
        dispatch(loginUserFailure(error));
      });
  }
}

export function registrationUserSuccess(user) {
  return {
    type: ACTION.USER_REGISTRATION_SUCCESS,
    user
  }
}

export function registrationUserFailure(error) {
  return {
    type: ACTION.USER_REGISTRATION_FAILED,
    error
  }
}

export function registerUser() {
  return function (dispatch, getState) {
    const form = getState().form;
    return axios.post('/api/register', form.login.values)
      .then((response) => {
        dispatch(registrationUserSuccess(response.data));
      }, (error) => {
        dispatch(registrationUserFailure(error));
      });
  }
}
