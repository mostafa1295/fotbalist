import React, { useEffect,useState } from 'react'
import { NativeBaseProvider, Text, Image, View, HStack, Box, Link, Spinner } from 'native-base'
import {  ScrollView, StatusBar,  TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native';

import Swiper from 'react-native-swiper'
import WebView from 'react-native-webview'
import axios from 'react-native-axios'
import AsyncStorage from "@react-native-async-storage/async-storage";




function HomeScreen({ navigation }) {

   


    let BaseUrl = 'https://mirimbazi.ir';
    const [Slider, setslider] = useState([]);
    const [Comment, setComment] = useState([])
    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState(true);








    const Show = () => {

        AsyncStorage.getItem("token")
            .then(Token => {
                if (Token == null) {
                } else {
                  
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Token
                    }

                    axios.get('https://mirimbazi.ir/api/v1/index',
                        {
                            headers: headers
                        })
                        .then(response => {
                              setLoading(false)
                            setslider(response.data.data.slider);
                            setComment(response.data.data.comments)



                        })

                        .catch(function (error) {
                            // console.log(error.response.data);
                        });
                }
            })

            .catch(err => {

            });
    }











    //header
    let [wall, setwall] = useState("");
    let [Nameprofile, setNameprofile] = useState("");
    let [lastprofile, setlastprofile] = useState("");



    AsyncStorage.getItem("user")
        .then(value => {
            if (value == null) {
            }
            else {
                let jsonValue = JSON.parse(value);
                setwall(jsonValue.wallet);
                setNameprofile(jsonValue.first_name);
                setlastprofile(jsonValue.last_name);

            }
        }).catch(err => {

        });


    useEffect(() => {

        Show();

    }, [isFocused]);

    return (
        <NativeBaseProvider  >
            <HStack style={{ flexDirection: "row-reverse", elevation: 3, width: "100%", height: 70, backgroundColor: "#f5f6fa" }}>
                <StatusBar backgroundColor="#dcdde1" />
                <HStack>
                    <Image source={require('../../assets/image/logo.png')} alt="image" style={{ width: 40, height: 40, marginTop: "35%", right: 10 }} />
                </HStack>

                <View style={{ width: "70%", height: 60, flexDirection: "row", justifyContent: "center", marginRight: "10%" }}>
                   
                <TouchableOpacity 
                    style={{flexDirection: "row", borderRadius: 10, backgroundColor: "white", elevation: 5, width: 110, height: 40, justifyContent: 'center', alignItems: "center", marginTop: 15, marginBottom: 10, marginLeft: "20%", marginRight: "5%"  }} onPress={() => navigation.navigate("profile")} >
                  <Ionicons name="person-add" size={18} color="black" style={{marginRight:10}} />
                    <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 12, }}>{Nameprofile} {lastprofile} </Text>
                </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={{ flexDirection: "row", borderRadius: 10, backgroundColor: "white", elevation: 5, width: 110, height: 40, justifyContent: 'center', alignItems: "center", marginTop: 15, marginBottom: 10, marginLeft: "20%", marginRight: "5%" }} onPress={() => navigation.navigate("userpage")} >
                        <Ionicons name="person-add" size={18} color="black" style={{ marginRight: 10 }} />
                        <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 12, }}>????????/??????????</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={{ flexDirection: "row", borderRadius: 10, backgroundColor: "white", elevation: 5, width: 110, height: 40, justifyContent: 'center', alignItems: "center", marginTop: 15, marginBottom: 10, }} onPress={() => navigation.navigate("moneybags")} >
                        <Ionicons name="cash-outline" size={18} color="black" style={{ marginRight: 10 }} />
                        <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 12, }}>{wall}  ????????</Text>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={{ backgroundColor: "white", elevation: 5, borderRadius: 5, width: 40, height: 40, flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", right: 15, top: "20%" }} onPress={() => navigation.openDrawer()}  >
                    <Ionicons name="menu" size={30} color="black" />
                </TouchableOpacity>
            </HStack>

            

            <ScrollView style={{ backgroundColor: "white" }} >

         
                <View style={{ width: "100%", height: 300 }}>
                
                    <Swiper



                        paginationStyle={{
                            bottom: 0,
                            left: 0
                        }}
                        autoplay={true}
                        autoplayTimeout={2}
                        loop
                        key={Slider.length}



                        dot={
                            <View style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                margin: 5,
                                backgroundColor: "grey"
                            }} />
                        }
                        activeDot={
                            <View style={{
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                margin: 5,
                                backgroundColor: "red"
                            }} />
                        }
                    >




                        {Slider.map((index, i) => {
                            return (
                                <Link style={{ flex: 1 }} key={i} href="https://mirimbazi.ir" >


                                    <Image
                                        source={{ uri: BaseUrl + index.image_mobile }} alt={index.title}
                                        style={{ height: 300, width: "100%" }}
                                    />
                                </Link>
                            )

                        })}


                    </Swiper>
                </View>


                <Spinner size={30}  color="#44bd32"
                   animating={isLoading}
                       />


                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 25, color: "black" }}> ??????????????????</Text>

                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('startplay')} style={{ flex: 1, width: "50%", height: 50, justifyContent: "center", alignItems: "center", margin: 20, marginTop: 20, borderWidth: 4, borderColor: "green", borderRadius: 5 }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 18, color: "green", top: -5 }}>
                            ?????????? ????????
            </Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flex: 1, width: "100%", height: 2000 }}>

                    <WebView

                        source={{
                            html:
                                `<style>
            p{
                text-align:justify;
                font-size: 30pt;
                direction:rtl;
                color: black;
                padding: 25px;
                
                 

            }
            
            </style> 
            <p>
            ???????? ???? ???????? ?? ???????? ???? ?????????? ???? ???? ???????? ?????? ?????????? ???????????? ???? ???????? ???????? ?????????????? ?????? ???? ???? ?????? ?????? ???? ?????? ??????????????? ?????? ???????? ???????? ?????????? ???? ?????????????? ???????????? ???? ?????????? ?? ???????????? ???????????? ??????????????????????? ???????? ?? ?????????? ???????????? ?????????? ???????????? ?? ???????? ?? ?????? ????????????? ???? ???????? ?????? ?????????? ?? ?????????????? ?????? ??????. ???????????? ???????? ???? ???????? ???????? ?? ???? ???????????????????? ???????? ???????? ?????? . ?????????? ???????? ???????? ???? ???????? ?????? ?????????? ???????????? ???? ???????? . ?????? ???????? ???????????? ???????? ???? ?????? ???? ???? ???????? ?? ???? ???????? ???? ?????? ?? ???? ???? ???? ???? ???? ?????? . ???????? ???????????? ?? ?????????????????? ?????????? ?????? ???? ???????????? ???????? ???????????????? ?????????? ?????????? ?????? ?? ???? ?????? ???????? ?????? ???? ?????????? ?? ???? ?????? ???????????? ?????? ???????????????? ?? ???? ?????????? ???? ?????????????? ???????? ???????????? ???? ????????.???????? ???????????? ???? ?????????? ?? ???????? ?????? ?? ?????????? ???? ???????? ?????? ?????????? ???? ?????? ?? ???? ???? ???? ???? ???? ?????? ?????? ???????? ???????? ?????? ???????????? ???????? ?? ???????? ???????? ???? ?????? ???? ?????? ???? ?????? ?????????? ???????? ??????. ???????? ???? ?????? ???? ???????? ???? ?????????????? ???????????? ???? ???? ?????? ???????? ???????? ?????????? ?? ???????? ?? ???? ?????? ?????? ???? ?????????????? ?????????? ?? ???????? ?????????????? ???????? ?????? ???? ???????????? ?????????? ???? ??????.?????????????? ?????????? ?????????? ???? ???? ???????? ???????????? ?????????????????? ???? ?????????????????? ?? ???? ???? ???????? ?????? ???????????? ?????????? ?????? ??????. ?????????? ???? ?????????? ???? ?????????????? ???? ???????????????? ?????????? ?? ???????? ?????? ???????? ???????? ??????. ?????????????? ?????????????? ?? ???????? ???????????????? ???? ???????? ?????? ?????????? ?????????? ???????? ???????????????? ???? ?????? ?????????? ?? ?????????? ?????????????? ???????? ?????????? ?????????? ???? ???????? ???????? ???????????? ?? ?????????????????? ?????? ??????. ???? ?????? ?????? ?????????? ???? ???? ???????? ?????? ?????????? ?????????????? ?????????? ???? ?????????????? ???? ???????? ???????? ?????????? ?????? ???????? ?????????????? ?????????? ???? ???? ?????? ???????????? ???????? ???? ???????? ???????????? ?? ?????????? ???????? ?????????? ???????? ??????. ?????? ???????? ?????????? ???? ???????? ?????? ???? ???????????? ?????????? ?? ?????? ?????????????????? ?????????????????? ???????? ?????? ?????????????????? ?????? ???????????? ?????? ?????? ??????. ???????????? ?????? ?????????????? ???? ???? ?????? ?????????? ???????????????? ?????????? ???????? ???????????? ???? ???????????? ???????????? ???? ?????????? ???????????? ?????????? ???? ???????????? ???????? ?????????????? ?????????? ?????????? ???? ???????????? ?? ?????????? ???????????????? ?????????? ???????????? ???? ???????? ???????? ?? ?????????? ?????????????? ?????????????? ???????????????? ???????????? ?????????? ?????????????? ?? ?????????? ???????? ???? ???? ???? ?????????? ???????? ?? ?????? ???????????????????? ???????? ????????????(?????? ????????) ???? ???????????? ???????? ???????????? ?????????? ???????? ?????????????? ?????? ?????????? ???????? ???????????? ???? ???????????? ?????????? ?????? ?????????? ?????? ?????????? ???????? ?????????? ???????? ?? ?????????? ?????????????????? ?? ?????? ???????????? ???????????? ?????? ?????????? ???? ???????? ???????? ?????? ???????? ???????? ????????????. ?????? ???? ?????????? ?????? ???????????????? ?????? ???? ???????????? ?????????????? ?????? ???? ???? ???????? ???? ???????????? ?????? ?? ???????? ???????????? ?????? ???????????? ???? ???????? ???????? ?????????? ?????? ????????????????. ?????????????? ???? ???? ???????????? ?? ?????? ?????? ???????????????? ???????????????? ?????????? ?????????????? ???? ?????????? ???? ???????? ???? ?????? ?????? ?????? ???????? ?? ???? ???????????? ?????????? ?????? ???????? ?????? ?????????? ?????????? ???????????? ?????????????????? ???????? ???????? ?????? ?????????? ?????????? ???????? ?????????? ???????? ?????????? ?????????? ???????? ?????? ?? ???????? ?????????? ?????????? ???????????? ???? ???????? ?????? ???????? ?????????? ?????? ?? ???? ?????????? ???????? ???????????? ?????????????? ???????????? ???????? ????????. ???? ???????? ?????? ???????????????? ???? ?????????? ?????????????? ???????????? ?????????? ???? ???????????? ???? ???????? ???? ???? ?????????? ?????????? ???? ?????? ???? ?????????????????? ???????? ???????? ?????????????? ?????????????????? ?? ?????????????? ???????? ?????? ???? ???????? ???????? ???????????? ???????? ???????? ?? ???? ???? ???????????? ???????? ?? ?????? ???????? ???? ???????? ???????? ???????? ???????? ???????? ????????. ???????? ?? ?????? ???????? ???????? ???????????????????? ?????????? ???? ???????? ???? ?????????? ???????????? ???? ???????? ???? ?????? ?????????????? ?????????? ???? ?????????? ?????? ?? ???? ?????????? ???????? ???? ???????? ?????????????? ???????????? ???? ????????. ?????????? ???? ???????????? ???????? ?? ?????????? ?????????????????? ?????????? ?????????????? ?????????????? ???? ?????? ?????? ???????????????? ?????? ???????? ???????? ?? ???????????? ???? ?? ???????????? ???????????????? ???? ???????? ???????????????? ?????? ?????????? ???? ?????????????? ?????????????? ?????? ?????? ?? ?????????? ???? ?? ???????? ??????????????
            </p>`
                        }}

                    />
                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image
                        source={require('../../assets/image/ghaleb0.jpg')} alt="image" />
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 25, color: "green" }}>
                        ?????????????????? ????????????
    </Text>
                </View>


                <Swiper
                    paginationStyle={{
                        bottom: 8,

                    }}
                    loop
                    autoplay
                    key={Comment.length}

                    dot={
                        <View style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            margin: 5,
                            backgroundColor: "grey"
                        }} />
                    }
                    activeDot={
                        <View style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            margin: 5,
                            backgroundColor: "red"
                        }} />
                    }
                >





                    {Comment.map((index, i) => {
                        return (
                            <Box key={i} style={{ width: "80%", height: 500, backgroundColor: "#f1f2f6", elevation: 6, borderRadius: 50, marginLeft: "10%", marginTop: "15%" }}>

                                <Image
                                    source={{ uri: BaseUrl + index.image }} alt={index.title}
                                    style={{ borderRadius: 50, height: 300, width: "100%" }}
                                />
                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, alignItems: "center", padding: "5%" }}>
                                    {index.comment}
                                </Text>



                            </Box>
                        )
                    })}


                </Swiper>





            </ScrollView>
        </NativeBaseProvider>

    );



};



export default HomeScreen;







