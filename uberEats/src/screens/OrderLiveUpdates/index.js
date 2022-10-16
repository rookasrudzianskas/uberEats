import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {DataStore} from "aws-amplify";
import {Courier, Order} from "../../models";
import {FontAwesome5} from "@expo/vector-icons";

const OrderLiveUpdates = ({id}) => {
    const [order, setOrder] = useState(null);
    const [courier, setCourier] = useState(null);

    useEffect(() => {
        DataStore.query(Order, id).then(setOrder);
    }, []);

    useEffect(() => {
        if(order?.orderCourierId) {
            DataStore.query(Courier, order.orderCourierId).then(setCourier);
        }
    }, [order]);


    return (
        <View>
            <Text className="text-center text-xl bg-transparent py-1 font-semibold">Status: {order?.status || 'Loading...'}</Text>
            <MapView className="h-full w-full" >
                {courier?.lat && (
                    <Marker
                        coordinate={{
                            latitude: courier?.lat,
                            longitude: courier?.lng,
                        }}
                    >
                        <FontAwesome5 name="motorcycle" size={24} color={"black"} />
                    </Marker>
                )}
            </MapView>
        </View>
    );
};

export default OrderLiveUpdates;
