import { StatusBar } from 'expo-status-bar';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import OrderDelivery from "./src/screens/OrderDelivery";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

    return (
        <View className="">
            <NavigationContainer>
                <OrderDelivery />
                <StatusBar style="auto" />
            </NavigationContainer>
        </View>
    );
}

