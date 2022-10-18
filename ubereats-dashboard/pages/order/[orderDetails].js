import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, Divider, List, Tag} from "antd";
import dishes from "../../assets/data/dashboard/dishes.json";
import {useRouter} from "next/router";
import {DataStore} from "aws-amplify";
import {Order, OrderDish, OrderStatus, User} from "../../src/models";

const DetailedOrder = ({}) => {
    const { query } = useRouter();
    const id = query?.orderDetails;
    const [order, setOrder] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [dishes, setDishes] = useState([]);

    let color = 'gray';
    const statusToColor = {
        [OrderStatus.NEW]: "green",
        [OrderStatus.COOKING]: "orange",
        [OrderStatus.READY_FOR_PICKUP]: "red",
        [OrderStatus.ACCEPTED]: "purple",
    }


    const fetchOrder = async () => {
        const order = await DataStore.query(Order, id);
        setOrder(order);
    }

    useEffect(() => {
        if(!id) return;
        fetchOrder();
        const subscription = DataStore.observe(Order).subscribe(() => fetchOrder());
        return () => subscription.unsubscribe();
    }, [id]);

    const fetchUser = async () => {
        const user = await DataStore.query(User, order.userID);
        setCustomer(user);
    }

    useEffect(() => {
        fetchUser();
        const subscription = DataStore.observe(User).subscribe(() => fetchUser());
        return () => subscription.unsubscribe();
    }, [order?.userID]);

    const fetchDishes = async () => {
        const dishes = await DataStore.query(OrderDish, (c) => c.orderID("eq", order.id));
        setDishes(dishes);
    }

    useEffect(() => {
        if(!order?.id) return;
        fetchDishes();
        const subscription = DataStore.observe(OrderDish).subscribe(() => fetchDishes());
        return () => subscription.unsubscribe();
    }, [order?.id]);

    return (
        <div>
            <Card title={`Order ${id || 'Loading...'}`} style={{margin: 20}}>
                <Tag color={statusToColor[order.status]}>{order?.status || 'Loading...'}</Tag>
                <Descriptions bordered column={{lg: 1, md: 1, sm: 1}}>
                    <Descriptions.Item label={'Customer'}>{customer?.name || 'Loading...' }</Descriptions.Item>
                    <Descriptions.Item label={'Customer Address'}>{customer?.address || 'Loading...'}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <List dataSource={dishes} renderItem={(dishItem) => (
                    <List.Item>
                        <div style={{fontWeight: 'bold'}}>{dishItem?.Dish?.name || 'Loading...'} x{dishItem?.Dish?.quantity || 'Loading...'}</div>
                        <div>${dishItem?.Dish?.price || 'Loading...'}</div>
                    </List.Item>
                )} />
                <Divider />
                <div style={styles.totalSumContainer}>
                    <h2>Total:</h2>
                    <h2 style={styles.totalPrice}>${order?.total?.toFixed(2) || 'Loading...'}</h2>
                </div>
                <Divider />
                {order?.status === OrderStatus.NEW && (
                    <div style={styles.buttonsContainer}>
                        <Button block type={'danger'} size={'large'} style={styles.button}>
                            Decline Order
                        </Button>
                        <Button block type={'primary'} size={'large'} style={styles.button}>
                            Accept Order
                        </Button>
                    </div>
                )}
                {order?.status === OrderStatus.COOKING && (
                    <Button block color={'green'} type={'primary'} size={'large'}>
                        Food Is Done
                    </Button>
                )}
            </Card>
        </div>
    );
};

const styles = {
    totalSumContainer: {
        flexDirection: 'row',
        display: 'flex',
    },
    totalPrice: {
        marginLeft: 'auto',
        fontWeight: 'bold'
    },
    buttonsContainer: {
        display: 'flex',
        paddingBottom: 30
    },
    button: {
        marginRight: 20,
        marginLeft: 20,
    }
}

export default DetailedOrder;
// by Rokas with ❤️
