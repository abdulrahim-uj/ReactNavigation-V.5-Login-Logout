import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main_Tab_Screen from './src/components/screeners/MainTabScreen';
import { DrawerContent } from './src/components/screeners/DrawerContent';
import Bookmark_Screen from './src/components/screeners/BookmarkScreen';
import Settings_Screen from './src/components/screeners/SettingsScreen';
import Support_Screen from './src/components/screeners/SupportScreen';
import RootStack_Screen from './src/components/screeners/RootStackScreen';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from './src/components/Context';


const Drawer = createDrawerNavigator();



const App = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const authContext = React.useMemo(() => ({
        fnSignIn: () => {
            setUserToken('sdf');
            setIsLoading(false);
        },
        fnSignUp: () => {
            setUserToken('sdf');
            setIsLoading(false);
        },
        fnSignOut: () => {
            setUserToken(null);
            setIsLoading(false);
        },
    }));

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => {
            cleanup
        }
    }, [])

    if (isLoading) {
        return(
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return(
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                { userToken != null ? (
                    <Drawer.Navigator drawerContent= { props => <DrawerContent { ...props } /> } >
                        <Drawer.Screen 
                            name="HomeDrawer"
                            component={Main_Tab_Screen}
                        />
                        <Drawer.Screen 
                            name="Bookmark"
                            component={Bookmark_Screen}
                        />
                        <Drawer.Screen 
                            name="Setting"
                            component={Settings_Screen}
                        />
                        <Drawer.Screen 
                            name="Supporter"
                            component={Support_Screen}
                        />
                    </Drawer.Navigator>
                    )
                :
                    <RootStack_Screen />
                }
                {/*  */}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

export default App;

