import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import orders from './src/assets/data/orders.json';

export default function App() {
    return (
        <View className="">
            <View>
                <Text className="text-lg mt-10 font-bold">{orders[0]?.Restaurant?.name}</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

