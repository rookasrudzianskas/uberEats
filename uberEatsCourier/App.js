import { StatusBar } from 'expo-status-bar';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import OrderDelivery from "./src/screens/OrderDelivery";
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./src/navigation";

export default function App() {

    return (
        <NavigationContainer>
            <Navigation />
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

