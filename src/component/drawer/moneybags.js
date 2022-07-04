import React, {  useState } from 'react'
import { NativeBaseProvider, HStack, Image, Button, View, Text, Box, Input, FormControl } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Dimensions, ScrollView, StatusBar, TouchableOpacity, TextInput,Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form';
import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";





function Moneybags({ navigation }) {

     let[Token,setTokon]=useState("");
    let [Payment, setPeyment] = useState("");
    let [discount, setdiscount] = useState("");
   
   

    const { control } = useForm({
        defaultValues: {
            Numberfhone: '',

        }
    });
   






    AsyncStorage.getItem("token")
    .then(value => {
        setTokon(value);
    }).catch(err => {
    
    });

    


    const moneypay = async () => {
       
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ Token
          }
        
        axios.post('https://mirimbazi.ir/api/v1/payment/charge', {
            amount: Payment,
             code:discount
           

        },{
            headers:headers
        })
            .then(response => {
               
            
                
                 navigation.navigate("Home",{
                     screen:"homescreen"
                 })

            })

            .catch(function (error) {
             
                 if (error.response.data.errors.amount) {
                    Alert.alert(
                        
                        "اخطار",
                        "  لطفا مبلغ را وارد کنید  ",
                        [
                            { text: "باشه",}
                          ],
                          
                    )
                }
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
        // Add some error handling
    });

  


    return (
        <NativeBaseProvider>
            <HStack style={{ flexDirection: "row-reverse", elevation: 3, width: "100%", height: 70, backgroundColor: "#f5f6fa" }}>
                <StatusBar backgroundColor="#dcdde1" />
                <TouchableOpacity onPress={() => navigation.navigate("homescreen")}>
                    <Image source={require('../../assets/image/logo.png')} alt="image" style={{ width: 40, height: 40, marginTop: "35%", right: 10 }} />
                </TouchableOpacity>
    
                <View style={{ width: "70%", height: 60, flexDirection: "row", justifyContent: "center", marginRight: "10%" }}>
                <TouchableOpacity 
                    style={{flexDirection: "row", borderRadius: 10, backgroundColor: "white", elevation: 5, width: 110, height: 40, justifyContent: 'center', alignItems: "center", marginTop: 15, marginBottom: 10, marginLeft: "20%", marginRight: "5%"  }} onPress={() => navigation.navigate("profile")} >
                  <Ionicons name="person-add" size={18} color="black" style={{marginRight:10}} />
                    <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 12, }}>{Nameprofile} {lastprofile} </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={{flexDirection:"row",borderRadius:10,backgroundColor:"white",elevation:5, width:110 , height:40 ,  justifyContent: 'center', alignItems: "center", marginTop: 15, marginBottom: 10,  }}  >
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


                    <View style={{ width: "80%", height: 50, alignItems: "flex-start", marginLeft: "5%", marginTop: "2%", }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 18, }}>
                            افزایش موجودی کیف پول
        </Text>
                        <View style={{ width: "68%", height: 2, backgroundColor: "green" }}></View>
                    </View>



                    <View style={{ width: "90%", height: 130, marginBottom: "2%", borderWidth: 1, borderColor: "green", marginTop: "2%", borderRadius: 5, backgroundColor: "#9AECDB", marginLeft: 20 }}>

                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 14, color: "green", marginLeft: "2%", marginTop: 20 }}>
                            توجه :
                 <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "green", }}> برای افزایش موجودی کیف پول خود،مبلغ واردشده شما میتواند
                 <Text underline style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 14, color: "green", }}> حداقل 100,000 ریال </Text>
                 و
                 <Text underline style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 14, color: "green", }}> حداکثر 20,000,000 ریال </Text>
                باشد.
                 </Text>
                        </Text>

                    </View>


                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginTop: 25, marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15 }}>

                            مبلغ
                             <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "#a4b0be" }}> (به ریال) </Text>
           :
            </Text>
                    </View>




                    <View style={{ flex: 1, justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                        <Controller
                            control={control}
                            render={({ field: { onBlur } }) => (

                                <TextInput
                                    style={{ backgroundColor: 'white', borderColor: "#dcdde1" , borderWidth: 1, height: 40, padding: 10, borderRadius: 4, marginLeft: "5%", marginRight: "5%" }}
                                    onBlur={onBlur}
                                    onChangeText={Payment => setPeyment(Payment)}
                                    value={Payment}
                                    placeholder="مبلغ خودراواردکنید"
                                    keyboardType={"phone-pad"}
                                />
                            )}
                            name="Numberfhone"
                            rules={{ required: true, minLength: 5 }}
                        />

                       

                    </View>
                 

                    <FormControl>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                            <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} > کدتخفیف:</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: "15%" }}>

                            <Input value={discount} onChange={discount => setdiscount(discount)} variant="outline" placeholder="مثلا hderu11   " w="86%" style={{ height: 40, marginTop: 10, borderWidth: 1, borderColor: "#dcdde1"  }} />
                        </View>
                    </FormControl>





                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 18 }}>
                        <Button onPress={moneypay} colorScheme="green" style={{ width: "95%" }} >
                            <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "white" }}>
                                ثبت
                             </Text>
                        </Button>
                    </View>


                </ScrollView>
            </View>
        </NativeBaseProvider>


    )

}
export default Moneybags