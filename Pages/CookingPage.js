import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, ImageBackground, Dimensions, TouchableOpacity, FlatList, ScrollView, Linking, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { data } from './data';
import { MaterialIcons } from '@expo/vector-icons';



const windowHeight = Dimensions.get('window').height;

export default function DetailsPage({ route, navigation }) {
    const { value } = route.params;

    useEffect(() => {
        console.log(value);
    }, [])

    const goBackHome = () => {
        navigation.goBack();
    }

    const openYtb = (link) => {
        if(link) {
            Linking.openURL(value.strYoutube)
        } else {
            Alert.alert("","Video Not Available")
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
            />

            <ImageBackground
                source={{ uri: value.strMealThumb }}
                style={styles.imageThumbnail}
            >
                <View style={styles.overlay} />
                <TouchableOpacity onPress={() => goBackHome()}>
                    <Ionicons name="arrow-back" size={30} color="black" style={{ marginHorizontal: 15, marginTop: 35 }} />
                </TouchableOpacity>

            </ImageBackground>

            <View style={styles.contentContainer}>
                <View style={styles.content}>
                    <View style={styles.headerContent}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ textDecorationLine: "underline", fontSize: 24, fontWeight: "bold", marginBottom: 10, width: "95%" }}>{value.strMeal}</Text>
                    </View>
                </View>

                <View style={styles.ingredientTitle}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Instructions</Text>
                    <MaterialIcons name="menu-book" size={28} color="black" style={{ marginLeft: 10 }} />
                </View>

                <View style={styles.ingredientContainer}>
                    <ScrollView>
                        <Text>{value.strInstructions}</Text>
                    </ScrollView>
                </View>

                <View style={styles.letsCooking}>
                    <TouchableOpacity onPress={()=> openYtb(value.strYoutube)}>
                        <Text style={{ color: "#FFF4E1", fontSize: 16 }}>Watch Video</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF4E1"
    },
    imageThumbnail: {
        width: "100%",
        height: windowHeight * 0.2
    },
    contentContainer: {
        justifyContent: "flex-end",
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        backgroundColor: "#FFF4E1",
        marginTop: -40
    },
    content: {
        paddingTop: 30,
        paddingHorizontal: 24
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    ingredientContainer: {
        marginHorizontal: 24,
        height: windowHeight * 0.6,
        marginTop: 10
    },
    ingredientContent: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    ingredientTitle: {
        paddingHorizontal: 24,
        flexDirection: "row"
    },
    letsCooking: {
        borderWidth: 1,
        alignSelf: "center",
        paddingHorizontal: 35,
        marginVertical: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#A4330D",
        borderColor: "#A4330D"
    },
    dotBorder: {
        borderBottomColor: "black",
        borderWidth: 1,
        borderStyle: 'dotted',
        borderRadius: 0.1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.4
    }
})
