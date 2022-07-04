import React, { Component, useState } from 'react'
import { NativeBaseProvider, HStack, Image, Button, View,  Text, Box,  Link } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {  ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native'

import OTPInputView from '@twotalltotems/react-native-otp-input';
import axios from 'react-native-axios';
import  AsyncStorage  from '@react-native-async-storage/async-storage';



function Sendsms({ route, navigation }) {
  
     let [Otp, setOtp] = useState("");
     let [errortext, setErrortext] = useState('');
    
   

  

//    console.log(Otp);
//     console.log(route.params.number);
    const Loginuser =  () => {

       
       


        if (!Otp) {
            setErrortext('لطفا کد ارسال شده به موبایل را وارد کنید'); 
             return;
           }



         
        axios.post('http://mirimbazi.ir/api/v1/auth/login', {
             mobile:route.params.number,
             code:Otp.code,
              
        })

            .then((response) => {
           console.log(response.data);
                if(response.data.message=='incorrect_code'){

                    Alert.alert("اخطار",
                        "کد ارسال شده به کاربر با کد وارد شده یکسان نمی باشد",
                        [
                            { text: "باشه",}
                          ],
                          
                    )

                }else
                // else if (response.data.message=='no_account_otp') {
                //    AsyncStorage.setItem("OTP",Otp.code)
                //     navigation.navigate("setting",{number:route.params.number})
                // }else
                {
                AsyncStorage.setItem("user",JSON.stringify(response.data.data.user));
                AsyncStorage.setItem("token",response.data.data.token);
               
                navigation.navigate("Home",{
                     screen:'profile',
                    //  params:{user_uni: response.data.data.user.unique_code,
                    //  user_token:response.data.data.token,}
                      
                    
                  }); 
                }
              
                  
                
                  
            })
            .catch(function (error) {
                console.log(error.response.data);
              });
    }







    

    return (
        <NativeBaseProvider>
            <HStack style={{ flexDirection: "row-reverse", elevation: 3, width: "100%", height: 70, backgroundColor: "#f5f6fa" }}>
                <StatusBar backgroundColor="#dcdde1" />
                <HStack>
                    <Image source={require('../assets/image/logo.png')} alt="image" style={{ width: 40, height: 40, marginTop: "35%", right: 10 }} />
                </HStack>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 40, height: 40, flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", right: 15, top: 10 }}>
                    <Ionicons name="arrow-forward" size={35} color="black" />
                </TouchableOpacity>
            </HStack>



            <ScrollView style={{ backgroundColor: 'white' }}>



                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/image/logo.png')} alt="image"
                        style={{ width: 60, height: 60, marginTop: "5%" }}
                    />
                </View>


                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 20, marginTop: 20 }}>
                        کد فعالسازی را وارد کنید
                        
                        </Text>


                </View>



                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: 112, marginTop: 20, marginBottom: "5%" }}>

                    <Box style={{ backgroundColor: "#EEEEEE", width: "95%", borderLeftWidth: 3, borderLeftColor: "#4cd137" }}>

                        <Text style={{ fontFamily: "IRANSansMobile", fontSize: 13, color: "#26C281", marginLeft: 15, marginTop: 15 }}>لطفا کد 4 رقمی ارسال شده به شماره موبایل {route.params.number} را وارد کنید</Text>

                        <Link onPress={() => navigation.navigate('userpage')} style={{ marginLeft: 15 }} >
                            <Text underline style={{ fontFamily: "IRANSansMobile_Bold", color: "#44bd32", fontSize: 15, marginBottom: 20 }}>
                                تغییر شماره موبایل
                           </Text>
                        </Link>
                    </Box>

                </View>


                <Box style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#dfe6e9", marginLeft: "10%", marginRight: "10%", borderRadius: 20 }}>


                 
               
                       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <OTPInputView
        pinCount={4}
        autoFocusOnLoad
        style={{width: '80%', height: 100, color: 'black'}}
        codeInputFieldStyle={{ width: 30, height: 45,borderWidth: 0, borderBottomWidth: 1,color: 'black', borderBottomColor: '#17BED0',}}
        // onCodeFilled={value =>{console.log(value)}}
        onCodeChanged={code => setOtp({code})}
      /> 
    </View>
               
               
                </Box> 
                {errortext != '' ? (
              <Text style={{ color: 'red', textAlign: 'center', fontSize: 14,fontFamily:"IRANSansMobile_Bold"}}> {errortext} </Text>
            ) : null}



        










                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "10%" }}>
                    <Button onPress={Loginuser} colorScheme="green" style={{ width: "95%" }} >
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 20, color: "white" }}>
                            ورود
                             </Text>
                    </Button>
                </View>





            </ScrollView>
        </NativeBaseProvider>


    )

}
export default Sendsms