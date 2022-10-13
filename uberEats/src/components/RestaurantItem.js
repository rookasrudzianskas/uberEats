import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";

const DEFAULT_IMAGE = 'https://images.squarespace-cdn.com/content/v1/55802029e4b08f4843c44d82/1467318800746-ARA77WKJVJZ0JWN26O0V/-%C2%ACShawna_Stanley_2015-110.JPG?format=2500w';

const RestaurantCard = ({restaurant}) => {
    const navigation = useNavigation();
    const [clicked, setClicked] = useState(false);
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Restaurant', {
            id: restaurant.id
        })} activeOpacity={0.7} className="my-2 bg-gray-100 p-2 rounded">
            <Image className="w-full h-56 relative" source={{uri: restaurant?.image.startsWith('http') ? restaurant?.image : DEFAULT_IMAGE}}/>
            <TouchableOpacity onPress={() => setClicked(!clicked)} activeOpacity={0.7} className="absolute top-5 right-4">
                {clicked ? <AntDesign name="hearto" size={20} color="white" /> : <AntDesign name="heart" size={20} color="red" />}
            </TouchableOpacity>
            <View className="flex-row mt-2 justify-between">
                <View className="space-y-1">
                    <Text className="text-gray-900 font-[600] text-[18px]">{restaurant?.name}</Text>
                    <View className="flex-row items-center">
                        <Text className="text-gray-400 text-[15px]">{(restaurant?.deliveryFee).toFixed(1)}</Text>
                        <Text className="text-gray-400 text-[15px]"> • </Text>
                        <Text className="text-gray-400 text-[15px]">{restaurant?.minDeliveryTime} - {restaurant?.maxDeliveryTime} min</Text>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-full items-center justify-center h-8 w-8 m-2">
                    <Text className="font-[600] text-gray-700">{(restaurant?.rating).toFixed(1)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default RestaurantCard;
