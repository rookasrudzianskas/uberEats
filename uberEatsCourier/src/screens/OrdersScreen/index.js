import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, FlatList} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import OrderItem from "../../components/OrderItem";
import MapView, {Marker} from "react-native-maps";
import {Entypo} from "@expo/vector-icons";
import {DataStore} from "aws-amplify";
import {Order} from "../../models";
import CustomMarker from "../../components/CustomMarker";
import * as Location from "expo-location";

const OrdersScreen = () => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["12%", "95%"], []);
    const [orders, setOrders] = useState([]);
    const [driverLocation, setDriverLocation] = useState(null);

    const fetchOrders = () => {
        DataStore.query(Order, (order) => order.status('eq', "READY_FOR_PICKUP")).then(setOrders);
    }

    useEffect(() => {
        // query DataStore model Order and then set Orders state
        fetchOrders();
        const subscription = DataStore.observe(Order).subscribe((msg) => {
            if(msg.opType === "UPDATE") {
                fetchOrders();
            }
        });
        return () => subscription.unsubscribe();
    }, []);

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
            {/* showsUserLocation followsUserLocation TODO can be added as well. */}
            <MapView
                initialRegion={{
                    latitude: driverLocation?.latitude,
                    longitude: driverLocation?.longitude,
                    latitudeDelta: 0.07,
                    longitudeDelta: 0.07,
                }}
                style={{}} showsUserLocation followsUserLocatio className="h-full w-full" >
                {orders.map((order, index) => (
                    <CustomMarker data={order?.Restaurant} type={"RESTAURANT"} key={order?.id}/>
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
