import { StatusBar } from 'expo-status-bar';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import orders from './src/assets/data/orders.json';
import {Entypo} from "@expo/vector-icons";
import OrderItem from "./src/components/OrderItem";

export default function App() {

    return (
        <View className="mt-10 mx-4">
            <FlatList data={orders}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => (
                <OrderItem order={item} />
            )} />
            <StatusBar style="auto" />
        </View>
    );
}

