import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./src/navigation";
import "react-native-gesture-handler";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {withAuthenticator} from "aws-amplify-react-native/src/Auth";

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
                <Navigation />
                <StatusBar style="auto" />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default withAuthenticator(App);
