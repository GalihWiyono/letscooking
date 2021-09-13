import React, { createContext, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import firebase from 'firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        firebase.auth().signInWithEmailAndPassword(email, password)
                            .then((res) => {
                            })
                            .catch((err) => {
                                return (
                                    <View>
                                        {Alert.alert("Login Failed", err + "")}
                                    </View>
                                )
                            })

                    } catch (error) {
                        console.log(error);
                    }
                    return
                },
                register: async (email, password, displayName) => {
                    try {
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then((res) => {
                                firebase.auth().currentUser.updateProfile({
                                    displayName
                                })
                            })
                            .catch((err) => {
                                return (
                                    <View>
                                        {Alert.alert("Register Failed", err + "")}
                                    </View>
                                )
                            })
                    } catch (error) {
                        console.log(error);
                    }
                },
                logout: async () => {
                    try {
                        await firebase.auth().signOut()
                    } catch (error) {
                        console.log(error);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
