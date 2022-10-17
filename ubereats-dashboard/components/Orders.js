import React from 'react';
import orders from '../assets/data/dashboard/orders.json';
import {Card, Table, Tag} from 'antd';

const Orders = ({}) => {
    const tableColumns = [
        {
            title: 'Order ID',
            dataIndex: 'orderID',
            key: 'orderID',
        },
        {
            title: 'Delivery Address',
            dataIndex: 'deliveryAddress',
            key: 'deliveryAddress',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price} $`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }
    ];
    return (
        <Card title={"Orders"} style={{margin: 20}}>
            <Table
                dataSource={orders}
                columns={tableColumns}
            />
        </Card>
    );
};

export default Orders;
// by Rokas with ❤️
