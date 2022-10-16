import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Entypo} from "@expo/vector-icons";
import {Marker} from "react-native-maps";

const CustomMarker = ({data, type}) => {
    return (
        <Marker
            coordinate={{latitude: data?.lat, longitude: data?.lng}}
            title={data?.name}
            description={data?.address}
        >
            <TouchableOpacity activeOpacity={0.7} className="bg-green-500 p-1 rounded-full">
                {type === "RESTAURANT" ? (
                    <Entypo name="shop" size={22} color="white" />
                ) : (
                    <Entypo name="home" size={22} color="white" />
                )}
            </TouchableOpacity>
        </Marker>
    );
};

export default CustomMarker;
