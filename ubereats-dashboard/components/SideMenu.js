import React from 'react';
import {Menu} from 'antd';
import {useRouter} from "next/router";

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
        }
    ];

    const onMenuItemClicked = (menuItem) => {
        router.push(`/${menuItem?.key}`)
    }

    return (
        <Menu items={menuItems} onClick={onMenuItemClicked} />
    );
};

export default SideMenu;
// by Rokas with ❤️
