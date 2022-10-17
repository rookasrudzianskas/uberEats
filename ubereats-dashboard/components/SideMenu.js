import React from 'react';
import {Menu} from 'antd';
import {useRouter} from "next/router";
import {Auth} from "aws-amplify";
import {useRestaurantContext} from "../contexts/RestaurantContext";

const SideMenu = ({}) => {
    const router = useRouter();
    const {restaurant} = useRestaurantContext();

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
            window.location.reload();
            await router.push('/');
        } else {
            await router.push(`/${menuItem?.key}`)
        }
    }

    return (
        <>
            {restaurant && (<h3 style={{marginLeft: 15, marginTop: 8}}>{restaurant?.name || 'Loading...'}</h3>)}
            <Menu items={menuItems} onClick={onMenuItemClicked} />
        </>
    );
};

export default SideMenu;
// by Rokas with ❤️
