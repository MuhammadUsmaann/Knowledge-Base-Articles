import Home from './Home/Home';
import Users from './Users/Users';
import Articles from './Articles/Articles';

const Routes = [
    {
        path: "/",
        name: 'dashboard',
        exact: true,
        pageTitle: "Home",
        component: Home
    },
    {
        path: "/users",
        name: 'users',
        exact: true,
        pageTitle: "Users",
        component: Users
    },
    {
        path: "/articles",
        name: 'articles',
        exact: true,
        pageTitle: "Articles",
        component: Articles
    }
];

export default Routes;