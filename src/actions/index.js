import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function authUser(dispatch,response){
  //If request is good
  //Update state to indicate user is authenticated
  dispatch({ type: AUTH_USER });
  //Save the JWT
  localStorage.setItem('token',response.data.token);
  //redirect to the route /feature
  browserHistory.push('/feature');
}

export function signinUser({email, password}){
  return (dispatch) => {
    //Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`,{email,password})
    .then(response => {authUser(dispatch,response)})
    .catch(() =>{
      dispatch(authError('Bad Login Info'));
    });



  }
}

export function signupUser({email, password}){

  return dispatch => {
    axios.post(`${ROOT_URL}/signup`,{email,password})
    .then(response => { authUser(dispatch,response) })
    .catch(error => {
      dispatch(authError(error.response.data.error));
    });
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

export function fetchMessage(){
  return dispatch => {
    axios.get(ROOT_URL,{
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch({type: FETCH_MESSAGE, payload: response.data.message});
    });

  }
}

export function authError(error){

  localStorage.removeItem('token');

  return {
    type: AUTH_ERROR,
    payload: error
  };
}
