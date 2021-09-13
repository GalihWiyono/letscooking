import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { data } from './data';
import axios from 'axios';


export default function SearchPage({ navigation }) {

    const [focus, setfocus] = useState(false)
    const [searchData, setsearchData] = useState([]);
    const [searchKeyword, setsearchKeyword] = useState("")
    const [returnRecipe, setreturnRecipe] = useState(true)
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
        setfocus(true)
    }, [focus])

    const getSearchData = () => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKeyword}`)
            .then((res) => {
                const data = (res.data.meals)
                setsearchData(data)
                console.log(data);
            }).catch((err) => {
                console.error(err);
            })
    }

    

    const goBackHome = () => {
        navigation.goBack();
    }

    const detailsMenu = (value) => {
        console.log("goto detailpage");
        navigation.push('DetailsPage', { value });
    }

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "#FFF4E1", height: 30 }}>
            </View>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle="dark-content"
            />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBackHome()}>
                    <Ionicons name="arrow-back" size={30} color="#A4330D" style={{ marginHorizontal: 15, marginTop: 5 }} />
                </TouchableOpacity>
                <View style={styles.searchBar}>
                    <TextInput style={styles.searchHeader} placeholder={"Pasta"} autoFocus={true} ref={inputRef} value={searchKeyword} onChangeText={(value) => setsearchKeyword(value)} />
                    <TouchableOpacity onPress={() => getSearchData()}>
                        <Ionicons name="search-circle-sharp" size={40} color="#A4330D" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={searchData}
                style={{ marginTop: 17 }}
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
                                        <Text numberOfLines={1} ellipsizeMode={"tail"} style={{ textDecorationLine: "underline", fontWeight: "bold", fontSize: 14, opacity: 1, width: "85%" }}>{item.strMeal}</Text>
                                        <Text style={{ color: "grey", fontSize: 10, fontWeight: "bold", opacity: 1 }}>{item.strArea}, {item.strCategory}</Text>
                                    </View>
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
        paddingVertical: 20,
        flexDirection: "row",
        backgroundColor: "#FFF4E1"
    },
    searchHeader: {
        flex: 1,
        paddingHorizontal: 18,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#A4330D",
        borderRadius: 20,
        paddingVertical: 5,
        marginRight: 15,
        backgroundColor: "white"
    },
    searchBar: {
        flexDirection: 'row',
        flex: 1,
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
