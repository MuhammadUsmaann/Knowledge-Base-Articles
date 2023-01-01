import Home from './Home/Home';
import Users from './Users/Users';
import Articles from './Articles/Articles';
import Profile from './Profile/Profile';
const HeaderRoutes = [
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
    },
    {
        path: "/profile",
        name: 'profile',
        exact: true,
        pageTitle: "Profile",
        component: Profile
    }
];

export default HeaderRoutes;