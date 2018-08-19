/** @format */

import {AppRegistry} from 'react-native';
import Posts from './src/Screens/Posts';
import Albums from './src/Screens/Albums';
import Photos from './src/Screens/Photos';
import Comments from './src/Screens/Comments';
import Users from './src/Screens/Users';
import Todos from './src/Screens/Todos';
import {name as appName} from './app.json';
import UserDetails from './src/Screens/UserDetails';
import {createStackNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation';
import React from 'react';
import {Icon} from "native-base";

const BottomTabNavigator = createBottomTabNavigator(
    {
        Posts: {
            screen: Posts
        },
        Albums: {
            screen: Albums
        },
        Users: {
            screen: Users
        }
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Posts') {
                    iconName = `ios-paper${focused ? '' : '-outline'}`;
                } else if (routeName === 'Albums') {
                    iconName = `ios-albums${focused ? '' : '-outline'}`;
                }
                else if (routeName === 'Users') {
                    iconName = `ios-contacts${focused ? '' : '-outline'}`;
                }
                return <Icon name={iconName}/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#007aff',   //blue
            inactiveTintColor: 'gray',
        },
    }
);

const RootStack = createStackNavigator(
    {
        Main: BottomTabNavigator,
        Posts: Posts,
        Comments: Comments,
        Albums: Albums,
        Photos: Photos,
        Users: Users,
        UserDetails: UserDetails,
        Todos: Todos
    },
    {
        initialRouteName: 'Main',
    },
);
AppRegistry.registerComponent(appName, () => RootStack);
