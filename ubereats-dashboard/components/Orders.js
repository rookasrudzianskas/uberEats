import React, {useEffect, useState} from 'react';
import {Card, Table, Tag} from 'antd';
import {useRouter} from "next/router";
import {DataStore} from "aws-amplify";
import {Order, OrderStatus} from "../src/models";
import {useRestaurantContext} from "../contexts/RestaurantContext";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const {restaurant} = useRestaurantContext();

    const fetchOrders = async () => {
        const orders = await DataStore.query(Order, (order) =>
            order.orderRestaurantId("eq", restaurant.id).or(orderStatus => orderStatus.status("eq", "NEW").status("eq", "COOKING").status("eq", "READY_FOR_PICKUP").status("eq", "ACCEPTED"))
        );
        setOrders(orders);
    }

    useEffect(() => {
        if(!restaurant) return;
        fetchOrders();
        const subscription = DataStore.observe(Order).subscribe(() => fetchOrders());
        return () => subscription.unsubscribe();
    }, [restaurant]);

    // console.log("orders", orders);

    const renderOrderStatus = (orderStatus) => {
        let color = 'gray';
        const statusToColor = {
            [OrderStatus.NEW]: "green",
            [OrderStatus.COOKING]: "orange",
            [OrderStatus.READY_FOR_PICKUP]: "red",
            [OrderStatus.ACCEPTED]: "purple",
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
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
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
                rowKey={'id'}
                onRow={(orderItem) => ({
                    onClick: () => router.push(`/order/${orderItem?.id}`)
                })}
            />
        </Card>
    );
};

export default Orders;
// by Rokas with ❤️
