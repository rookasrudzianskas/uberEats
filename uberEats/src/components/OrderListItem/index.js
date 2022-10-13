import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const OrderListItem = ({order}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Order', {id: order.id})} activeOpacity={0.7} className="mx-4 my-2 border-b border-gray-300 pb-3">
            <View className="flex-row items-center">
                <View>
                    <Image className="w-16 h-16 rounded-md" source={{uri: order?.Restaurant?.image }} />
                </View>
                <View className="ml-3">
                    <Text className="text-gray-900 text-lg font-[600]">{order?.Restaurant?.name}</Text>
                    <Text className="text-gray-500 mb-1">3 items • <Text>$38.65</Text></Text>
                    <Text className="text-gray-500 text-sm">{order?.createdAt} • <Text className="font-[600]">{order?.status}</Text></Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default OrderListItem;
