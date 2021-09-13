import axios from 'axios';
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { FlatList, StyleSheet, Text, View, Image, StatusBar, TouchableOpacity } from 'react-native'
import { category } from './data'

export default function CategoryPage({ route, navigation }) {
    const { item } = route.params;
    const [categoryData, setcategoryData] = useState([]);
    const [isLoading, setisLoading] = useState(true)
    const [categorySelect, setcategorySelect] = useState("")

    useEffect(() => {
        if (!isLoading) return;
        getCategoryMenu(item.api, item.id);
        setcategorySelect(item.id)
    }, [])

    const getOtherCategory = useCallback( async (api, id) => {
        console.log("change category");
        console.log(api);
        setisLoading(true);
        setcategoryData([])
        setcategorySelect(id)
        if (!isLoading) return;
        getCategoryMenu(api, id);
    },[])

    const getCategoryMenu = async (api, id) => {
        const categoryMenu = []
        let count = 1;
        axios.get(api)
            .then((res) => {
                const rawData = (res.data.meals)
                rawData.forEach(item => {
                    console.log("item " + item.idMeal);
                    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`)
                        .then((res) => {
                            const data = (res.data.meals[0])
                            categoryMenu.push(data)
                            if (count == rawData.length) {
                                setcategoryData(categoryMenu)
                                setisLoading(false)
                            } else {
                                count++
                                console.log(count);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                });

            })
            .catch(err => {
                console.log(err);
            })
    }

    const categorySelected = (id) => {
        if (categorySelect == id) {
            return true
        }
        return false
    }

    const detailsMenu = (value) => {
        console.log("goto detailpage");
        navigation.navigate('DetailsPage', { value });
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
            <View style={styles.category}>
                <FlatList
                    data={category}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => getOtherCategory(item.api, item.id)}>
                                <View style={{ alignItems: "center", marginTop: 12, marginLeft: 28 }}>
                                    <View style={[
                                        (categorySelected(item.id) ? styles.selectedCategory : styles.categoryContentBox),
                                        styles.categoryContentBox]}>
                                        <Text style={styles.categoryText}>{item.category}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

            <View style={styles.categoryList}>
                <FlatList
                    data={categoryData}
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
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ textDecorationLine: "underline", fontWeight: "bold", fontSize: 14, opacity: 1, width: "95%" }}>{item.strMeal}</Text>
                                            <Text style={{ color: "grey", fontSize: 10, fontWeight: "bold", opacity: 1 }}>{item.strArea}, {item.strCategory}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    category: {
        marginTop: 10
    },
    categoryContentBox: {
        backgroundColor: "#FFF4E1",
        paddingHorizontal: 39,
        paddingVertical: 7,
        borderRadius: 10
    },
    categoryText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#A4330D"
    },
    categoryList: {
        marginTop: 15,
        marginBottom: 30
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
        paddingLeft: 12,
    },
    selectedCategory: {
        borderWidth: 1,
        borderColor: "#A4330D"
    }
})
