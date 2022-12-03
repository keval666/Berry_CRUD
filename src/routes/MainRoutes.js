import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

//Pages routing
const Userlist = Loadable(lazy(() => import('views/pages/admin/Userlist')));
const UserList2 = Loadable(lazy(() => import('views/pages/admin/Userlist_2')));
const AddUser = Loadable(lazy(() => import('views/pages/admin/AddUser')));
const EditUser = Loadable(lazy(() => import('views/pages/admin/EditUser')));
const Productlist = Loadable(lazy(() => import('views/pages/admin/Productlist')));
const Product = Loadable(lazy(() => import('views/pages/admin/Product')));
const Notification = Loadable(lazy(() => import('views/pages/admin/Notification')));
const Setting = Loadable(lazy(() => import('views/pages/admin/Setting')));

//Firebase routing
const Userlist02 = Loadable(lazy(() => import('views/pages/firebase/userPage/Userlist')));
const AddUser2 = Loadable(lazy(() => import('views/pages/firebase/userPage/AddUser')));
const EditUser2 = Loadable(lazy(() => import('views/pages/firebase/userPage/EditUser')));
const ViewUser2 = Loadable(lazy(() => import('views/pages/firebase/userPage/ViewUser')));
const Productlist2 = Loadable(lazy(() => import('views/pages/firebase/productPage/Productlist')));
const AddProduct2 = Loadable(lazy(() => import('views/pages/firebase/productPage/AddProduct')));
const EditProduct2 = Loadable(lazy(() => import('views/pages/firebase/productPage/EditProduct')));
const Product2 = Loadable(lazy(() => import('views/pages/firebase/productPage/Product')));
const Pos = Loadable(lazy(() => import('views/pages/firebase/PosPage/Pos')));
const Notification2 = Loadable(lazy(() => import('views/pages/firebase/notifiaction/Notification')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
            // children: [
            //     {
            //         path: 'default',
            //     }
            // ]
        },

        //Pages list===========
        {
            path: '/pages/userlist',
            element: <Userlist />,
        },
        {
            path: '/pages/userlist2',
            element: <UserList2 />,
        },
        {
            path: '/pages/userlist/AddUser',
            element: <AddUser />
        },
        {
            path: '/pages/userlist/editUser',
            element: <EditUser />
        },
        {
            path: '/pages/productlist',
            element: <Productlist />
        },
        {
            path: '/pages/product',
            element: <Product />
        },
        {
            path: '/pages/notification',
            element: <Notification />
        },
        {
            path: '/pages/srtting',
            element: <Setting />
        },
        //======================

        //Firebase list===========
        {
            path: '/firebase/userlist',
            element: <Userlist02 />,
        },
        {
            path: '/firebase/userlist/AddUser',
            element: <AddUser2 />
        },
        {
            path: '/firebase/userlist/editUser',
            element: <EditUser2 />
        },
        {
            path: '/firebase/userlist/ViewUser/',
            element: <ViewUser2 />,
        },
        {
            path: '/firebase/productlist',
            element: <Productlist2 />
        },
        {
            path: '/firebase/productlist/AddProduct',
            element: <AddProduct2 />
        },
        {
            path: '/firebase/productlist/EditProduct',
            element: <EditProduct2 />
        },
        {
            path: '/firebase/product',
            element: <Product2 />
        },
        {
            path: '/firebase/pos',
            element: <Pos />
        },
        {
            path: '/firebase/notification',
            element: <Notification2 />
        },
        //======================

        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
