import React from 'react';
import {Button, Card, Descriptions, Divider, List} from "antd";
import dishes from "../assets/data/dashboard/dishes.json";

const DetailedOrder = ({}) => {
    return (
        <div>
            <Card title={'Order Title'} style={{margin: 20}}>
                <Descriptions bordered column={{lg: 1, md: 1, sm: 1}}>
                    <Descriptions.Item label={'Customer'}>Rokas Rudzianskas</Descriptions.Item>
                    <Descriptions.Item label={'Customer Address'}>Address 16, Nutella Street</Descriptions.Item>
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
                    <h2 style={styles.totalPrice}>$45.45</h2>
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
