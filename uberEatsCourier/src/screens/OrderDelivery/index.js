import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import orders from "../../assets/data/orders.json";
import {AntDesign, Entypo, FontAwesome, Ionicons} from "@expo/vector-icons";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useOrderContext} from "../../contexts/OrderContext";
import BottomSheetDetails from "./BottomSheetDetails";
import Index from "../../components/CustomMarker";
import {DataStore} from "aws-amplify";
import {Courier} from "../../models";
import {useAuthContext} from "../../contexts/AuthContext";

const GOOGLE_MAPS_APIKEY = 'AIzaSyDo6743znNCjibvfor86BXmOr84tJM_H4s';

const OrderDelivery = () => {
    const { order, user, dishes, acceptOrder, fetchOrder, completeOrder, pickUpOrder } = useOrderContext();
    const {dbCourier} = useAuthContext();
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const [driverLocation, setDriverLocation] = useState(null);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [totalKm, setTotalKm] = useState(0);
    const route = useRoute();
    const id = route.params?.id;

    useEffect(() => {
        fetchOrder(id);
    }, [id]);

    useEffect(() => {
        if(!driverLocation) return;
        DataStore.save(Courier.copyOf(dbCourier, (updated) => {
            updated.lat = driverLocation.latitude;
            updated.lng = driverLocation.longitude;
        }));
    }, [driverLocation]);

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
           distanceInterval: 500,
        }, (updatedLocation) => {
            setDriverLocation({
                latitude: updatedLocation.coords.latitude,
                longitude: updatedLocation.coords.longitude,
            })
        });
        return () => foregroundSubscription;

    }, []);

    const zoomInOnDriver = () => {
        mapRef.current.animateToRegion({
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    }

    const restaurantLocation = {
        latitude: order?.Restaurant?.lat,
        longitude: order?.Restaurant?.lng,
    };
    const deliveryLocation = {
        latitude: user?.lat,
        longitude: user?.lng,
    };

    if(!driverLocation || !order || !user) {
        return (
            <View className="bg-gray-100 h-screen justify-center items-center">
                <ActivityIndicator />
            </View>
        )
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
                    destination={order?.status === "ACCEPTED" ? restaurantLocation : deliveryLocation}
                    apikey={GOOGLE_MAPS_APIKEY}
                    waypoints={order?.status === "READY_FOR_PICKUP" ? [restaurantLocation] : []}
                    onReady={(result) => {
                        setTotalMinutes(result.duration);
                        setTotalKm(result.distance);
                    }}
                    strokeWidth={5}
                    strokeColor="#1aa260"
                />
                <Index
                    data={order.Restaurant}
                    type={'RESTAURANT'}
                />

                <Index
                    data={user}
                    type={'USER'}
                />
                {orders.map((order, index) => (
                    <Marker key={index} title={order?.Restaurant?.name}
                            description={order?.Restaurant?.address} coordinate={{
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

            <BottomSheetDetails totalKm={totalKm} totalMinutes={totalMinutes} onAccepted={zoomInOnDriver} />

        </View>
    );
};

export default OrderDelivery;
