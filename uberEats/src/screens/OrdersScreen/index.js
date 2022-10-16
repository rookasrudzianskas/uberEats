import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import OrderListItem from "../../components/OrderListItem";
import {useOrderContext} from "../../contexts/OrderContext";


const OrdersScreen = () => {
    // const restaurant = restaurants[0].dishes;
    const { orders } = useOrderContext();
    console.log(orders);
    return (
        <View>
            <FlatList
                data={orders} renderItem={({item}) => (
                <OrderListItem order={item}/>
            )}/>
        </View>
    );
};

export default OrdersScreen;
