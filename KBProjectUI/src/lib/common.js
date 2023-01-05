import { API_ROUTES } from './constants';
import axios from 'axios';

import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}


export function storeTokenInLocalStorage(token) {
  localStorage.setItem('token', token);
}

export function setUserName(token) {
  localStorage.setItem('username', token);
}

export function getUserName() {
  return localStorage.getItem('username');
}

export function setUserRole(token) {
  localStorage.setItem('userrole', token);
}

export function getUserRole() {
  return localStorage.getItem('userrole');
}

export function removeTokenInLocalStorage() {
  localStorage.removeItem('token');
}
export function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }
    const response = await axios({
      method: 'GET',
      url: API_ROUTES.GET_USER,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { authenticated = false } = response.data;
    return authenticated ? response.data : false;
  }
  catch (err) {
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}

export async function SendPostRequest(url, data) {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }
    const response = await axios({
      method: 'post',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: data
    });
    if(response?.data?.Success)
    {
      return response.data.Result;
    }
    else{
      console.log(response.data.Message)
      return response.data.Result;
    }
  }
  catch (err) {
    removeTokenInLocalStorage();
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}

export async function SendGetRequest(url) {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }
    const response = await axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if(response?.data?.Success)
    {
      return response.data.Result;
    }
    else{
      console.log(response.data.Message)
      return response.data.Result;
    }
  }
  catch (err) {
    removeTokenInLocalStorage();
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}