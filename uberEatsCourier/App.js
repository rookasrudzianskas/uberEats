import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./src/navigation";
import "react-native-gesture-handler";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const App = () => {

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
                <Navigation />
                <StatusBar style="auto" />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default App;
