import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import restaurants from '../../assets/data/restaurants.json';
import OrderDetailsHeader from "./index";
import BasketDishItem from "../../components/BasketDishItem";
import {useOrderContext} from "../../contexts/OrderContext";
import {useRoute} from "@react-navigation/native";

const OrderDetails = () => {
    const {getOrder} = useOrderContext();
    const route = useRoute();
    const id = route.params?.id;
    const [order, setOrder] = useState(null);
    useEffect(() => {
        getOrder(id).then(setOrder);
    }, []);

    if(!order) {
        return (
            <View className="items-center justify-center h-screen -mt-16">
                <Text className="text-xl mb-4 font-bold text-gray-900">Orders are loading 😅</Text>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }
    return (
        <View>
            <FlatList
                ListHeaderComponent={() => (
                    <OrderDetailsHeader order={order} />
                )}
                showsVerticalScrollIndicator={false}
                data={order.dishes} renderItem={({item}) => (
                <View className="mx-4">
                    <BasketDishItem basketDish={item} />
                </View>
            )} />
        </View>
    );
};

export default OrderDetails;
