import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, TextInput, FlatList, ImageBackground, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { data, category } from './data';
import firebase from 'firebase';
import { AuthContext } from '../Router/navigation/AuthProvider';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
export default function HomePage({ navigation }) {

    const { user } = useContext(AuthContext);
    const [recomendation, setrecomendation] = useState([])
    const [refresh, setrefresh] = useState(true)

    useEffect(() => {
        if (!refresh) return;
        getDataRecomendation();
    }, [refresh])

    const getDataRecomendation = () => {
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
            .then((result) => {
                setrecomendation(result.data.meals[0])
                setrefresh(false)
            })
    }

    if (refresh) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    barStyle="dark-content"
                />
                <View style={{ backgroundColor: "#FFF4E1", height: 10 }}>
                </View>
                <View style={styles.header}>
                    <Text style={{ fontSize: 18 }}>Hai, {user.displayName}</Text>
                    <Text style={styles.subContentHeader}>What do you want to eat today?</Text>

                    <TouchableOpacity onPress={() => goSearchPage()}>
                        <View style={styles.searchBox}>
                            <AntDesign name="search1" size={24} color="#A4330D" style={{ marginLeft: 11, paddingTop: 1 }} />
                            <TextInput style={styles.searchHeader} placeholder={"Pasta"} editable={false} />
                        </View>
                    </TouchableOpacity>

                </View>

                <Text style={{ marginTop: 12, paddingHorizontal: 26, fontSize: 18 }}>Recomendation For You</Text>

                <View style={{ justifyContent: "space-around"}}>
                    <View style={{ alignItems: "center", marginTop: 40 }}>
                        <Image
                            source={require('../assets/icon/loading.gif')}
                            style={{ marginBottom: 10, width: 30, height: 30 }}
                        />
                        <Text>Loading Data</Text>

                    </View>
                    <Text style={{ marginTop: windowHeight * 0.29898, paddingHorizontal: 26, fontSize: 18 }}>Explore Our Category</Text>

                    <FlatList
                        data={category}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ alignItems: "center", marginTop: 12, marginLeft: 28 }}>
                                    <TouchableOpacity onPress={() => categoryPressed(item)}>
                                        <ImageBackground
                                            source={item.image}
                                            style={styles.categoryImage}
                                            imageStyle={{ borderRadius: 20 }}
                                        >
                                            <View style={styles.categoryContent}>
                                                <View style={styles.categoryContentBox}>
                                                    <Text style={styles.categoryText}>{item.category}</Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}

                    />

                </View>

            </View>

        )
    }

    const categoryPressed = (item) => {
        console.log(item);
        navigation.navigate("CategoryPage", { item });
    }

    const goSearchPage = () => {
        console.log("goto searchpage");
        navigation.push('SearchPage');
    }

    const detailsMenu = (value) => {
        console.log("goto detailpage");
        navigation.navigate('DetailsPage', { value });
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle="dark-content"
            />
            <View style={{ backgroundColor: "#FFF4E1", height: 10 }}>
            </View>
            <View style={styles.header}>
                <Text style={{ fontSize: 18 }}>Hai, {user.displayName}</Text>
                <Text style={styles.subContentHeader}>What do you want to eat today?</Text>

                <TouchableOpacity onPress={() => goSearchPage()}>
                    <View style={styles.searchBox}>
                        <AntDesign name="search1" size={24} color="#A4330D" style={{ marginLeft: 11, paddingTop: 1 }} />
                        <TextInput style={styles.searchHeader} placeholder={"Pasta"} editable={false} />
                    </View>
                </TouchableOpacity>

            </View>

            <View style={styles.recomendationHeader}>
                <Text style={{ marginTop: 12, paddingHorizontal: 26, fontSize: 18 }}>Recomendation For You</Text>
                <TouchableOpacity onPress={() => setrefresh(true)}>
                    <SimpleLineIcons name="refresh" size={24} color="black" style={{ marginTop: 12, paddingHorizontal: 26 }} />
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center" }}>
                <View style={styles.recomendationBox}>
                    <TouchableOpacity onPress={() => detailsMenu(recomendation)}>
                        <ImageBackground
                            source={{ uri: recomendation.strMealThumb }}
                            imageStyle={{ borderRadius: 20 }}
                            style={styles.recomendationImage}
                        >
                            <Image
                                source={require('../assets/icon/star.png')}
                                style={{ width: 30, height: 30, alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
                            />
                            <View style={styles.recomendationInfoBox}>
                                <View style={styles.recomendationContent}>
                                    <Text style={{ textDecorationLine: "underline", fontWeight: "bold", fontSize: 14, opacity: 1 }}>{recomendation.strMeal}</Text>
                                    <Text style={{ color: "grey", fontSize: 10, fontWeight: "bold", opacity: 1 }}>{recomendation.strArea}, {recomendation.strCategory}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={{ marginTop: 12, paddingHorizontal: 26, fontSize: 18 }}>Explore Our Category</Text>

            <FlatList
                data={category}
                keyExtractor={(item) => item.id}
                horizontal={true}
                renderItem={({ item }) => {
                    return (
                        <View style={{ alignItems: "center", marginTop: 12, marginLeft: 28 }}>
                            <TouchableOpacity onPress={() => categoryPressed(item)}>
                                <ImageBackground
                                    source={item.image}
                                    style={styles.categoryImage}
                                    imageStyle={{ borderRadius: 20 }}
                                >
                                    <View style={styles.categoryContent}>
                                        <View style={styles.categoryContentBox}>
                                            <Text style={styles.categoryText}>{item.category}</Text>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
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
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30
    },
    subContentHeader: {
        color: "grey",
        fontSize: 13
    },
    searchBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "#A9A9A9",
        borderRadius: 20,
        paddingVertical: 8,
        marginTop: 9,
        backgroundColor: "white"
    },
    searchHeader: {
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 18,
        textAlignVertical: "top",

    },
    recomendationHeader: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    recomendationBox: {
        alignItems: "center",
        marginLeft: 26,
    },
    recomendationImage: {
        width: 260,
        height: 280,
        borderRadius: 15,
        marginTop: 12,
        marginRight: 12
    },
    recomendationInfoBox: {
        height: "100%",
        justifyContent: "flex-end",
        marginHorizontal: 10
    },
    recomendationContent: {
        marginBottom: 50,
        backgroundColor: "#FFF4E1",
        paddingHorizontal: 10,
        paddingVertical: 13,
        borderRadius: 10,
        opacity: 0.75
    },
    categoryImage: {
        width: 120,
        height: 120,
        opacity: 0.8
    },
    categoryContent: {
        flex: 1,
        justifyContent: "center"
    },
    categoryText: {
        fontSize: 18,
        color: "#A4330D",
        fontWeight: "bold"
    },
    categoryContentBox: {
        backgroundColor: "#FFF4E1",
        width: "100%",
        alignItems: "center",
        paddingVertical: 8
    }
})
