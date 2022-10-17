import React, {useEffect, useState} from 'react';
import {Card, Table, Tag} from 'antd';
import {useRouter} from "next/router";
import {DataStore} from "aws-amplify";
import {Order, OrderStatus} from "../src/models";

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
        let color = 'gray';
        const statusToColor = {
            NEW: "green",
            COOKING: "orange",
            READY_FOR_PICKUP: "red",
        }
        return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>
    }


    const tableColumns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Delivery Address',
            dataIndex: 'deliveryAddress',
            key: 'deliveryAddress',
        },
        {
            title: 'Price',
            dataIndex: 'total',
            key: 'total',
            render: (price) => `${price?.toFixed(2)} $`
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
