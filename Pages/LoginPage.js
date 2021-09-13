import React, { useContext, useState } from 'react'
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { AuthContext } from '../Router/navigation/AuthProvider';

export default function LoginPage({ navigation }) {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const { login , LoginError } = useContext(AuthContext);

    const gotoRegister = () => {
        navigation.navigate("RegisterPage");
    }

    const loginAccount = () => {
        login(email, password)
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

                <Text style={styles.loginText}>LOGIN</Text>

                <View style={styles.dotBorder}>
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

                    <TouchableOpacity onPress={() => Alert.alert("Warning!", "Feature Is Under Development")}>
                        <Text style={styles.forgetPassword}>Forget Password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity style={styles.buttonStyleLogin} onPress={() => loginAccount()} >
                        <Text style={{ color: "#FFF4E1" }}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyleRegister} onPress={() => gotoRegister()} >
                        <Text style={{ color: "#A4330D" }}>Register</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
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
        marginTop: 60,
        alignItems: "center",
    },
    buttonStyleLogin: {
        paddingHorizontal: 90,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#A4330D",
        borderColor: "#A4330D"
    },
    buttonStyleRegister: {
        marginTop: 15,
        paddingVertical: 8,
        paddingHorizontal: 85,
        borderWidth: 1,
        borderColor: "#A4330D",
        borderRadius: 10,
    }
})
