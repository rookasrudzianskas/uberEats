import React, {useEffect, useState} from 'react';
import {Card, Table, Tag} from "antd";
import orders from "../assets/data/dashboard/orders-history.json";
import {useRestaurantContext} from "../contexts/RestaurantContext";
import {Order, OrderStatus} from "../src/models";
import {DataStore} from "aws-amplify";

const OrderHistory = ({}) => {
    const [orders, setOrders] = useState([]);
    const {restaurant} = useRestaurantContext();

    const fetchOrders = async () => {
        const orders = await DataStore.query(Order, (order) =>
            order.orderRestaurantId("eq", restaurant.id).or(orderStatus => orderStatus.status("eq", "NEW").status("eq", "COOKING").status("eq", "READY_FOR_PICKUP"))
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
            [OrderStatus.NEW]: "green",
            [OrderStatus.COOKING]: "orange",
            [OrderStatus.READY_FOR_PICKUP]: "red",
        }
        return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>
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
            render: (status) => <Tag color={status === 'Delivered' ? 'green' : 'red'}>{status}</Tag>
        }
    ];

    return (
        <Card title={"Orders History"} style={{margin: 20}}>
            <Table
                dataSource={orders}
                columns={tableColumns}
                rowKey={'orderID'}
                onRow={(orderItem) => ({
                    // onClick: () => router.push(`/order/${orderItem?.orderID}`)
                })}
            />
        </Card>
    );
};

export default OrderHistory;
// by Rokas with ❤️
