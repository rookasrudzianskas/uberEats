import { StatusBar } from 'expo-status-bar';
import {View} from 'react-native';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "./src/navigation";
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import {withAuthenticator} from "aws-amplify-react-native/src/Auth";
import AuthContextProvider from "./src/contexts/AuthContext";
import BasketContextProvider from "./src/contexts/BasketContext";
import OrderContext from "./src/contexts/OrderContext";
import OrderContextProvider from "./src/contexts/OrderContext";

Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    }
});

LogBox.ignoreLogs(['SplashScreen.show']);
LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.']);

const App = () => {
    return (
            <NavigationContainer>
                <AuthContextProvider>
                    <BasketContextProvider>
                        <OrderContextProvider>
                            <View className="h-screen">
                                {/*<HomeTabs />*/}
                                <RootNavigator />
                                <StatusBar style="auto" />
                            </View>
                        </OrderContextProvider>
                    </BasketContextProvider>
                </AuthContextProvider>
            </NavigationContainer>

    );
}

export default withAuthenticator(App);
