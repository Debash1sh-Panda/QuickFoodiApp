import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import SignUp from "../components/SignUp";
import PrivateRouter from "../privateRouter/PrivateRouter";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";
import Cart from "../pages/shop/Cart";
import DashboardLayout from "../layout/DashboardLayout";
import Users from "../pages/Dashboard/admin/Users";
import Dashboardd from "../pages/Dashboard/admin/Dashboardd";
import Orders from "../pages/Dashboard/Orders";
import Settings from "../pages/Dashboard/Settings";
import AddMenu from "../pages/Dashboard/admin/AddMenu";
import ManageItem from "../pages/Dashboard/admin/ManageItem";
import UpdateMenu from "../pages/Dashboard/admin/UpdateMenu";

const router = createBrowserRouter([
    {
        path : "/",
        element : <Main/>,
        children : [
            {
                path : "/",
                element : <Home/>
            },
            {
                path : "/menu",
                element : <PrivateRouter><Menu/></PrivateRouter>
            },
            {
                path : "/cart",
                element : <PrivateRouter><Cart/></PrivateRouter>
            },
            {
                path : "/orders",
                element : <Orders/>
            },
            {
                path : "/settings",
                element : <Settings/>
            },
            {
                path : "/update-profile",
                element : <PrivateRouter><UpdateProfile/></PrivateRouter>
            },
        ],
    },
    {
        path : "/signup",
        element: <SignUp/>
    },
    {
        path: "/dashboard",
        element: <DashboardLayout/>,
        children: [
            {
                path: '',
                element: <Dashboardd/>
            },
            {
                path: 'users',
                element: <Users/>
            },
            {
                path: 'add-menu',
                element: <AddMenu/>
            },
            {
                path: 'manage-item',
                element: <ManageItem/>
            },
            {
                path: 'update-menu/:id',
                element: <UpdateMenu/>,
                loader: ({params}) => fetch(`http://localhost:3001/api/menu/${params.id}`)
            }
        ]
    }
])

export default router;