const API_URL = 'https://localhost:44345/api/'
export const API_ROUTES = {
  SIGN_IN: `${API_URL}auth`,
  SAVE_USER: `${API_URL}user/SaveUser`,
  GET_USER: `${API_URL}user/GetUser`,
  GET_USERS: `${API_URL}user/GetAllUser`,
//   GET_USER: `${API_URL}/auth/me`,
}

export const APP_ROUTES = {
  SIGN_IN: '/login',
  DASHBOARD: '/',
}