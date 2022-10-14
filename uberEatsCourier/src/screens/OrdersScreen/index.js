import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";
import orders from '../../assets/data/orders.json';
import OrderItem from "../../components/OrderItem";
import MapView, {Marker} from "react-native-maps";
import {Entypo} from "@expo/vector-icons";

const OrdersScreen = () => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["12%", "95%"], []);

    return (
        <View className="bg-gray-100 h-screen">
            {/* showsUserLocation followsUserLocation TODO can be added as well. */}
            <MapView
                style={{}} showsUserLocation followsUserLocatio className="h-full w-full" >
                {orders.map((order, index) => (
                    <Marker key={index} title={order?.Restaurant?.name}
                            description={order?.Restaurant?.address} coordinate={{
                        // latitude: 37.78825,
                        // longitude: -122.4324,
                        latitude: order?.Restaurant?.lat,
                        longitude: order?.Restaurant?.lng,
                    }} >
                        <TouchableOpacity activeOpacity={0.7} className="bg-green-500 p-1 rounded-full">
                            <Entypo name="shop" size={22} color="white" />
                        </TouchableOpacity>
                    </Marker>
                ))}
            </MapView>
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
