// create context
import {createContext, useContext, useEffect, useState} from "react";
import {Auth, DataStore} from "aws-amplify";
import {Courier, User} from "../models";

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(null);
    const [dbCourier, setDbCourier] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Auth.currentAuthenticatedUser({bypassCache: true}).then(setAuthUser);
    }, []);

    const sub = authUser?.attributes?.sub;

    useEffect(() => {
        if(!sub) return;
        DataStore.query(Courier, (courier) => courier.sub('eq', sub)).then((couriers) => {
            setDbCourier(couriers[0]);
            setLoading(false);
        });
    }, [sub]);

    useEffect(() => {
        if(!dbCourier) return;
        const subscription = DataStore.observe(Courier, dbCourier.id).subscribe((msg) => {
                if(msg.opType === "UPDATE") {
                    setDbCourier(msg.element);
                }
            }
        );
        return () => subscription.unsubscribe();
    }, [dbCourier])

    return (
        <AuthContext.Provider value={{
            authUser,
            dbCourier,
            sub,
            setDbCourier,
            loading,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

export const useAuthContext = () => {
    return useContext(AuthContext);
}
