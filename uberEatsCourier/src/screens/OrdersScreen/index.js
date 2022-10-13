import React, {useMemo, useRef} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";
import orders from '../../assets/data/orders.json';
import OrderItem from "../../components/OrderItem";

const OrdersScreen = () => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["12%", "95%"], []);

    return (
        <View className="bg-gray-100 h-screen">
            <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
                <View className="items-center">
                    <Text className="text-xl font-[500] text-gray-900 mt-1">You're Online</Text>
                    <Text className="text-sm text-gray-400">Available Nearby Orders: {orders.length}</Text>
                </View>
                <View className="mx-4 mt-12">
                    <FlatList data={orders}
                              keyExtractor={item => item.id}
                              renderItem={({item}) => (
                        <OrderItem order={item} />
                    )} />
                </View>
            </BottomSheet>
        </View>
    );
};

export default OrdersScreen;
