import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, ImageBackground, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';

const windowHeight = Dimensions.get('window').height;

export default function DetailsPage({ route, navigation }) {
    const db = firebase.firestore();
    const { value } = route.params;
    const [tags, settags] = useState("-")
    const [ingredient, setingredient] = useState([])
    const [user, setuser] = useState()
    const [bookmarked, setbookmarked] = useState()
    const [activeBookmark, setactiveBookmark] = useState(false)
    const [docIdBookmark, setdocIdBookmark] = useState()

    useEffect(() => {
        if (value.strTags) {
            settags(value.strTags)
        }
        getUserData();
        getIngredient();
    }, [])

    const goBackHome = () => {
        navigation.goBack();
    }

    const getUserData = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setuser(user)
                console.log(user.uid);
                checkUserBookmark(user.uid);
            } else {
                console.log("No User");
            }
        });
    }

    const checkUserBookmark = (userId) => {
        db.collection("bookmark").where("idMeal", "==", value.idMeal).where("userId", "==", userId)
            .get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    console.log("data ada");
                    querySnapshot.forEach((item) => {
                        setdocIdBookmark(item.id)
                    })
                    setbookmarked(require('../assets/icon/active_bookmark.png'))
                    setactiveBookmark(true)
                } else {
                    setbookmarked(require('../assets/icon/inactive_bookmark.png'))
                    setactiveBookmark(false)
                }
            });
    }

    const startCooking = () => {
        console.log("goto Cooking");
        navigation.push("CookingPage", { value })
    }

    const bookmarkClick = (data) => {
        if (activeBookmark == true) {
            db.collection("bookmark").doc(docIdBookmark).delete().then(() => {
                console.log("Document successfully deleted from bookmark!");
                setactiveBookmark(false);
                setbookmarked(require('../assets/icon/inactive_bookmark.png'))
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        } else {
            db.collection("bookmark").add({
                idMeal: data.idMeal,
                strMeal: data.strMeal,
                userId: user.uid,
            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    setdocIdBookmark(docRef.id)
                    db.collection("bookmark").doc(docRef.id).update({
                        docId: docRef.id
                    })
                        .then(() => {
                            console.log("Document successfully updated!");
                            setbookmarked(require('../assets/icon/active_bookmark.png'))
                            setactiveBookmark(true)
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    }

    const getIngredient = () => {
        const data = []
        var i = 0;
        for (i = 1; i <= 20; i++) {
            var ingre = "strIngredient" + i
            var measure = "strMeasure" + i
            if (value[ingre] != "" && value[ingre] != null) {
                data.push(
                    {
                        id: i.toString(),
                        ingredient: value[ingre],
                        measure: value[measure]
                    }
                )
            }
        }

        console.log(data);
        setingredient(data)
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

                <TouchableOpacity onPress={() => goBackHome()}>
                    <Ionicons name="arrow-back" size={30} color="black" style={{ marginHorizontal: 15, marginTop: 35 }} />
                </TouchableOpacity>

            </ImageBackground>

            <View style={styles.contentContainer}>
                <View style={styles.content}>
                    <View style={styles.headerContent}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ textDecorationLine: "underline", fontSize: 24, fontWeight: "bold", marginBottom: 10, width: "85%" }}>{value.strMeal}</Text>
                        <TouchableOpacity onPress={() => bookmarkClick(value)}>
                            <Image
                                source={bookmarked}
                                style={{ width: 25, height: 35 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tags}>
                        <MaterialCommunityIcons name="chef-hat" size={24} color="black" />
                        <Text style={styles.tagText}>{value.strArea}</Text>
                    </View>

                    <View style={styles.tags}>
                        <Image
                            source={require('../assets/icon/cover-food.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.tagText}>{value.strCategory}</Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <FontAwesome name="tags" size={23} color="black" />
                        <Text style={styles.tagText}>{tags}</Text>
                    </View>
                </View>

                <View style={styles.ingredientTitle}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ingredient</Text>
                    <MaterialCommunityIcons name="book-open-page-variant" size={28} color="black" style={{ marginLeft: 10 }} />
                </View>

                <View style={{ maxHeight: windowHeight * 0.33 }}>
                    <FlatList
                        data={ingredient}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.ingredientContainer}>
                                    <View style={styles.ingredientContent}>
                                        <Text style={{ paddingVertical: 10 }}>{item.ingredient}</Text>
                                        <Text style={{ paddingVertical: 10 }}>{item.measure}</Text>
                                    </View>
                                    <View style={styles.dotBorder}>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>


                <View style={styles.letsCooking}>
                    <TouchableOpacity onPress={() => startCooking()}>
                        <Text style={{ color: "#FFF4E1", fontSize: 16 }}>Lets Cooking</Text>
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
        height: windowHeight * 0.35
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
    tags: {
        flexDirection: "row",
        marginBottom: 8
    },
    tagText: {
        marginLeft: 10,
        textAlignVertical: "center",
        fontSize: 14,
        fontWeight: "bold"
    },
    ingredientContainer: {
        marginHorizontal: 24
    },
    ingredientContent: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    ingredientTitle: {
        marginTop: 15,
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
    }
})
