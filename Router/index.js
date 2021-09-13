import React, { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import firebase from 'firebase'

import AuthStack from './navigation/AuthStack'
import AppStack from './navigation/AppStack'
import { AuthContext } from './navigation/AuthProvider'

export default function index() {
    const [initializing, setInitializing] = useState(true);
    const {user, setUser} = useContext(AuthContext);
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    return (
        <NavigationContainer>
            {user ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    )
}
