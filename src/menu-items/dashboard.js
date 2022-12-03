// assets
import { IconDashboard, IconKey, IconUsers, IconStack2, IconSettings, IconBell, IconExposure } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconKey, IconUsers, IconStack2, IconSettings, IconBell, IconExposure };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Menu',
    // caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'userlist',
            title: 'Userlist',
            type: 'item',
            url: '/firebase/userlist',
            icon: icons.IconUsers,
            breadcrumbs: false,
        },
        {
            id: 'productlist',
            title: 'productlist',
            type: 'item',
            url: '/firebase/productlist',
            icon: icons.IconStack2,
            breadcrumbs: false
        },
        {
            id: 'pos',
            title: 'POS',
            type: 'item',
            url: '/firebase/pos',
            icon: icons.IconExposure,
            breadcrumbs: false
        },
        {
            id: 'notification',
            title: 'Notification',
            type: 'item',
            url: '/firebase/notification',
            icon: icons.IconBell,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
