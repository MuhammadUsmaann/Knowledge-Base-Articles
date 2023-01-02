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

export function removeTokenInLocalStorage(token) {
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