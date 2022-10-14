import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";
import orders from "../../assets/data/orders.json";
import OrderItem from "../../components/OrderItem";
import {Entypo, FontAwesome, Ionicons} from "@expo/vector-icons";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_APIKEY = 'AIzaSyDo6743znNCjibvfor86BXmOr84tJM_H4s';

const OrderDelivery = () => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["12%", "95%"], []);
    const order = orders[0];
    const [driverLocation, setDriverLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (!status === 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync();
            setDriverLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);

    if(!driverLocation) {
        return (
            <View className="bg-gray-100 h-screen justify-center items-center">
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <View className="bg-gray-100 h-screen">
            <MapView
                initialRegion={{
                    latitude: driverLocation?.latitude,
                    longitude: driverLocation?.longitude,
                    latitudeDelta: 0.07,
                    longitudeDelta: 0.07,
                }}
                style={{}} showsUserLocation followsUserLocatio className="h-full w-full" >
                <MapViewDirections
                    origin={driverLocation}
                    destination={{
                        latitude: order?.User?.lat,
                        longitude: order?.User?.lng,
                    }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    waypoints={[{latitude: order?.Restaurant?.lat, longitude: order?.Restaurant?.lng}]}
                    strokeWidth={5}
                    strokeColor="#1aa260"
                />
                <Marker
                    coordinate={{latitude: order?.Restaurant?.lat, longitude: order?.Restaurant?.lng}}
                    title={order?.Restaurant?.name}
                    description={order?.Restaurant?.address}
                >
                    <TouchableOpacity activeOpacity={0.7} className="bg-red-500 p-1 rounded-full">
                        <Entypo name="shop" size={22} color="white" />
                    </TouchableOpacity>
                </Marker>
                <Marker
                    coordinate={{latitude: order?.User?.lat, longitude: order?.User?.lng}}
                    title={order?.User?.name}
                    description={order?.User?.address}
                >
                    <TouchableOpacity activeOpacity={0.7} className="bg-blue-500 p-1 rounded-full">
                        <Entypo name="home" size={22} color="white" />
                    </TouchableOpacity>
                </Marker>
                {orders.map((order, index) => (
                    <Marker key={index} title={order?.Restaurant?.name}
                            description={order?.Restaurant?.address} coordinate={{
                        // latitude: 37.78825,
                        // longitude: -122.4324,
                        latitude: order?.Restaurant?.lat,
                        longitude: order?.Restaurant?.lng,
                    }}
                    >
                        <TouchableOpacity activeOpacity={0.7} className="bg-green-500 p-1 rounded-full">
                            <Entypo name="shop" size={22} color="white" />
                        </TouchableOpacity>
                    </Marker>
                ))}
            </MapView>
            <BottomSheet handleIndicatorStyle={{backgroundColor: 'grey', width: 100}} ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
                <View className="">
                    <View className="flex-row items-center justify-center mt-4 mb-6 mx-4 space-x-1">
                        <Text className="text-[19px] text-gray-900 font-[500]">14 min</Text>
                        <Ionicons name="basket" size={27} color="green" />
                        <Text className="text-[19px] text-gray-900 font-[500]">3.087 km</Text>
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

                <View className="mx-4 mt-80">
                    <TouchableOpacity activeOpacity={0.7} className="mb-10 rounded-lg bg-green-400 w-full py-3 items-center justify-center">
                        <Text className="text-lg text-white font-bold">Accept Order</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </View>
    );
};

export default OrderDelivery;
