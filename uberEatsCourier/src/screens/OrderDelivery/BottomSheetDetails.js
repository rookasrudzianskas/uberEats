import React, {useMemo, useRef} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import {useOrderContext} from "../../contexts/OrderContext";


const BottomSheetDetails = (props) => {
    const {totalKm, totalMinutes} = props;
    const isDriverClose = totalKm <= 1; // decrease for higher accuracy
    const { order, user, dishes, acceptOrder, completeOrder, pickUpOrder } = useOrderContext();
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["12%", "95%"], []);

    const onButtonPressed = async () => {
        if (order?.status === "READY_FOR_PICKUP") {
            bottomSheetRef.current?.collapse();
            mapRef.current.animateToRegion({
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            acceptOrder();
        }
        if (order?.status === "ACCEPTED") {
            bottomSheetRef.current?.collapse();
            pickUpOrder();
        }
        if (order?.status === "PICKED_UP") {
            await completeOrder();
            bottomSheetRef.current?.collapse();
            navigation.goBack();
            console.warn('Order Delivered');
        }
    }

    const renderButtonTitle = () => {
        if(order.status === "READY_FOR_PICKUP") {
            return 'Accept Order';
        }
        if(order.status === "ACCEPTED") {
            return 'Pick Up Order';
        }
        if(order.status === "PICKED_UP") {
            return 'Drop Off Order';
        }
    }

    const isButtonDisabled = () => {
        if(order.status === "READY_FOR_PICKUP") {
            return false;
        }
        if(order.status === "ACCEPTED" && isDriverClose) {
            return false;
        }
        if(order.status === "PICKED_UP" && isDriverClose) {
            return false;
        }
        return true;
    }


    return (
        <BottomSheet className="relative" handleIndicatorStyle={{backgroundColor: 'grey', width: 100}} ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
            <View className="">
                <View className="flex-row items-center justify-center mt-4 mb-6 mx-4 space-x-1">
                    <Text className="text-[19px] text-gray-900 font-[500]">{totalMinutes.toFixed(0) || 'Loading ...'} min</Text>
                    <Ionicons name="basket" size={27} color="green" />
                    <Text className="text-[19px] text-gray-900 font-[500]">{totalKm.toFixed(0) || 'Loading..'} km</Text>
                </View>
                <View className="border-b border-gray-300 mt-5 border-[1px]"/>
                <View className="mx-4">
                    <Text className="text-2xl text-gray-900 font-[500] mt-8">{order?.Restaurant?.name}</Text>
                    <View className="mt-4 space-y-4">
                        <View className="flex-row items-center space-x-3">
                            <FontAwesome name="building-o" size={24} color="gray" />
                            <Text className="text-[20px] text-gray-600 font-[400]">{order?.Restaurant?.address}</Text>
                        </View>
                        <View className="flex-row items-center space-x-3 pb-4">
                            <FontAwesome name="map-marker" size={24} color="gray" />
                            <Text className="text-[20px] text-gray-600 font-[400]">{user?.address}</Text>
                        </View>
                        <View className="border-b border-gray-300 border-[1px]"/>

                        <View className="space-y-1">
                            {dishes?.map((dish, index) => (
                                <Text key={index} className="text-[17px] font-[600] text-gray-500">{dish.Dish.name || 'Loading...'} x {dish.Dish.quantity || 'x1'}</Text>
                            ))}
                        </View>
                    </View>
                </View>
            </View>

            <View className="mx-4 mt-80">
                <TouchableOpacity disabled={isButtonDisabled()} onPress={onButtonPressed} activeOpacity={0.7} className={`mb-10 rounded-lg ${isButtonDisabled() ? 'bg-gray-200' : 'bg-green-400'} w-full py-3 items-center justify-center`}>
                    <Text className="text-lg text-white font-bold">{renderButtonTitle()}</Text>
                </TouchableOpacity>
            </View>

            {order?.status === "READY_FOR_PICKUP" && (
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="absolute top-1 left-4">
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            )}
        </BottomSheet>
    );
};

export default BottomSheetDetails;
