import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {AntDesign, FontAwesome} from "@expo/vector-icons";

const DEFAULT_IMAGE = 'https://images.squarespace-cdn.com/content/v1/55802029e4b08f4843c44d82/1467318800746-ARA77WKJVJZ0JWN26O0V/-%C2%ACShawna_Stanley_2015-110.JPG?format=2500w';

const RestaurantHeader = ({restaurant}) => {

    if(!restaurant) {
        // Loading indicator
        return (
            <View className="items-center justify-center h-screen -mt-16">
                <Text className="text-lg text-gray-500">Loading...</Text>
            </View>
        )
    }

    return (
        <>
            <Image className="w-[100%]" style={{aspectRatio: 9 / 5}} source={{uri: restaurant?.image.startsWith('http') ? restaurant?.image : DEFAULT_IMAGE}}/>

            <View className="mx-4 mt-5">
                <Text className="text-3xl font-[600] text-gray-900">{restaurant?.name}</Text>
                <View className="flex-row items-center space-x-1 mt-1">
                    <Text className="text-gray-500 text-[15px]">${(restaurant?.deliveryFee).toFixed(2)}</Text>
                    <Text className="text-gray-500 text-[15px]">•</Text>
                    <Text className="text-gray-500 text-[15px]">{(restaurant?.rating).toFixed(1)}</Text>
                    <FontAwesome name="star" style={{marginVertical: 6}} size={17} color="#ffaa00" />
                </View>
            </View>
            <View className="border-b border-gray-300 border mt-5"/>
            <View>
                <Text className="text-lg font-[600] text-gray-600 mx-4 mt-2">Menu</Text>
            </View>
            </>
    );
};

export default RestaurantHeader;
