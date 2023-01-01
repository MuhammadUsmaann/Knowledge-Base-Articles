// import { createStore, applyMiddleware, compose } from 'redux';
 import thunk from 'redux-thunk';
// import rootReducer from './reducers/rootReducer';
// export default function configureStore() {
//     const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     return createStore(
//         rootReducer,
//         composeEnhancers(applyMiddleware(thunk))
//     );
// }

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})