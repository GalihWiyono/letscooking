import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, Alert, Dimensions } from 'react-native'
import firebase from 'firebase'
import { AuthContext } from '../Router/navigation/AuthProvider'
import { FontAwesome5 } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
export default function userPage({ navigation }) {

    const { logout } = useContext(AuthContext)
    const [user, setuser] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [phone, setphone] = useState("")

    const signOut = () => {
        logout();
    }

    useEffect(() => {
        if (!isLoading) return;
        getUser()
    }, [])

    const goAboutDev = () => {
        navigation.push("AboutDevPage");
    }


    const getUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setuser(user)
                console.log(user);
                if (!user.phoneNumber) {
                    setphone("-")
                }
                setisLoading(false)
            } else {
                console.log("No User");
            }
        });
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image
                    source={require('../assets/icon/loading.gif')}
                    style={{ marginBottom: 10, width: 30, height: 30 }}
                />
                <Text>Loading Data</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle="dark-content"
            />
            <View style={{ backgroundColor: "#FFF4E1", height: 20 }}>
            </View>
            <View style={styles.header}>
                <Text style={{ fontSize: 18 }}>User Settings</Text>
                <Text style={styles.subContentHeader}>Customize Your Account</Text>
            </View>
            <View style={styles.contentContainer}>

                <View style={styles.infoContainer}>
                    <View style={styles.infoData}>
                        <Text style={{ fontSize: 12, color: "grey" }}>Display Name</Text>
                        <Text style={{ fontSize: 16, marginBottom: 8 }}>{user.displayName}</Text>
                        <Text style={{ fontSize: 12, color: "grey" }}>Email Address</Text>
                        <Text numberOfLines={1} ellipsizeMode={"tail"} style={{ fontSize: 16, marginBottom: 8 }}>{user.email}</Text>
                        <Text style={{ fontSize: 12, color: "grey" }}>Phone Number</Text>
                        <Text style={{ fontSize: 16, marginBottom: 5 }}>{phone}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => Alert.alert("Warning!", "Feature Is Under Development")}>
                    <View style={styles.btnCustomize}>
                        <Text style={{ fontSize: 18, color: "#A4330D" }}>Customize Account</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.separator} />

                <View style={styles.meetDeveloper}>
                    <Text>Meet The Developer?</Text>
                    <TouchableOpacity onPress={ () => goAboutDev()}>
                        <Text style={{ color: "#A4330D" }}> Click Me!</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => signOut()}>
                    <View style={styles.btnSignOut}>
                        <Text style={{ fontSize: 18, color: "#FFF4E1" }}>Logout</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.version}>Version 1.0.2</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnSignOut: {
        paddingHorizontal: 80,
        paddingVertical: 10,
        backgroundColor: "#A4330D",
        borderWidth: 1,
        borderColor: "#A4330D",
        borderRadius: 20,
    },
    header: {
        backgroundColor: "#FFF4E1",
        paddingVertical: 24,
        paddingHorizontal: 26,
    },
    subContentHeader: {
        color: "grey",
        fontSize: 13
    },
    contentContainer: {
        alignItems: "center"
    },
    version: {
        marginTop: 10,
        color: "grey",
        fontSize: 14
    },
    infoContainer: {
        flexDirection: "row",
        marginVertical: 30,
        borderWidth: 3,
        borderColor: "#A4330D",
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 15,
        width: "80%",
    },
    infoData: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 10
    },
    btnCustomize: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#A4330D",
        backgroundColor: "#FFF4E1",
        paddingHorizontal: 30,
        paddingVertical: 10
    },
    separator: {
        marginVertical: windowHeight * 0.1
    },
    meetDeveloper: {
        flexDirection: "row",
        marginBottom: 25
    }
})
