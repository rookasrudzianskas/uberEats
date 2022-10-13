import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import orders from './src/assets/data/orders.json';
import {Entypo} from "@expo/vector-icons";

export default function App() {
    const order = orders[0];

    return (
        <View className="mt-10 mx-4">
            <TouchableOpacity activeOpacity={0.7} className="flex-row items-center border border-[2px] border-green-500 rounded-lg">
                <View className="flex-1 flex-row">
                    <Image source={{uri: order?.Restaurant?.image}} style={{}} className="w-20 m-1 rounded-lg" />
                    <View className="px-3 py-3">
                        <Text className="text-lg font-bold max-w-[200px]" style={{lineHeight: 25}}>{order?.Restaurant?.name}</Text>
                        <Text className="text-sm text-gray-500">{order?.Restaurant?.address}</Text>
                        <Text className="text-[15px] font-[600] mt-[4px]">Delivery Details:</Text>

                        <Text className="text-sm text-gray-500 mt-[2px]">{order?.User?.name}</Text>
                        <Text className="text-sm text-gray-500">{order?.User?.address}</Text>
                    </View>
                </View>
                <View className="bg-green-500 h-full flex-row px-2 items-center justify-center">
                    <Entypo name="check" size={30} color="white" />
                </View>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

