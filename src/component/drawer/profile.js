import React, { useEffect, useState } from 'react'
import { NativeBaseProvider, HStack, Image,  View,  Text, Link, Spinner, } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Dimensions, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { DrawerActions, useIsFocused } from '@react-navigation/native';

import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { Width, Height } = Dimensions.get('window');



function Profile({  navigation }) {

    let BaseUrl = 'https://mirimbazi.ir';
    const [isLoading, setLoading] = useState(true);
    //get-req-axsios
    let [User, setUser] = useState("");
    let [ShareLink, SetShareLink] = useState("");
   


    let [Footr, setuserfootr] = useState(require('../../assets/image/foot-r-w.png'));
    let [Footl, setuserfootl] = useState(require('../../assets/image/foot-l-w.png'));
    let [userImage, setImage] = useState(require('../../assets/image/inter.jpg'));
    

    let [wall, setwall] = useState("");
    let [Nameprofile, setNameprofile] = useState("");
    let [lastprofile, setlastprofile] = useState("");
    



   

    const isFocused = useIsFocused();

    const getProfile =  () => {

   

    AsyncStorage.getItem("token")
    .then(Token => {
      if(Token == null){
      }else{ 
        AsyncStorage.getItem("user")
        .then( value=> {
            if(value == null){
            }else{
                let jsonValue = JSON.parse(value);
                setwall(jsonValue.wallet);
                setNameprofile(jsonValue.first_name);
                setlastprofile(jsonValue.last_name);
                if(jsonValue.unique_code){

                  const headers = {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+Token
                  }
           
              
                    axios.post("https://mirimbazi.ir/api/v1/profile/index",{
                      unique_code: jsonValue.unique_code,
              
                        },
                        {
                            headers: headers
                        })
                        .then(response => {
                        setLoading(false);
                            setUser(response.data.data.user);
                            SetShareLink(response.data.data.share_link) ;
                            setuserfootr(Footr = response.data.data.user.leg == "right" ? require('../../assets/image/foot-r-g.png') : require('../../assets/image/foot-r-w.png'))
                            setuserfootl(Footl = response.data.data.user.leg == "left" ? require('../../assets/image/foot-l-g.png') : require('../../assets/image/foot-l-w.png'))
                            setImage(userImage = response.data.data.user.image ? { uri: BaseUrl + response.data.data.user.image } : require('../../assets/image/inter.jpg'))
                    
                        })
              
                        .catch(function (error) {
                         
                        });
                        

                      }
              } 

          }).catch(err => {
              // Add some error handling
          });
    }
    }).catch(err => {
      
    });

  


       
    }

    useEffect(() => { 
       
              getProfile();


        
      
    }, [isFocused])
    
   





    


    return (


        <NativeBaseProvider>
            <HStack style={{ flexDirection: "row-reverse", elevation: 3, width: "100%", height: 70, backgroundColor: "#f5f6fa" }}>
                <StatusBar backgroundColor="#dcdde1" />
                <TouchableOpacity onPress={() => navigation.navigate("homescreen")}>
                    <Image source={require('../../assets/image/logo.png')} alt="image" style={{ width: 40, height: 40, marginTop: "35%", right: 10 }} />
                </TouchableOpacity>
               
                <View style={{ width: "70%", height: 60, flexDirection: "row", justifyContent: "center", marginRight: "10%" }}>
                <TouchableOpacity 
                    style={{flexDirection: "row", borderRadius: 10, backgroundColor: "white", elevation: 5, width: 110, height: 40, justifyContent: 'center', alignItems: "center", marginTop: 15, marginBottom: 10, marginLeft: "20%", marginRight: "5%"  }} >
                  <Ionicons name="person-add" size={18} color="black" style={{marginRight:10}} />
                    <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 12, }}>{Nameprofile} {lastprofile} </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={{flexDirection:"row",borderRadius:10,backgroundColor:"white",elevation:5, width:110 , height:40 ,  justifyContent: 'center', alignItems: "center", marginTop: 15, marginBottom: 10,  }} onPress={() => navigation.navigate("moneybags")} >
                  <Ionicons name="cash-outline" size={18} color="black" style={{marginRight:10}} />
                    <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 12, }}>{wall}  ریال</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ backgroundColor: "white", elevation: 5, borderRadius: 5, width: 40, height: 40, flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", right: 15, top: "20%" }} onPress={() => navigation.openDrawer()}  >
                    <Ionicons name="menu" size={30} color="black" />
                </TouchableOpacity>
            </HStack>






            <ScrollView style={{ width: "100%", backgroundColor: "white" }}>

            <Spinner size={30}  color="#44bd32"
                   animating={isLoading}
                       />
                <View style={{ flex: 1, flexDirection: "column", width: "100%", justifyContent: "flex-start", alignItems: "center" }}>





                    <Image source={userImage} alt="draw" style={{ width: 230, height: 230, borderRadius: 250, borderColor: "green", borderWidth: 5, marginTop: "5%" }} />

                    <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 20, marginTop: 20, color: "green" }}>{User.first_name} {User.last_name}</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("profilesetting")}
                        style={{ width: "75%", height: 40, marginTop: "5%", borderRadius: 10, backgroundColor: "#009432", justifyContent: "center", alignItems: "center" }}  >

                        <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 18, color: "white" }}>ویرایش پروفایل</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>

                        <Image source={Footr} style={{ width: 70, height: 70 }} alt="footr" />
                        <Image source={Footl} style={{ width: 70, height: 70 }} alt="foot" />
                    </View>


                    <View style={{ flexDirection: "row", marginTop: 20 }}>

                        <Ionicons name="shirt" size={50} color="green" />
                        <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 20, marginRight: 10, marginTop: 10, color: "green" }}>{User.post}</Text>
                    </View>
                    <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 20, marginTop: 20, color: "green" }}>صفحات اجتماعی بازیکن </Text>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>


                        <TouchableOpacity  >
                            <Link href={"https://wa.me/" + User.whatsapp}>
                                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#4cd137", justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="logo-whatsapp" size={33} color="white" />
                                </View>
                            </Link>
                        </TouchableOpacity>



                        <TouchableOpacity >
                            <Link style={{ margin: 10 }} href={"https://twitter.com/" + User.twitter}>
                                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#273c75", justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="logo-twitter" size={30} color="white" />
                                </View>
                            </Link>
                        </TouchableOpacity>


                        <TouchableOpacity >
                            <Link href={"https://instagram.com/" + User.instagram}>

                                <LinearGradient start={{ x: 0, y: 0.1 }} end={{ x: 0, y: 1.25 }} colors={['#4834d4', '#eb4d4b', '#f9ca24']} style={{ borderRadius: 25 }} >
                                    <View style={{ width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                        <Ionicons name="logo-instagram" size={30} color="white" />
                                    </View>
                                </LinearGradient>

                            </Link>
                        </TouchableOpacity>



                    </View>


                    <View style={{ backgroundColor: "#dcdde1", width: "80%", height: 120, alignItems: "center", marginLeft: "10%", marginRight: "10%", marginTop: 20, borderRadius: 20, borderWidth: 3, borderColor: "green", elevation: 10 }}>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 18, marginTop: 5, color: "black", position: "absolute", left: 30 }} >سن</Text>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 18, marginTop: 10, color: "black", position: "absolute", right: 30, bottom: 10 }}>{User.age}</Text>

                    </View>
                    <View style={{ backgroundColor: "#dcdde1", width: "80%", height: 120, alignItems: "center", marginLeft: "10%", marginRight: "10%", marginTop: 20, borderRadius: 20, borderWidth: 3, borderColor: "green", elevation: 10 }}>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 18, marginTop: 5, color: "black", position: "absolute", left: 30 }}>قد</Text>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 18, marginTop: 10, color: "black", position: "absolute", right: 30, bottom: 10 }}>{User.height}</Text>
                    </View>

                    <View style={{ backgroundColor: "#dcdde1", width: "80%", height: 120, alignItems: "center", marginLeft: "10%", marginRight: "10%", marginTop: 20, borderRadius: 20, borderWidth: 3, borderColor: "green", elevation: 10 }}>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 18, marginTop: 5, color: "black", position: "absolute", left: 30 }}>وزن</Text>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 18, marginTop: 10, color: "black", position: "absolute", right: 30, bottom: 10 }}>{User.weight}</Text>
                    </View>

                    <View style={{ backgroundColor: "#dcdde1", width: "80%", height: 120, alignItems: "center", marginLeft: "10%", marginRight: "10%", marginTop: 20, borderRadius: 20, borderWidth: 3, borderColor: "green", elevation: 10 }}>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 18, marginTop: 5, color: "black", position: "absolute", left: 30 }}>تعداد بازی</Text>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 18, marginTop: 10, color: "black", position: "absolute", right: 30, bottom: 10 }}>{User.number_game}</Text>
                    </View>

                    <View style={{ flex: 1, width: "90%", height: Height, textAlign: "center", marginLeft: "10%", marginRight: "10%", marginTop: 30, alignItems: "center" }}>


                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 20, marginTop: 5, color: "green", marginBottom: 30 }}>درباره من</Text>


                        <View style={{ width: "100%", }}>


                            <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 15, marginTop: 5, marginBottom: 30 }}>{User.about_me} </Text>


                          

                        </View>
                    </View>


                    <View style={{ width: "80%", alignItems: "center", marginTop: 40, marginBottom: 30 }}>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 20, color: "green" }}>اشتراک گذاری صفحه بازیکن </Text>

                    </View>

                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>



                        <TouchableOpacity >
                            <Link href={"https://wa.me/?text=" + ShareLink}  >
                                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#4cd137", justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="logo-whatsapp" size={33} color="white" />
                                </View>
                            </Link>
                        </TouchableOpacity>




                        <TouchableOpacity >
                            <Link href={"https://twitter.com/intent/tweet?text=" + ShareLink} style={{ margin: 10 }} >
                                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#273c75", justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="logo-twitter" size={30} color="white" />
                                </View>
                            </Link>
                        </TouchableOpacity>



                        <TouchableOpacity >
                            <Link href={"tg://msg?text=" + ShareLink}  >
                                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#1B9CFC", justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="paper-plane" size={30} color="white" />
                                </View>
                            </Link>
                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>



        </NativeBaseProvider>




    )

}
export default Profile;







