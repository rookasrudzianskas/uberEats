import { StatusBar } from 'expo-status-bar';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import OrderDelivery from "./src/screens/OrderDelivery";
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./src/navigation";
import "react-native-gesture-handler";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function App() {

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
                <Navigation />
                <StatusBar style="auto" />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

