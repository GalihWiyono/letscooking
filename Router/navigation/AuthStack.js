import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LoginPage from '../../Pages/LoginPage'
import RegisterPage from '../../Pages/RegisterPage'

const Stack = createStackNavigator();
export default function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
