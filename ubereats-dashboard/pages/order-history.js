import React, {useEffect, useState} from 'react';
import {Card, Table, Tag} from "antd";
import orders from "../assets/data/dashboard/orders-history.json";
import {useRestaurantContext} from "../contexts/RestaurantContext";
import {Order, OrderStatus} from "../src/models";
import {DataStore} from "aws-amplify";
import {useRouter} from "next/router";

const OrderHistory = ({}) => {
    const [orders, setOrders] = useState([]);
    const {restaurant} = useRestaurantContext();
    const router = useRouter();

    const fetchOrders = async () => {
        const orders = await DataStore.query(Order, (order) =>
            order.orderRestaurantId("eq", restaurant.id).or(orderStatus => orderStatus.status("eq", "PICKED_UP").status("eq", "COMPLETED").status("eq", "DECLINED_BY_RESTAURANT"))
        );
        setOrders(orders);
    }

    useEffect(() => {
        if(!restaurant) return;
        fetchOrders();
        const subscription = DataStore.observe(Order).subscribe(() => fetchOrders());
        return () => subscription.unsubscribe();
    }, [restaurant]);

    const renderOrderStatus = (orderStatus) => {
        let color = 'gray';
        const statusToColor = {
            [OrderStatus.PICKED_UP]: "orange",
            [OrderStatus.COMPLETED]: "green",
            [OrderStatus.DECLINED_BY_RESTAURANT]: "red",
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

    return (
        <Card title={"Orders History"} style={{margin: 20}}>
            <Table
                dataSource={orders}
                columns={tableColumns}
                rowKey={'id'}
                onRow={(orderItem) => ({
                    onClick: () => router.push(`/order/${orderItem?.orderID}`)
                })}
            />
        </Card>
    );
};

export default OrderHistory;
// by Rokas with ❤️
