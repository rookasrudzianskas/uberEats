import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, Divider, List} from "antd";
import dishes from "../../assets/data/dashboard/dishes.json";
import {useRouter} from "next/router";
import {DataStore} from "aws-amplify";
import {Order, User} from "../../src/models";

const DetailedOrder = ({}) => {
    const { query } = useRouter();
    const id = query?.orderDetails;
    const [order, setOrder] = useState([]);
    const [customer, setCustomer] = useState([]);

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

    // console.log("user", customer);

    return (
        <div>
            <Card title={`Order ${id || 'Loading...'}`} style={{margin: 20}}>
                <Descriptions bordered column={{lg: 1, md: 1, sm: 1}}>
                    <Descriptions.Item label={'Customer'}>{customer?.name || 'Loading...' }</Descriptions.Item>
                    <Descriptions.Item label={'Customer Address'}>{customer?.address || 'Loading...'}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <List dataSource={dishes} renderItem={(dishItem) => (
                    <List.Item>
                        <div style={{fontWeight: 'bold'}}>{dishItem?.name || 'Loading...'} x{dishItem?.quantity || 'Loading...'}</div>
                        <div>${dishItem?.price || 'Loading...'}</div>
                    </List.Item>
                )} />
                <Divider />
                <div style={styles.totalSumContainer}>
                    <h2>Total:</h2>
                    <h2 style={styles.totalPrice}>${order?.total?.toFixed(2) || 'Loading...'}</h2>
                </div>
                <Divider />
                <div style={styles.buttonsContainer}>
                    <Button block type={'danger'} size={'large'} style={styles.button}>
                        Decline Order
                    </Button>
                    <Button block type={'primary'} size={'large'} style={styles.button}>
                        Accept Order
                    </Button>
                </div>
                <Button block color={'green'} type={'primary'} size={'large'}>
                    Food Is Done
                </Button>
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
