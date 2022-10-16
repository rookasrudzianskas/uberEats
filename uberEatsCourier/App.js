import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./src/navigation";
import "react-native-gesture-handler";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {withAuthenticator} from "aws-amplify-react-native/src/Auth";
import AuthContextProvider from "./src/contexts/AuthContext";
import OrderContextProvider from "./src/contexts/OrderContext";
import {LogBox} from "react-native";

LogBox.ignoreLogs(['Setting a timer']);

Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    }
});

const App = () => {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
                <AuthContextProvider>
                    <OrderContextProvider>
                        <Navigation />
                    </OrderContextProvider>
                </AuthContextProvider>
                <StatusBar style="auto" />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default withAuthenticator(App);
