import React, { useEffect, useState } from 'react'
import { NativeBaseProvider, HStack, Image , View,  Text, Box, } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {  ScrollView, StatusBar, TouchableOpacity,  } from 'react-native'
import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';




function Report({ navigation }) {

   
    let [wall, setwall] = useState("");
    let [Nameprofile, setNameprofile] = useState("");
    let [lastprofile, setlastprofile] = useState("");
    const [REPORT, setREPORT] = useState([]);
    const isFocused = useIsFocused();
    //header




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
            // Add some error handling
        });







    const ReportGame = () => {

        AsyncStorage.getItem("token")
            .then(value => {
                if (value == null) {

                } else {

                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + value
                    }


                    axios.get('https://mirimbazi.ir/api/v1/request-log',
                        {
                            headers: headers
                        })
                        .then(response => {
                           
                            if (response.data.data.logs.data.length > 0) {
                                setREPORT(response.data);
                            }else{
                                []
                            }
                            

                        })

                        .catch(function (error) {
                            
                        });
                }
            }).catch(err => {

            });

    }



    useEffect(() => {

        ReportGame();

    }, [isFocused]);




    return (
        <NativeBaseProvider>
            <HStack style={{ flexDirection: "row-reverse", elevation: 3, width: "100%", height: 70, backgroundColor: "#f5f6fa" }}>
                <StatusBar backgroundColor="#dcdde1" />
                <TouchableOpacity onPress={() => navigation.navigate("homescreen")}>
                    <Image source={require('../../assets/image/logo.png')} alt="image" style={{ width: 40, height: 40, marginTop: "35%", right: 10 }} />
                </TouchableOpacity>

                <View style={{ width: "70%", height: 60, flexDirection: "row", justifyContent: "center", marginRight: "10%" }}>
                    <TouchableOpacity
                        style={{ flexDirection: "row", borderRadius: 10, backgroundColor: "white", elevation: 5, width: 110, height: 40, justifyContent: 'center', alignItems: "center", marginTop: 15, marginBottom: 10, marginLeft: "20%", marginRight: "5%" }} onPress={() => navigation.navigate("profile")} >
                        <Ionicons name="person-add" size={18} color="black" style={{ marginRight: 10 }} />
                        <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 12, }}>{Nameprofile} {lastprofile} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flexDirection: "row", borderRadius: 10, backgroundColor: "white", elevation: 5, width: 110, height: 40, justifyContent: 'center', alignItems: "center", marginTop: 15, marginBottom: 10, }} onPress={() => navigation.navigate("moneybags")} >
                        <Ionicons name="cash-outline" size={18} color="black" style={{ marginRight: 10 }} />
                        <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 12, }}>{wall}  ریال</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ backgroundColor: "white", elevation: 5, borderRadius: 5, width: 40, height: 40, flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", right: 15, top: "20%" }} onPress={() => navigation.openDrawer()}  >
                    <Ionicons name="menu" size={30} color="black" />
                </TouchableOpacity>
            </HStack>





            <View style={{ flex: 1, width: '90%', backgroundColor: 'white', borderWidth: 1, borderColor: "green", borderRadius: 7, alignItems: "center", justifyContent: "center", marginLeft: "5%", marginTop: "5%", marginBottom: "5%" }}>

                <ScrollView >


                    <View style={{ width: "80%", height: 50, alignItems: "flex-start", marginLeft: "5%", marginTop: "2%", }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 17, }}>
                            درخواست های بازی
                        </Text>
                        <View style={{ width: "60%", height: 2, backgroundColor: "green" }}></View>
                    </View>



                    <View style={{ flexDirection: "row", width: "90%", height: 130, marginBottom: "2%", borderWidth: 1, borderColor: "green", marginTop: "2%", borderRadius: 5, backgroundColor: "#9AECDB", marginLeft: "8%" }}>

                        <View style={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="alert-circle" size={35} color="green" />
                        </View>
                        <View style={{ width: "80%" }}>
                            <Text style={{ fontFamily: "IRANSansMobile", fontSize: 14, color: "green", marginLeft: "2%", marginTop: 20 }}> دراین بخش گزارشات درخواست های بازی شما لیست میشود.درصورت مشاهده هرگونه مشکل با پشتیبانی تماس بگیرید</Text>
                        </View>

                    </View>



                    { REPORT.map((index, i) => {
                        return (
                            <Box key={i} style={{ flexDirection: "row", width: "90%", height: 180, marginBottom: "2%", marginLeft: 20 }}>


                                <View style={{ width: 2, height: 180, backgroundColor: "#a4b0be", left: 30 }}></View>

                                <View style={{ width: 60, height: 60, backgroundColor: "#2C3A47", borderRadius: 40, marginTop: "5%" }}>
                                    <Text style={{ fontFamily: "IRANSansMobile", fontSize: 14, marginLeft: "20%", marginTop: "10%", color: "white" }}>2هفته پیش</Text>
                                    <View style={{ width: 50, height: 2, backgroundColor: "#a4b0be", bottom: 23, left: 60 }}></View>
                                </View>

                                <View bg={(index.status !== success ? "#9AECDB" : "#ffcccc")} style={{ flexDirection: "column", width: "70%", height: 180, marginLeft: "10%", borderWidth: 1, borderColor: "green", borderRadius: 5 }}>


                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: "2%", marginLeft: "5%" }}>تاریخ رزرو: <Text style={{ fontFamily: "IRANSansMobile", fontSize: 14 }}>{index.data.logs.data.date} </Text></Text>

                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: "2%", marginLeft: "5%" }}>سانس بازی : <Text style={{ fontFamily: "IRANSansMobile", fontSize: 14 }}>{index.data.logs.data.time_range} </Text> </Text>

                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: "2%", marginLeft: "5%" }}>نوع زمین : <Text style={{ fontFamily: "IRANSansMobile", fontSize: 14 }}>{index.data.logs.data.type_ground}  </Text> </Text>

                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: "2%", marginLeft: "5%" }}>هزینه سانس : <Text style={{ fontFamily: "IRANSansMobile", fontSize: 14 }}>{index.data.logs.data.count} </Text></Text>

                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: "2%", marginLeft: "5%" }}>وضعیت: <Text style={{ fontFamily: "IRANSansMobile", fontSize: 14, marginTop: "3%", marginLeft: "2%", color: "green" }}>{(index.status !== success ? <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}> تکمیل شده </Text> : <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "red" }}> در حال انتظار </Text>)} </Text></Text>

                                    </View>

                                </View>

                            </Box>
                        )
                    })}

                   
                </ScrollView>
            </View>
        </NativeBaseProvider>


    )

}
export default Report