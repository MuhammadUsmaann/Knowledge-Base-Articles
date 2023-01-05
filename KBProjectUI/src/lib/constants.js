const API_URL = 'https://localhost:44345/api/'
export const API_ROUTES = {
  SIGN_IN: `${API_URL}auth`,
  SAVE_USER: `${API_URL}user/SaveUser`,
  GET_USER: `${API_URL}user/GetUser`,
  GET_USERS: `${API_URL}user/GetAllUser`,
  GET_SME_USERS: `${API_URL}user/GetSMEUser`,
  DELETE_USER : `${API_URL}user/DeleteUser`,
  ASSOCIATE_USER : `${API_URL}user/AssociateUser`,
  DELETE_ASSOCIATE_USER : `${API_URL}user/DeleteAssociateUser`,
  

  SAVE_ARTICLE: `${API_URL}Article/SaveArticle`,
  GET_ARTICLES: `${API_URL}Article/GetArticles`,
  GET_ARTICLES_HOME: `${API_URL}Home/GetArticles`,
  GET_ARTICLE_BY_ID: `${API_URL}Article/GetById`,
  GET_ARTICLES_BY_USER: `${API_URL}Article/GetArticlesByUserId`,
  DELETE_ARTICLE : `${API_URL}Article/DeleteArticle`,

  
  
//   GET_USER: `${API_URL}/auth/me`,
}

export const APP_ROUTES = {
  SIGN_IN: '/login',
  DASHBOARD: '/',
}