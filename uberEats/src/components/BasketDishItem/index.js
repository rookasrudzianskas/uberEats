import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const BasketDishItem = ({basketDish}) => {
    // console.log(basketDish);
    return (
        <TouchableOpacity className="flex-row items-center my-[4px]" activeOpacity={0.7}>
            <View className="flex-1 flex-row space-x-2 items-center">
                <View className="bg-gray-200 w-6 h-6 rounded-sm flex items-center justify-center">
                    <Text className="font-[500]">{basketDish?.quantity || 1}</Text>
                </View>
                <Text className="text-gray-900 font-[500]">{basketDish?.Dish?.name || 'Loading...'}</Text>
            </View>
            <Text className="text-gray-800 font-[500]">$ {basketDish?.Dish?.price}</Text>
        </TouchableOpacity>
    );
};

export default BasketDishItem;
