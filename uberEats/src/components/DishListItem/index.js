import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const DishListItem = ({dish}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Dish', {id: dish.id})} activeOpacity={0.7} className="flex-row justify-between items-center mx-4 border-b border-gray-300 py-5">
            <View className=" space-y-2">
                <Text className="text-[17px] tracking-wide font-[600] text-gray-900">
                    {dish?.name}
                </Text>
                <Text className={`text-gray-600 ${dish.image && "max-w-[300px]"}`}>{dish?.description}</Text>
                <Text className="text-[16px] text-gray-900 font-[6500]">${dish?.price}</Text>
            </View>
            {dish.image && (
                <View>
                    <Image className="w-20 h-20 rounded-md" source={{uri: dish?.image}} />
                </View>
            )}
        </TouchableOpacity>
    );
};

export default DishListItem;
