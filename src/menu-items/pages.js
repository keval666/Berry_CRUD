// assets
import { IconKey, IconUsers, IconStack2, IconSettings, IconBell } from '@tabler/icons';

// constant
const icons = { IconKey, IconUsers, IconStack2, IconSettings, IconBell };

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    // caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'userlist',
            title: 'Userlist',
            type: 'item',
            url: '/pages/userlist',
            icon: icons.IconUsers,
            breadcrumbs: false,
        },
        {
            id: 'productlist',
            title: 'productlist',
            type: 'item',
            url: '/pages/productlist',
            icon: icons.IconStack2,
            breadcrumbs: false
        },
        {
            id: 'notification',
            title: 'Notification',
            type: 'item',
            url: '/pages/notification',
            icon: icons.IconBell,
            breadcrumbs: false
        },
        {
            id: 'setting',
            title: 'Setting',
            type: 'item',
            url: '/pages/srtting',
            icon: icons.IconSettings,
            breadcrumbs: false
        },
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/login3',
                    target: true,
                    breadcrumbs: false
                },
                {
                    id: 'register3',
                    title: 'Register',
                    type: 'item',
                    url: '/register3',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
