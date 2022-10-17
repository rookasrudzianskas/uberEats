import React from 'react';
import {Menu} from 'antd';

const SideMenu = ({}) => {
    const menuItems = [
        {
            key: '/',
            label: 'Orders',
        },
        {
            key: '/menu',
            label: 'Menu',
        },
    ]
    return (
        <Menu items={menuItems} />
    );
};

export default SideMenu;
// by Rokas with ❤️
