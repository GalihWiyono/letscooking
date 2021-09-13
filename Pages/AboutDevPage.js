import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, ImageBackground, Dimensions, TouchableOpacity, Alert, Linking } from 'react-native'

const windowHeight = Dimensions.get('window').height;
export default function AboutDevPage({navigation}) {

    const goHome = () => {
        navigation.navigate('MainApps')
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle="dark-content"
            />
            <View style={{ backgroundColor: "#FFF4E1", height: 20 }} />

            <View style={styles.header}>
                <Text style={{ fontSize: 18 }}>About Dev</Text>
            </View>

            <View style={styles.heroImgContainer}>
                <Image
                    source={require('../assets/aboutdev.png')}
                    style={styles.heroImg}
                />
            </View>

            <View style={styles.separator} />

            <View style={styles.textBio}>
                <Text style={styles.textBioTitle}>About Me</Text>
                <Text style={styles.textBioContent}>Hello there, im MochaLattea or you can call me Galih(realname). I'm a college student who likes to have fun with something related to IT. Nice to meet you...</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.textBio}>
                <Text style={styles.textBioTitle}>About This App</Text>
                <Text style={styles.textBioContent}>I made this application to fulfill my final task (bootcamp), but in the future I might develop it further. </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.textBio}>
                <Text style={styles.textBioTitle}>Contact Me</Text>

                <View style={styles.contactMeDataContainer}>
                    <Image
                        source={require('../assets/icon/ig.png')}
                        style={{ width: 40, height: 40 }}
                    />
                    <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/lih22_")}
                        style={{ marginTop: 5 }}
                    >
                        <Text style={styles.contactMeText}>@Lih22_</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contactMeDataContainer}>
                    <Image
                        source={require('../assets/icon/email.png')}
                        style={{ width: 40, height: 40 }}
                    />
                    <TouchableOpacity onPress={() => Linking.openURL("mailto:galihputra2201@gmail.com")}
                        style={{ marginTop: 5 }}
                    >
                        <Text style={styles.contactMeText}>galihputra2201@gmail.com</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity onPress={() => goHome()}>
                <View style={styles.backBtn}>
                    <Text style={{ fontWeight: "bold", color: "#A4330D" }}>BACK TO HOME</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    heroImgContainer: {
        alignItems: "center",
    },
    heroImg: {
        marginVertical: 20,
        height: windowHeight * 0.2,
        width: "85%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "grey"
    },
    separator: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 0.001,
        borderStyle: 'dotted',
        width: "85%",
        alignSelf: "center"
    },
    textBio: {
        width: "85%",
        alignSelf: "center"
    },
    contactMeDataContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    textBioTitle: {
        fontWeight: "bold",
        marginVertical: 8,
        fontSize: 18
    },
    textBioContent: {
        textAlign: "justify",
        marginBottom: 13,
        fontSize: 14
    },
    contactMeText: {
        marginHorizontal: 13,
        fontSize: 16,
        textAlignVertical: "center",
        marginBottom: 5
    },
    backBtn: {
        alignItems: "center",
        marginTop: 25,
    }
})
