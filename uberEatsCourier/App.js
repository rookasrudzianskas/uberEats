import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import orders from './src/assets/data/orders.json';
import {Entypo} from "@expo/vector-icons";
import OrderItem from "./src/components/OrderItem";

export default function App() {
    const order = orders[0];

    return (
        <View className="mt-10 mx-4">
            <OrderItem order={order} />
            <StatusBar style="auto" />
        </View>
    );
}

