import React, {useMemo, useRef} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";
import orders from "../../assets/data/orders.json";
import OrderItem from "../../components/OrderItem";
import {FontAwesome, Ionicons} from "@expo/vector-icons";

const OrderDelivery = () => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["12%", "95%"], []);
    const order = orders[0];

    return (
        <View className="bg-gray-100 h-screen">
            <BottomSheet handleIndicatorStyle={{backgroundColor: 'grey', width: 100}} ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
                <View className="flex-1">
                    <View className="flex-row items-center justify-center mt-3 mb-6 mx-4 space-x-1">
                        <Text className="text-[19px] text-gray-900 font-[500]">14 min</Text>
                        <Ionicons name="basket" size={27} color="green" />
                        <Text className="text-[19px] text-gray-900 font-[500]">3.087 km</Text>
                    </View>
                    <View className="border-b border-gray-300 mt-5 border-[2px]"/>
                    <View className="mx-4">
                        <Text className="text-2xl text-gray-900 font-[500] mt-8">{order?.Restaurant?.name}</Text>
                        <View className="mt-4 space-y-4">
                            <View className="flex-row items-center space-x-3">
                                <FontAwesome name="building-o" size={24} color="gray" />
                                <Text className="text-[20px] text-gray-600 font-[400]">{order?.Restaurant?.address}</Text>
                            </View>
                            <View className="flex-row items-center space-x-3 pb-4">
                                <FontAwesome name="map-marker" size={24} color="gray" />
                                <Text className="text-[20px] text-gray-600 font-[400]">{order?.User?.address}</Text>
                            </View>
                            <View className="border-b border-gray-300 border-[1px]"/>

                            <View className="space-y-1">
                                <Text className="text-[17px] font-[600] text-gray-500">Onion Rings x1</Text>
                                <Text className="text-[17px] font-[600] text-gray-500">Big Mac x2</Text>
                                <Text className="text-[17px] font-[600] text-gray-500">Big Tasty x1</Text>
                                <Text className="text-[17px] font-[600] text-gray-500">Coca Cola x4</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mx-4">
                    <TouchableOpacity activeOpacity={0.7} className="mb-10 rounded-lg bg-green-400 w-full py-3 items-center justify-center">
                        <Text className="text-lg text-white font-bold">Accept Order</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </View>
    );
};

export default OrderDelivery;
