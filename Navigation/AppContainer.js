import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import React from 'react';
import colors from '../colors/colors'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import {
    View,
    Text,
    Image
} from 'react-native'
import { Icon } from 'react-native-elements';
import Login from '../Screens/Authentication/Login'
import Signup from '../Screens/Authentication/Signup'
import ForgotPassword from '../Screens/Authentication/ForgotPassword'
import Home from '../Screens/Home/Home'
import Products from '../Screens/Home/Products'
import Orders from '../Screens/Home/Orders'
import Profile from '../Screens/Profile/Profile'
import About from '../Screens/Profile/About'
import SellerAccount from '../Screens/Profile/SellerAcount'
import { TouchableOpacity } from 'react-native-gesture-handler';

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
    },
    Signup: {
        screen: Signup,
    },
    ForgotPassword: {
        screen: ForgotPassword,
    },
}, {
    initialRouteName: 'Login'
}
);
const HomeStack = createStackNavigator({
    Home: {
        screen: Home
    },
    Orders: {
        screen: Orders,
    },
    Products: {
        screen: Products,
    },

}, {
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerTitleStyle: {
                color: '#fff'
            },
            headerStyle: {
                backgroundColor: colors.red
            },
            headerLeft: () =>
                <Icon iconStyle={{ padding: 10, color: '#fff' }} name='ios-menu' type='ionicon' onPress={() => navigation.toggleDrawer()} />
            ,
            headerRight: () =>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProfileStack')}
                >
                    <Image
                        source={require('../Images/shopIcon.png')}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 100,
                            marginRight: 10,
                        }}
                    />
                </TouchableOpacity>
        }
    }
}
);

const ProfileStack = createStackNavigator({
    Profile: {
        screen: Profile
    },
    SellerAccount: {
        screen: SellerAccount
    },
    About: {
        screen: About
    }
},
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                headerTitleStyle: {
                    color: colors.white,
                },
                headerStyle: {
                    backgroundColor: colors.red
                },
                headerLeft: () =>
                    <Icon
                        iconStyle={{ padding: 10, color: '#fff' }}
                        name='ios-arrow-back'
                        type='ionicon'
                        size={20}
                        onPress={() => navigation.goBack(null)} />
            }
        }
    })
const DrawerComponent = (props) => {
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 200,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.red
                }}
            >
                <Image
                    source={require('../Images/shopIcon.png')}
                    resizeMode='cover'
                    style={{
                        marginRight: 10,
                        width: 100,
                        height: 100,
                        borderRadius: 50
                    }}
                />
                <View>
                    <View
                        style={{ margin: 5 }}
                    >
                        <Text
                            style={{
                                color: colors.white,
                                fontWeight: 'bold',
                                fontSize: 16
                            }}
                        >
                            Seller ID:
                        </Text>
                        <Text
                            style={{
                                color: colors.white,
                                fontSize: 16
                            }}
                        >
                            PK1234
                        </Text>
                    </View>
                    <View style={{ margin: 5 }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: colors.white,
                                fontSize: 16
                            }}
                        >
                            Shop Name:
                        </Text>
                        <Text
                            style={{
                                color: colors.white,
                                fontSize: 16
                            }}>
                            ABD Shop
                        </Text>
                    </View>
                </View>
            </View>
            <DrawerItems
                activeTintColor={colors.red}
                {...props} />
        </View>);
}
const homeNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
    },
    Feedback: {
        screen: HomeStack,
    },
    About: {
        screen: HomeStack,
    },
    Logout: {
        screen: HomeStack,
    },
    ProfileStack: {
        screen: ProfileStack,
        navigationOptions: {
            drawerLabel: () => null
        }
    }
}, {
    contentComponent: DrawerComponent

}
);


const switchNavigator = createSwitchNavigator({
    Authentication: { screen: AuthStack },
    ProfileStack: ProfileStack,
    drawerNavigator: { screen: homeNavigator },
})
export default createAppContainer(switchNavigator);