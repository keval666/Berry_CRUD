import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

// dashboard routing
const NotFound = Loadable(lazy(() => import('views/pages/Error404')));

// ==============================|| MAIN ROUTING ||============================== //

const Error404 = {
    path: '*',
    element: <NotFound />,
};

export default Error404;
