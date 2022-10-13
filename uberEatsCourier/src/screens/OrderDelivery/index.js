import React, {useMemo, useRef} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";
import orders from "../../assets/data/orders.json";
import OrderItem from "../../components/OrderItem";
import {Ionicons} from "@expo/vector-icons";

const OrderDelivery = () => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["12%", "95%"], []);

    return (
        <View className="bg-gray-100 h-screen">
            <BottomSheet handleIndicatorStyle={{backgroundColor: 'grey', width: 100}} ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
                <View className="">
                    <View className="flex-row items-center justify-center mt-3 mb-6 mx-4 space-x-1">
                        <Text className="text-[19px] text-gray-900 font-[500]">14 min</Text>
                        <Ionicons name="basket" size={27} color="green" />
                        <Text className="text-[19px] text-gray-900 font-[500]">3.087 km</Text>
                    </View>
                    <View className="border-b border-gray-300 border-[2px]"/>
                    <View>
                        <Text>El Cabo Coffe Bar Tres De Mayo</Text>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
};

export default OrderDelivery;
