import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import firebase from 'firebase'
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/core';

export default function BookmarkPage({navigation}) {
    const db = firebase.firestore();
    const [bookmarkMenu, setbookmarkMenu] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [user, setuser] = useState()

    // useEffect(() => {
    //     if (!isLoading) return;
    //     getUserData();
    // }, [])

    const detailsMenu = (value) => {
        console.log("goto detailpage from bookmark");
        navigation.navigate('DetailsPage', { value });
    }

    useFocusEffect(
        useCallback(
            () => {
                if (!isLoading) return;
                getUserData();
            },
            [],
        )
    )

    const refreshFlatlist = useCallback(() => {
        if (!isLoading) return;
        getUserData()
    }, []);

    const getUserData = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.uid);
                setuser(user)
                getBookmark(user.uid)
            } else {
                console.log("No User");
            }
        });
    }

    const getBookmark = async (userId) => {
        let count = 1;
        const bookmarkData = []
        db.collection("bookmark").where("userId", "==", userId)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    let rawSize = querySnapshot.size;
                    querySnapshot.forEach((item) => {
                        console.log(item.data().idMeal);
                        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.data().idMeal}`)
                            .then((res) => {
                                const data = (res.data.meals[0])
                                bookmarkData.push(data)
                                if (count == rawSize) {
                                    setbookmarkMenu(bookmarkData)
                                    setisLoading(false)
                                } else {
                                    count++
                                    console.log(count);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                setisLoading(false)
                            })
                    })
                } else {
                    console.log("Bookmark Kosong");
                    setisLoading(false)
                    setbookmarkMenu([])
                }
            })
            .catch((error) => {
                console.log(error);
                setisLoading(false)
            })
    }

    const deleteBookmark = (id) => {
        db.collection("bookmark").where("idMeal", "==", id).where("userId", "==", user.uid)
            .get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        db.collection("bookmark").doc(doc.id).delete().then(() => {
                            console.log("Document successfully deleted from bookmark!");
                            refreshFlatlist();
                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                    });
                } else {
                    console.error("Data Not Found");
                }
            });
    }

    if (isLoading) {
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
                    <Text style={{ fontSize: 18 }}>Your Bookmark</Text>
                    <Text style={styles.subContentHeader}>Recook our recipe?</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image
                        source={require('../assets/icon/loading.gif')}
                        style={{ marginBottom: 10, width: 30, height: 30 }}
                    />
                    <Text>Loading Data</Text>
                </View>
            </View>
        )
    } else if (bookmarkMenu.length == 0) {
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
                    <Text style={{ fontSize: 18 }}>Your Bookmark</Text>
                    <Text style={styles.subContentHeader}>Recook our recipe?</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>No Bookmark Found</Text>
                </View>
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
                <Text style={{ fontSize: 18 }}>Your Bookmark</Text>
                <Text style={styles.subContentHeader}>Recook our recipe?</Text>
            </View>

            <FlatList
                data={bookmarkMenu}
                style={{ marginVertical: 17 }}
                extraData={isLoading}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => detailsMenu(item)}>
                            <View style={styles.bookmarkListContainer}>
                                <View style={styles.bookmarkListContent}>
                                    <Image
                                        source={{ uri: item.strMealThumb }}
                                        style={{ width: 50, height: 50, borderRadius: 10 }}
                                    />

                                    <View style={styles.bookmarkListContentText}>
                                        <Text style={{ textDecorationLine: "underline", fontWeight: "bold", fontSize: 14, opacity: 1 }}>{item.strMeal}</Text>
                                        <Text style={{ color: "grey", fontSize: 10, fontWeight: "bold", opacity: 1 }}>{item.strArea}, {item.strCategory}</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => deleteBookmark(item.idMeal)}>
                                        <Image
                                            source={require("../assets/icon/active_bookmark.png")}
                                            style={{ width: 30, height: 30, marginTop: 10 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}

            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    bookmarkListContainer: {
        marginBottom: 8,
        backgroundColor: "#FFF4E1",
        width: "95%",
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30
    },
    bookmarkListContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 17,
        paddingVertical: 17
    },
    bookmarkListContentText: {
        flex: 1,
        alignSelf: "flex-start",
        marginTop: 5,
        paddingLeft: 12
    }
})
