import React from 'react';
import axios from 'axios';
import moment from 'moment';
import * as ACTION from '../actions/actionTypes';
import toggleLoading from '../actions/loading';


export const formatData = (date) => {
  return moment(date).format('M/DD/YYYY h:mm a');
};

export function failedToAuthenticateToken(payload) {
  localStorage.removeItem('token');
  return {
    type: ACTION.LOGIN_USER_FAILURE,
    payload
  }
}

//urls is array or url string
export function getAllWithToken(urls, dispatch, getState) {
  const token = getState().authState.token;
  dispatch(toggleLoading(true));

  const urlsFuncs = urls.map((url) => axios({
    url,
    method: 'get',
    headers: {'Authorization': token}
  }));


  return axios.all(urlsFuncs).then((response) => {
    setTimeout(()=> dispatch(toggleLoading(false)), 300);
    return response;
  }).catch((error) => {
    dispatch(toggleLoading(false));
    if(error){
      if(error.response && error.response.status && error.response.status === 403){
        dispatch(failedToAuthenticateToken(error.response));
      }else {
        throw error;
      }
    }
  });
}

export function getWithToken(url, dispatch, getState) {
  const token = getState().authState.token;
  dispatch(toggleLoading(true));
  return axios({url, method: 'get', headers: {'Authorization': token}}).then((response) => {
    setTimeout(()=> dispatch(toggleLoading(false)), 300);
    return response;
  }).catch((error) => {
    dispatch(toggleLoading(false));
    if(error){
      if(error.response && error.response.status && error.response.status === 403){
        dispatch(failedToAuthenticateToken(error.response));
      }else {
        throw error;
      }
    }
  });
}

export function postWithToken(url, data, dispatch, getState, enableSpinner=true) {
  const token = getState().authState.token;
  enableSpinner && dispatch(toggleLoading(true));
  return axios({url, method: 'post', data, headers: {'Authorization': token}}).then((response) => {
    enableSpinner && setTimeout(()=> dispatch(toggleLoading(false)), 300);
    return response;
  }).catch((error) => {
    enableSpinner && dispatch(toggleLoading(false));
    if(error){
      if(error.response && error.response.status && error.response.status === 403){
        dispatch(failedToAuthenticateToken(error.response));
      }else {
        throw error;
      }
    }
  });
}

export function updateWithToken(url, data, dispatch, getState) {
  const token = getState().authState.token;
  dispatch(toggleLoading(true));
  return axios({url, method: 'put', data, headers: {'Authorization': token}}).then((response) => {
    setTimeout(()=> dispatch(toggleLoading(false)), 300);
    return response;
  }).catch((error) => {
    dispatch(toggleLoading(false));
    if(error){
      if(error.response && error.response.status && error.response.status === 403){
        dispatch(failedToAuthenticateToken(error.response));
      }else {
        throw error;
      }
    }
  });
}

export function deleteWithToken(url, dispatch, getState) {
  const token = getState().authState.token;
  dispatch(toggleLoading(true));
  return axios({url, method: 'delete', headers: {'Authorization': token}}).then((response) => {
    setTimeout(()=> dispatch(toggleLoading(false)), 300);
    return response;
  }).catch((error) => {
    dispatch(toggleLoading(false));
    if(error){
      if(error.response && error.response.status && error.response.status === 403){
        dispatch(failedToAuthenticateToken(error.response));
      }else {
        throw error;
      }
    }
  });
}

export function uploadFileWithToken(url, file, dispatch, getState) {
  let data = new FormData();
  data.append('wikifile', file, file.name);

  const token = getState().authState.token;
  dispatch(toggleLoading(true));
  return axios({url, method: 'post', data, headers: {'Authorization': token}}).then((response) => {
    setTimeout(()=> dispatch(toggleLoading(false)), 300);
    return response;
  }).catch((error) => {
    dispatch(toggleLoading(false));
    if(error){
      if(error.response && error.response.status && error.response.status === 403){
        dispatch(failedToAuthenticateToken(error.response));
      }else {
        throw error;
      }
    }
  });
}
