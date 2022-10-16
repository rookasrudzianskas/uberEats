import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {DataStore} from "aws-amplify";
import {Courier, Order} from "../../models";
import {FontAwesome5} from "@expo/vector-icons";

const OrderLiveUpdates = ({id}) => {
    const [order, setOrder] = useState(null);
    const [courier, setCourier] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        DataStore.query(Order, id).then(setOrder);
    }, []);

    useEffect(() => {
        if(order?.orderCourierId) {
            DataStore.query(Courier, order.orderCourierId).then(setCourier);
        }
    }, [order]);

    useEffect(() => {
        if(courier?.lng && courier?.lat) {
            mapRef.current.animateToRegion({
                latitude: courier?.lat,
                longitude: courier?.lng,
                latitudeDelta: 0.007,
                longitudeDelta: 0.007
            })
        }
    }, [courier?.lng, courier?.lat]);

    useEffect(() => {
        if(!courier) return;
        const subscription = DataStore.observe(Courier, courier.id).subscribe((msg) => {
            if(msg.opType === 'UPDATE') {
                setCourier(msg.element);
            }
        });
        return () => subscription.unsubscribe();
    }, []);


    return (
        <View>
            <Text className="text-center text-xl bg-transparent py-1 font-semibold">Status: {order?.status || 'Loading...'}</Text>
            <MapView showsUserLocation={true} ref={mapRef} className="h-full w-full" >
                {courier?.lat && (
                    <Marker
                        coordinate={{
                            latitude: courier?.lat,
                            longitude: courier?.lng,
                        }}
                    >
                        <TouchableOpacity activeOpacity={0.7} className="bg-green-500 rounded-full w-10 h-10 items-center justify-center">
                            <FontAwesome5 name="motorcycle" size={22} color={"white"} />
                        </TouchableOpacity>
                    </Marker>
                )}
            </MapView>
        </View>
    );
};

export default OrderLiveUpdates;
