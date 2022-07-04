import React, { useState } from 'react'
import { NativeBaseProvider, HStack, Image, Button, View, Text, Modal } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {  ScrollView, StatusBar, TouchableOpacity, } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'





function Laws({ navigation }) {

    const [Showjoin1, setShowjoin1] = useState(false);
    const [Showjoin2, setShowjoin2] = useState(false);
    const [Showjoin3, setShowjoin3] = useState(false);
    const [Showjoin4, setShowjoin4] = useState(false);
    const [Showjoin5, setShowjoin5] = useState(false);
    const [Showjoin6, setShowjoin6] = useState(false);
    const [Showjoin7, setShowjoin7] = useState(false);
    const [Showjoin8, setShowjoin8] = useState(false);
    const [Showjoin9, setShowjoin9] = useState(false);
    const [Showjoin10, setShowjoin10] = useState(false);
    const [Showjoin11, setShowjoin11] = useState(false);
    const [Showjoin12, setShowjoin12] = useState(false);
    const [Showjoin13, setShowjoin13] = useState(false);
    const [Showjoin14, setShowjoin14] = useState(false);
    const [Showjoin15, setShowjoin15] = useState(false);
    const [Showjoin16, setShowjoin16] = useState(false);
    const [Showjoin17, setShowjoin17] = useState(false);
    const [Showjoin18, setShowjoin18] = useState(false);
    const [Showjoin19, setShowjoin19] = useState(false);
    const [Showjoin20, setShowjoin20] = useState(false);
    const [Showjoin21, setShowjoin21] = useState(false);
    const [Showjoin22, setShowjoin22] = useState(false);
    const [Showjoin23, setShowjoin23] = useState(false);
    const [Showjoin24, setShowjoin24] = useState(false);
    const [Showjoin25, setShowjoin25] = useState(false);
    const [Showjoin26, setShowjoin26] = useState(false);
    const [Showjoin27, setShowjoin27] = useState(false);
    const [Showjoin28, setShowjoin28] = useState(false);




    
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
    // Add some error handling
});


    return (
        <NativeBaseProvider>
            <HStack style={{ flexDirection: "row-reverse", elevation: 3, width: "100%", height: 70, backgroundColor: "#f5f6fa" }}>
                <StatusBar backgroundColor="#dcdde1" />
                <TouchableOpacity onPress={() => navigation.navigate("homescreen")}>
                    <Image source={require('../../assets/image/logo.png')} alt="image" style={{ width: 40, height: 40, marginTop: "35%", right: 10 }} />
                </TouchableOpacity>
             
                <View style={{width:"70%",height:60,flexDirection:"row",justifyContent:"center",marginRight:"10%" }}>
                <TouchableOpacity 
                    style={{flexDirection: "row", borderRadius: 10, backgroundColor: "white", elevation: 5, width: 110, height: 40, justifyContent: 'center', alignItems: "center", marginTop: 15, marginBottom: 10, marginLeft: "20%", marginRight: "5%"  }} onPress={() => navigation.navigate("profile")} >
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



            <View style={{ flex: 1, width: '90%', backgroundColor: 'white', borderWidth: 1, borderColor: "green", borderRadius: 7, alignItems: "center", justifyContent: "center", marginLeft: "5%", marginTop: "5%", marginBottom: "5%" }}>

                <ScrollView >


                    <View style={{ width: "80%", height: 50, alignItems: "flex-start", marginRight: "10%", marginTop: "2%", }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 18, }}>
                            شرایط و قوانین
        </Text>
                        <View style={{ width: "45%", height: 2, backgroundColor: "green" }}></View>
                    </View>


                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 16, marginLeft: "2%", marginTop: 20 }}>شرایط و قوانین استفاده از خدمات میریم بازی وطرف تجاری در خدمات ویژه</Text>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 16, marginLeft: "2%", marginTop: 20 }}>تاریخ آخرین بروزرسانی :
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 16, marginLeft: "2%", marginTop: 20 }}> 30 آبان 1400</Text>
                    </Text>



                    <View style={{ width: "80%", height: 40, alignItems: "flex-start", marginRight: "10%", marginTop: "7%", }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 18, }}>
                            تعاریف و اصطلاحات
        </Text>
                        <View style={{ width: "60%", height: 2, backgroundColor: "#26C281" }}></View>
                    </View>

                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 16, marginLeft: "2%"}}> اصطلاحاتی که در این شرایط وقوانین به کار رفته است دارای معانی مشروح زیراست:</Text>


                    <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin1(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:100}}>
                            شرکت 
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:107,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin1} onClose={() => setShowjoin1(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin1(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                                شرکت پیشتازان فناوران اطلاعات که نسبت به ارائه خدمات میریم بازی اقدام میکند.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>


                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin2(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:87}}>
                            میریم بازی 
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:94,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin2} onClose={() => setShowjoin2(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin2(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
  خدمات نرم افزاری که توسط شرکت به منظور رزرویشن زمین بازی وانجام آن به کاربران ارائه میشود.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>


                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin3(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:50}}>
                             خدمات ویژه میریم بازی 
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:56,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin3} onClose={() => setShowjoin3(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin3(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
  خدمات نرم افزاری که توسط شرکت و با همکاری طرف تجاری بر روی نرم افزار  میریم بازی به کاربران ارائه میشود.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>



                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin4(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:88}}>
                              اپلیکیشن 
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:97,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin4} onClose={() => setShowjoin4(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin4(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
        نرافزار متعلق به شرکت که  به منظور استفاده از خدمات میریم بازی با خدمات ویژه آن،حق استفاده موقت از آن برابر شرایط مندرج در قرارداد خصوصی و سند حاضر به کاربران با طرف های تجاری شرکت اعطا می شود.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>


                
                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin5(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:70}}>
                             قرارداد خصوصی 
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:77,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin5} onClose={() => setShowjoin5(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin5(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
   توافق کتبی یا الکترونیکی فی ما بین شرکت وکاربر با طرف های تجاری شرکت،جهت بهره برداریدموقت از نرم افزار میریم بازی.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin6(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:104}}>
                            کاربر 
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:113,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin6} onClose={() => setShowjoin6(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin6(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                شخصی حقیقی یا حقوقی است اعم از بازیکن، پیمانکار و تولید کننده محتوا که برابر شرایط و قوانین حاضر از طریق اینترنت به اپلیکیشن متصل و از خدمات  میریم بازی  یا خدمات ویژه  آن  بهره مند میشود.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                
                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin7(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:98}}>
                            کاربران 
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:106,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin7} onClose={() => setShowjoin7(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin7(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                از کاربر بازیکن، پیمانکار و تولید کننده محتوا یا سایر کاربران خدمات ویژه  میریم بازی ، تحت عنوان کاربران یاد می‌شود.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin8(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:80}}>
                        کاربر پیمانکار
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:90,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin8} onClose={() => setShowjoin8(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin8(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                شخص حقیقی است که در اپلیکیشن میریم بازی برای دریافت درخواست بازی و ارائۀ خدمات ثبت‌‌ نام کرده ‌است.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin9(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:83}}>
                        کاربر بازیکن
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:93,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin9} onClose={() => setShowjoin9(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin9(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                شخص حقیقی یا حقوقی است که در اپلیکیشن بازیکن  میریم بازی  برای ارسال درخواست بازی ثبت‌‌ نام کرده‌ است.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin10(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:83}}>
                        طرف تجاری
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:93,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin10} onClose={() => setShowjoin10(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin10(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                اشخاص حقیقی و حقوقی که برابر قرارداد خصوصی از طریق ایجاد درگاه، حق بهره‌برداری موقت از اپلیکیشن را با نام تجاری خود یا مشترک با میریم بازی  دارند.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin11(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:77}}>
                        حساب کاربری
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:87,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin11} onClose={() => setShowjoin11(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin11(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                حسابی است که اشخاص برای اراِئه یا استفاده از خدمات  میریم بازی  یا خدمات ویژه  میریم بازی  در اپلیکیشن ایجاد کرده‌اند.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin12(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:93}}>
                         موجودی
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:103,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin12} onClose={() => setShowjoin12(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin12(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                مبلغی است که کاربران در حساب کاربری خود به منظور استفاده از خدمات  میریم بازی  یا خدمات ویژه  میریم بازی  دارند. این مبلغ به صورت پرداخت از طریق سامانۀ بانکی و کارتهای عضو شبکۀ شتاب و یا با استفاده از  میریم بازی  کارت یا کیف پول طرف های تجاری طبق شرایط و قوانین حاضر منظور و محاسبه خواهد شد.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin13(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:68}}>
                         اطلاعات محرمانه
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:79,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin13} onClose={() => setShowjoin13(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin13(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                اطلاعاتی که توسط کاربران در  میریم بازی  یا خدمات ویژه  میریم بازی  قرار داده می‌شود، اعم از اطلاعاتی که به صورت مستقیم از سوی کاربران وارد می‌شود و همچنین اطلاعاتی که به صورت خودکار و در نتیجۀ بهره‌برداری از خدمات  میریم بازی  یا خدمات ویژه  میریم بازی  توسط شرکت یا طرف‌های تجاری تولید یا در اختیار شرکت قرار داده می‌شود.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin14(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:10}}>
                          قوانین ومقررات جمهوری اسلامی ایران
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:17,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin14} onClose={() => setShowjoin14(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin14(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                قانون اساسی، قوانین عادی، آئین‌نامه‌های اجرایی، بخشنامه‌ها، دستورالعمل‌ها و کلیه ضوابط قانونی حاکم بر انجام موضوع قرارداد اعم از قانون بیمه ورزشی، آئین نامه های وزارت ورزش، فدراسیونهای ورزشی.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>





                    <View style={{ width: "80%", height: 50, alignItems: "flex-start", marginRight: "10%", marginTop: "7%", }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 18, }}>
                             حساب کاربری 
        </Text>
                        <View style={{ width: "40%", height: 2, backgroundColor: "#26C281" }}></View>
                    </View>


                    <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin15(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:27}}>
                           ثبت نام در اپلیکیشن میریم بازی
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:32,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin15} onClose={() => setShowjoin15(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin15(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                کاربران با ثبت‌نام در اپلیکیشن  میریم بازی ، همچنین با هر بار استفاده از خدمات آن، می‌پذیرند که شرایط و قوانین حاضر را به صورت کامل مطالعه کرده و آن را با اطلاع کامل از شرایط و معانی‌اش پذیرفته‌اند. این شرایط و قوانین ممکن است در طول زمان تغییر کند. استفادۀ کاربران از اپلیکیشن، پس از هر بار تغییر در شرایط و قوانین، به معنی پذیرش تغییرات مذکور است. این قوانین برای مطالعه کاربران در سایت و اپلیکیشن  میریم بازی  در دسترس است.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                
                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin16(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 14, color: "green",right:1}}>
                          استفاده از خدمات میریم بازی یا خدمات ویژه
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:6,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin16} onClose={() => setShowjoin16(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin16(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                برای استفاده از خدمات  میریم بازی  یا خدمات ویژه  میریم بازی  لازم است که هر کاربر اعم از شخص حقیقی یا حقوقی یک حساب کاربری در اپلیکیشن بسازد. تنها اشخاصی که بیش از ۱۸ سال سن دارند و واجد اهلیت قانونی هستند می‌توانند راساً اقدام به ساخت حساب کاربری در اپلیکیشن کنند. حساب کاربری برای کاربران زیر ۱۸ سال توسط قیم قانونی ایشان ساخته و با تایید ایشان امکانپذیر می باشد.  تمامی کاربران برای استفاده از خدمات باید نام، نام خانوادگی ،کد ملی ، آدرس پست الکترونیکی و شماره همراه خود را در اپلیکیشن  میریم بازی  ثبت کند.
                                        تبصره ۱- کاربران در صورت نیاز به استفاده از خدمات ویژه میریم بازی  باید برای تکمیل اطلاعات خواسته شده توسط طرف‌های تجاری از قبیل نشانی اقدام کنند.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin17(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:57}}>
                             کاربران شخص حقوقی  
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:62,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin17} onClose={() => setShowjoin17(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin17(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                کاربران شخص حقوقی مکلف به معرفی نماینده (شخص حقیقی) برای ثبت‌نام در اپلیکیشن هستند و اطلاعات این شخص حقوقی باید در اپلیکیشن قید شود.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin18(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:22}}>
                               بد افزار، ربات و نرم افزارهای مرتبط  
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:28,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin18} onClose={() => setShowjoin18(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin18(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                هیچ یک از کاربران حق استفاده از بدافزارها، ربات و نرم‌افزارهای مرتبط یا واسط را برای استفاده از اپلیکیشن اعم از احراز هویت، تکمیل اطلاعات، ارسال درخواست و غیره ندارند.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin19(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:33}}>
                               اطلاعات درخواستی اپلیکیشن 
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:42,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin19} onClose={() => setShowjoin19(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin19(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                کاربران و قیم قانونی ایشان می‌پذیرند کلیه اطلاعات درخواستی اپلیکیشن را مطابق با واقعیت، صحیح و به‌‌روز وارد کنند و شخص کاربر مسئول عدم صحت و به‌ روز نبودن اطلاعات است. در صورت اثبات خلاف این موضوع، شرکت هیچ گونه مسئولیتی در مورد خسارات و مشکلات ناشی از عدم اعتبار اطلاعات اعلامی بر عهده نخواهد داشت.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin20(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:65}}>
                                 شماره تلفن وایمیل 
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:73,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin20} onClose={() => setShowjoin20(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin20(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                کاربران متعهد می‌شوند که صرفا با شماره تلفن و ایمیل متعلق به خود در اپلیکیشن ثبت‌نام کنند. در غیر این صورت در برابر شخص ذی‌نفع صاحب ایمیل تماما مسئول بوده و شرکت به محض آگاهی از این موضوع مجاز خواهد بود نسبت به لغو عضویت و حساب کاربری اقدام کند..
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>


                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin21(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:65}}>
                                   حساب های کاربری 
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:73,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin21} onClose={() => setShowjoin21(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin21(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                هر شخص تنها می‌تواند یک حساب کاربری به عنوان کاربر بازیکن، تولید کننده محتوا یا کاربر پیمانکار یا استفاده‌کننده از خدمات ویژه  میریم بازی  داشته باشد. در صورتی که شرکت اطلاع یابد که به نام یک شخص اعم از حقیقی و یا حقوقی حساب‌های کاربری متعدد وجود دارد، مجاز خواهد بود نسبت به قطع خدمات و غیرفعال کردن حساب‌های کاربری مذکور اقدام کند.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin22(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:90}}>
                                    فعالیت ها  
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:99,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin22} onClose={() => setShowjoin22(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin22(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                مسئولیت همۀ فعالیت‌هایی که از طریق حساب کاربری اشخاص حقیقی و یا حقوقی در اپلیکیشن یا سایر خدمات ارائه شده در خدمات ویژه  میریم بازی  انجام می‌شود، به عهدۀ کاربران است. بنابراین مسئولیت اشخاص ثالث یا افرادی غیر از کاربر که با آن حساب از خدمات اپلیکیشن استفاده می‌کنند، تماما متوجه کاربر صاحب‌حساب است.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin23(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:76}}>
                                     امنیت اطلاعات  
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:85,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin23} onClose={() => setShowjoin23(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin23(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                مسئولیت حفظ امنیت اطلاعات حساب کاربری شامل نام کاربری و رمز عبور به عهدۀ کاربران می‌باشد. در صورت مفقود شدن یا به سرقت رفتن اطلاعات حساب کاربری و گوشی موبایل، کاربر مذکور موظف است در اسرع وقت موضوع را به اطلاع شرکت برساند. بدیهی است تا زمانی که اطلاع‌رسانی به شرکت انجام نشده است، مسئولیت همۀ فعالیت‌هایی که از طریق حساب کاربری مذکور و موبایل کاربر انجام شده و می‌شود به عهدۀ وی خواهد بود.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin24(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:32}}>
                                 اجازه استفاده از حساب کاربری 
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:41,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin24} onClose={() => setShowjoin24(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin24(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                کاربران حق ندارند به سایر اشخاص حقیقی و حقوقی اجازه استفاده از حساب کاربری خود را بدهند یا حساب خود را به شخص حقیقی یا حقوقی دیگری منتقل کنند. در مورد کاربر شخص حقوقی نیز، مسئولیت‌های قانونی بهره‌برداری از خدمات  میریم بازی  یا خدمات ویژه  میریم بازی  متوجه مدیران اشخاص حقوقی خواهد بود.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                
                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin25(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:67}}>
                                      استفاده از خدمات  
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:78,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin25} onClose={() => setShowjoin25(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin25(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                در شرایط خاصی ممکن است از کاربران برای استفاده از خدمات، درخواست احراز هویت شود، در این شرایط اگر کاربران اطلاعات کافی در اختیار شرکت قرار ندهند، شرکت می‌تواند حساب کاربری آن‌ها را مسدود و از ارائۀ خدمات به نامبردگان خودداری کند .
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin26(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:50}}>
                                       اقدام به تکمیل اطلاعات   
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:59,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin26} onClose={() => setShowjoin26(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin26(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                ممکن است بنا به مورد و حسب صلاحدید شرکت، از کاربران درخواست شود که اقدام به تکمیل اطلاعات، ارائه مدارک و یا اصلاح اطلاعات موجود کنند. در این صورت، کاربر متعهد به ارائه اطلاعات و یا اصلاح اطلاعات درخواستی در مدت اعلام و درخواست شده از سوی شرکت خواهد بود. در غیر این صورت شرکت می‌تواند حساب کاربری وی را مسدود کرده و از ارائۀ خدمات به کاربر مذکور خودداری کند.  .
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>


                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Button  onPress={() => setShowjoin27(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:74}}>
                                      اطلاعات کاربری  
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:83,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin27} onClose={() => setShowjoin27(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin27(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                اطلاعات کاربری نزد کاربر گیرنده اطلاعات، محرمانه بوده و هیچ یک از کاربران حق ندارند اطلاعات مربوط به حساب طرف مقابل را (اعم از مشخصات هویتی، شماره تماس، آدرس، عکس و غیره) ذخیره، یا منتشر کند و در دسترس دیگران قرار دهد.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>

                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" ,marginBottom:"5%" }}>
                    <Button  onPress={() => setShowjoin28(true)} size="xs"  style={{ width: "90%",backgroundColor:"white",borderWidth:1,borderColor:"green",elevation:5 }} >
                       <View style={{flexDirection:"row"}}>
                           <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "green",right:60}}>
                                       کلیه اطلاعات سیستم   
                            
                             </Text>
                             <Ionicons name="chevron-down-outline" size={20} color="green" style={{left:67,top:3}}   /> 
                       </View>
                       

                        <Modal isOpen={Showjoin28} onClose={() => setShowjoin28(false)}>
                            <Modal.Content mx="400px" style={{ backgroundColor: "#ecf0f1" }}>

                                <Ionicons name="close" size={28} color="white" style={{ width: 30, height: 30, borderRadius: 10, right: 15, bottom: 15, backgroundColor: "#3498db" }} onPress={() => setShowjoin28(false)} />

                                <Modal.Body>

                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green" }}>
                                کلیه اطلاعات و محتوای موجود و یا مرتبط با حساب کاربر متعلق به شرکت بوده و شرکت میتواند به هر نحو مقتضی از اطلاعات موجود و محتوای تولید شده و ذخیره شده در اپلیکیشن استفاده نماید. از جمله شرکت میتواند بدون آگاهی قبلی و با استفاده از این اطلاعات نسبت به شناسایی و کشف استعدادهای ورزشی اقدام کند و یا از طرف کاربران در خصوص نقل و انتقال ایشان به تیم های ورزشی داخلی و خارجی اقدام نماید.
                                                </Text>
                                </Modal.Body>
                            </Modal.Content>

                        </Modal>
                    </Button>
                </View>
























                </ScrollView>
            </View>
        </NativeBaseProvider>


    )

}
export default Laws