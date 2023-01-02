
import { createRoot  } from 'react-dom/client';
import { Provider } from 'react-redux'
import {store} from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from "react-router-dom";


// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </React.StrictMode>
//   );

const rootElement  = document.getElementById('root');
const root = createRoot(rootElement); // createRoot(container!) if you use TypeScript


root.render(<Provider store={store}> <BrowserRouter>
<App />
</BrowserRouter></Provider>);

// createRoot.render(
//     <Provider store={configureStore()}>
//         <App />
//     </Provider>
//     ,
//     document.getElementById('root')
// );
// registerServiceWorker();
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
