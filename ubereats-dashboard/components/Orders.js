import React, {useEffect, useState} from 'react';
import {Card, Table, Tag} from 'antd';
import {useRouter} from "next/router";
import {DataStore} from "aws-amplify";
import {Order} from "../src/models";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const orders = await DataStore.query(Order);
        setOrders(orders);
    }

    useEffect(() => {
        fetchOrders();
        const subscription = DataStore.observe(Order).subscribe(() => fetchOrders());
        return () => subscription.unsubscribe();
    }, []);

    const renderOrderStatus = (orderStatus) => {
        if(orderStatus === 'Accepted') {
            return <Tag color="green">{orderStatus}</Tag>
        }
        if(orderStatus === 'Pending') {
            return <Tag color="gold">{orderStatus}</Tag>
        }
        if(orderStatus === 'Declined') {
            return <Tag color="red">{orderStatus}</Tag>
        }
        // console.log(orderStatus)
    }


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
            render: renderOrderStatus
        }
    ];
    const router = useRouter();

    return (
        <Card title={"Orders"} style={{margin: 20}}>
            <Table
                dataSource={orders}
                columns={tableColumns}
                rowKey={'orderID'}
                onRow={(orderItem) => ({
                    onClick: () => router.push(`/order/${orderItem?.orderID}`)
                })}
            />
        </Card>
    );
};

export default Orders;
// by Rokas with ❤️
