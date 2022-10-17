import React from 'react';
import {Card, Table, Button } from 'antd';
import dishes from '../assets/data/dashboard/dishes.json';
import Link from "next/link";

const Menu = ({}) => {
    const tableColumns = [
        {
            title: 'Menu Item',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Price",
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span>{price} $</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: () => <Button danger>Remove</Button>
        }
    ];

    const renderNewItemButton = () => (
        <Link href={'/menu/create'}>
            <Button type={'primary'}>
                New Item
            </Button>
        </Link>
    )

    return (
        <Card title={'Menu'} style={{margin: 20}} extra={renderNewItemButton()}>
            <Table dataSource={dishes} columns={tableColumns} rowKey={'id'} />
        </Card>
    );
};

export default Menu;
// by Rokas with ❤️
