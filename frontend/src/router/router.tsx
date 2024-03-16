
import Blank from '../layouts/blank/blank';
import { RouteObject } from "react-router";
import Login from '../views/pages/Login/Login';
import FullLayout from '../layouts/full/fullLayout';
import Dashboard from '../views/pages/dashboard/Dashboard';
import { Navigate } from 'react-router-dom';
import Viewer from '../views/pages/viewer/Viewer';

const Router: RouteObject[] = [
    {
        path:"/",
        element:<Navigate to="/auth/login" />
    },
    {
        path: "/auth",
        element: <Blank />,
        children: [
            {
                path: "/auth/login",
                element: <Login />
            },
            {
                path: "/auth",
                element: <Navigate to="/auth/login" />
            }

        ]
    },
    {
        path:"/user",
        element:<FullLayout/>,
        children:[
            {
                path:"/user/dashboard",
                element:<Dashboard/>
            },
            {
                path:"/user/dataview",
                element:<Viewer/>
            }
        ]
    }

];

export default Router;