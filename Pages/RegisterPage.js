
import React, { useContext, useState } from 'react'
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import firebase from 'firebase';
import { AuthContext } from '../Router/navigation/AuthProvider';

export default function RegisterPage({ navigation }) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const [displayName, setDisplayName] = useState("")

    const { register } = useContext(AuthContext)

    const registerAcc = () => {
        register(email, password, displayName);
    }

    const gotoLogin = () => {
        navigation.navigate("LoginPage");
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: "#FFF4E1" }}>
            <ScrollView>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    barStyle="dark-content"
                />
                <Image
                    style={styles.appsLogo}
                    source={require('../assets/appsLogo.png')}
                />

                <Text style={styles.loginText}>Register</Text>

                <View style={styles.dotBorder}>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Display Name</Text>
                    <TextInput style={styles.inputTextBox}
                        placeholder={"Enter Your Display Name"}
                        value={displayName}
                        onChangeText={(value) => setDisplayName(value)} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput style={styles.inputTextBox}
                        placeholder={"Enter Your Email Address"}
                        value={email}
                        onChangeText={(value) => setemail(value)} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput style={styles.inputTextBox} secureTextEntry
                        placeholder={"Enter Your Password"}
                        value={password}
                        onChangeText={(value) => setpassword(value)} />
                </View>

                <View style={styles.button}>
                    <TouchableOpacity style={styles.buttonStyleRegister} onPress={() => registerAcc()} >
                        <Text style={{ color: "#FFF4E1" }}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyleLogin} onPress={() => gotoLogin()} >
                        <Text style={{ color: "#A4330D" }}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF4E1",
    },
    appsLogo: {
        alignSelf: "center",
        marginTop: 70,
        width: 120,
        height: 100
    },
    loginText: {
        marginTop: 32,
        fontSize: 30,
        textAlign: "center"
    },
    dotBorder: {
        borderBottomColor: "black",
        width: "80%",
        borderWidth: 1,
        marginTop: 16,
        borderStyle: 'dotted',
        borderRadius: 0.1,
        alignSelf: "center"
    },
    inputContainer: {
        marginTop: 15,
        paddingHorizontal: 38
    },
    inputTitle: {
        fontSize: 18
    },
    inputTextBox: {
        borderWidth: 1,
        borderColor: "#A4330D",
        borderRadius: 10,
        marginTop: 7,
        paddingVertical: 5,
        paddingHorizontal: 10,

    },
    forgetPassword: {
        marginTop: 9,
        color: "#A4330D",
        alignSelf: "flex-end",
        fontSize: 14
    },
    button: {
        marginTop: 50,
        alignItems: "center",
    },
    buttonStyleRegister: {
        paddingHorizontal: 85,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#A4330D",
        borderColor: "#A4330D"
    },
    buttonStyleLogin: {
        marginTop: 15,
        paddingVertical: 8,
        paddingHorizontal: 90,
        borderWidth: 1,
        borderColor: "#A4330D",
        borderRadius: 10,
    }
})
