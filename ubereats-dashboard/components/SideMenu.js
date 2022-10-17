import React from 'react';
import {Menu} from 'antd';
import {useRouter} from "next/router";
import {Auth} from "aws-amplify";

const SideMenu = ({}) => {
    const router = useRouter();

    const menuItems = [
        {
            key: '/',
            label: 'Orders',
        },
        {
            key: 'menu',
            label: 'Menu',
        },
        {
            key: 'order-history',
            label: 'Order History',
        },
        {
            key: 'settings',
            label: 'Settings',
        },
        {
            key: 'logout',
            label: 'Logout',
            danger: 'true',
        }
    ];

    const onMenuItemClicked = async (menuItem) => {
        if (menuItem.key === 'logout') {
            // logout
            await Auth.signOut();
            router.push('/');
        } else {
            router.push(`/${menuItem?.key}`)
        }
    }

    return (
        <Menu items={menuItems} onClick={onMenuItemClicked} />
    );
};

export default SideMenu;
// by Rokas with ❤️
