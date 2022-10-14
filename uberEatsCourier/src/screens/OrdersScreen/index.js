import React, {useMemo, useRef} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
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
            <MapView style={{}} showsUserLocation followsUserLocatio className="h-full w-full" >
                {orders.map((marker, index) => (
                    <Marker key={index} title={'Something in here'}
                            description={'This is a marker'} coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }} >
                        <Entypo name="shop" size={24} color="green" />
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
