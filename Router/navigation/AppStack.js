import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import HomePage from '../../Pages/HomePage'
import BookmarkPage from '../../Pages/BookmarkPage'
import CategoryPage from '../../Pages/CategoryPage'
import userPage from '../../Pages/userPage'
import SearchPage from '../../Pages/SearchPage'
import DetailsPage from '../../Pages/DetailsPage'
import CookingPage from '../../Pages/CookingPage'
import AboutDevPage from '../../Pages/AboutDevPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainApps" component={MainApps} options={{ headerShown: false }} />
            <Stack.Screen name="SearchPage" component={SearchPage} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryPage" component={CategoryPage} options={{
                title: "Category", headerStyle: {
                    backgroundColor: '#FFF4E1',
                }, headerTitleStyle: {
                    color: "#A4330D",
                    fontWeight: "bold"
                }, headerTintColor: "#A4330D",
            }} />
            <Stack.Screen name="DetailsPage" component={DetailsPage} options={{ headerShown: false }} />
            <Stack.Screen name="CookingPage" component={CookingPage} options={{ headerShown: false }} />
            <Stack.Screen name="userPage" component={userPage} options={{ headerShown: false }} />
            <Stack.Screen name="AboutDevPage" component={AboutDevPage} options={{ headerShown: false }} />
        </Stack.Navigator>
    )

}

const MainApps = () => (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: () => {
            let iconName;

            if (route.name === 'HomePage') {
                iconName = 'home'
            } else if (route.name === 'BookmarkPage') {
                iconName = 'bookmark-multiple'
            } else if (route.name === 'userPage') {
                return <FontAwesome name="user" size={24} color={"#A4330D"} />
            }

            // You can return any component that you like here!
            return <MaterialCommunityIcons name={iconName} size={24} color={"#A4330D"} />
        },
        headerShown: false,
        tabBarStyle: {
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            backgroundColor: "#FFF4E1"
        },
        tabBarShowLabel: false
    })}>
        <Tab.Screen name="HomePage" component={HomePage} />
        <Tab.Screen name="BookmarkPage" component={BookmarkPage} />
        <Tab.Screen name="userPage" component={userPage} />
    </Tab.Navigator>
)



const styles = StyleSheet.create({})
