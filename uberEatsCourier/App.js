import { StatusBar } from 'expo-status-bar';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import orders from './src/assets/data/orders.json';
import {Entypo} from "@expo/vector-icons";
import OrderItem from "./src/components/OrderItem";
import OrdersScreen from "./src/screens/OrdersScreen";
import OrderDelivery from "./src/screens/OrderDelivery";

export default function App() {

    return (
        <View className="">
            {/*<FlatList data={orders}*/}
            {/*          keyExtractor={item => item.id}*/}
            {/*          renderItem={({item}) => (*/}
            {/*    <OrderItem order={item} />*/}
            {/*)} />*/}
            {/*<OrdersScreen />*/}
            <OrderDelivery />
            <StatusBar style="auto" />
        </View>
    );
}

