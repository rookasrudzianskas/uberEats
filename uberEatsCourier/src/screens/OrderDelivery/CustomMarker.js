import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Entypo} from "@expo/vector-icons";
import {Marker} from "react-native-maps";

const CustomMarker = ({}) => {
    return (
        <Marker
            coordinate={{latitude: order?.Restaurant?.lat, longitude: order?.Restaurant?.lng}}
            title={order?.Restaurant?.name}
            description={order?.Restaurant?.address}
        >
            <TouchableOpacity activeOpacity={0.7} className="bg-green-500 p-1 rounded-full">
                <Entypo name="shop" size={22} color="white" />
            </TouchableOpacity>
        </Marker>
    );
};

export default CustomMarker;
