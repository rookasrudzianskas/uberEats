import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";
import orders from "../../assets/data/orders.json";
import {AntDesign, Entypo, FontAwesome, Ionicons} from "@expo/vector-icons";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import {useNavigation} from "@react-navigation/native";

const GOOGLE_MAPS_APIKEY = 'AIzaSyDo6743znNCjibvfor86BXmOr84tJM_H4s';

const ORDER_STATUSES = {
    READY_FOR_PICKUP: 'READY_FOR_PICKUP',
    ACCEPTED: "ACCEPTED",
    PICKED_UP: 'PICKED_UP',
}

const restaurantLocation = {
    latitude: order?.Restaurant?.lat,
    longitude: order?.Restaurant?.lng,
};
const deliveryLocation = {
    latitude: order?.User?.lat,
    longitude: order?.User?.lng,
};

const OrderDelivery = () => {
    const [order, setOrder] = useState(null);
    const navigation = useNavigation();
    const bottomSheetRef = useRef(null);
    const mapRef = useRef(null);
    const snapPoints = useMemo(() => ["12%", "95%"], []);
    const [driverLocation, setDriverLocation] = useState(null);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [totalKm, setTotalKm] = useState(0);
    const [deliveryStatus, setDeliveryStatus] = useState(ORDER_STATUSES.READY_FOR_PICKUP);
    const [isDriverClose, setIsDriverClose] = useState(false);

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

        const foregroundSubscription = Location.watchPositionAsync({
           accuracy: Location.Accuracy.High,
           distanceInterval: 100,
        }, (updatedLocation) => {
            setDriverLocation({
                latitude: updatedLocation.coords.latitude,
                longitude: updatedLocation.coords.longitude,
            })
        });
        return () => foregroundSubscription;

    }, []);

    if(!driverLocation || !order) {
        return (
            <View className="bg-gray-100 h-screen justify-center items-center">
                <ActivityIndicator />
            </View>
        )
    }

    const onButtonPressed = () => {
        if(deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
            bottomSheetRef.current?.collapse();
            mapRef.current.animateToRegion({
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            setDeliveryStatus(ORDER_STATUSES.ACCEPTED);
        }
        if(deliveryStatus === ORDER_STATUSES.ACCEPTED) {
            bottomSheetRef.current?.collapse();
            setDeliveryStatus(ORDER_STATUSES.PICKED_UP);
        }
        if(deliveryStatus === ORDER_STATUSES.PICKED_UP) {
            bottomSheetRef.current?.collapse();
            navigation.goBack();
            console.warn('Order Delivered');
        }
    }

    const renderButtonTitle = () => {
        if(deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
            return 'Accept Order';
        }
        if(deliveryStatus === ORDER_STATUSES.ACCEPTED) {
            return 'Pick Up Order';
        }
        if(deliveryStatus === ORDER_STATUSES.PICKED_UP) {
            return 'Drop Off Order';
        }
    }

    const isButtonDisabled = () => {
        if(deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
            return false;
        }
        if(deliveryStatus === ORDER_STATUSES.ACCEPTED && isDriverClose) {
            return false;
        }
        if(deliveryStatus === ORDER_STATUSES.PICKED_UP && isDriverClose) {
            return false;
        }
        return true;
    }

    return (
        <View className="bg-gray-100 h-screen">
            <MapView
                ref={mapRef}
                initialRegion={{
                    latitude: driverLocation?.latitude,
                    longitude: driverLocation?.longitude,
                    latitudeDelta: 0.07,
                    longitudeDelta: 0.07,
                }}
                style={{}} showsUserLocation followsUserLocatio className="h-full w-full" >
                <MapViewDirections
                    origin={driverLocation}
                    destination={deliveryStatus === ORDER_STATUSES.ACCEPTED ? restaurantLocation : deliveryLocation}
                    apikey={GOOGLE_MAPS_APIKEY}
                    waypoints={deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP ? [restaurantLocation] : []}
                    onReady={(result) => {
                        if(result.distance <= 0.1) {
                            setIsDriverClose(result.distance <= 0.1); // should be good
                        }
                        setTotalMinutes(result.duration);
                        setTotalKm(result.distance);
                    }}
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
                    <TouchableOpacity disabled={isButtonDisabled()} onPress={onButtonPressed} activeOpacity={0.7} className={`mb-10 rounded-lg ${isButtonDisabled() ? 'bg-gray-200' : 'bg-green-400'} w-full py-3 items-center justify-center`}>
                        <Text className="text-lg text-white font-bold">{renderButtonTitle()}</Text>
                    </TouchableOpacity>
                </View>

                {deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP && (
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="absolute top-1 left-4">
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </BottomSheet>
        </View>
    );
};

export default OrderDelivery;
