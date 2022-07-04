import React, { useState } from 'react'
import { NativeBaseProvider, HStack, Image, Button, View, Icon, Text, Select, CheckIcon, VStack,Box, FormControl, TextArea} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Dimensions, ScrollView, StatusBar, TouchableOpacity,TextInput, PermissionsAndroid, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

import MapStop from '../mapstop';
const { Width, Height } = Dimensions.get('window');



function Calling({ navigation }) {

   
    let [Team, setTeam] = useState("");
    let [Name, setName] = useState("");
    let [Family, setFamily] = useState("");
    let [Mobile, setMobile] = useState("");
    let [Email, setEmail] = useState("");
    let [Discription,setDiscription]=useState("");
    const [imageUri, setimageUri] = useState();
    

    const { control} = useForm({
        defaultValues: {
          Numberfhone: '',
          
        }
      });
    
    
       
    


      

      const requestPermission = async () => {
        await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
            title: 'Get Read External Storage Access',
            message: 'get read external storage access for detecting screenshots',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        }
        );
    }

    const requestPermission2 = async () => {
        await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            title: 'Get Read External Storage Access',
            message: 'get read external storage access for detecting screenshots',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        }
        );
    }


      const openGallery = () => {
        requestPermission();
        requestPermission2(); 


        let options = {
            storageOption: {
                path: "images",
                mediaType: "photo",
                
            },
            includeBase64: true,

        };

        launchImageLibrary(options, response => {
            console.log("Response=", response);
            if (response.didCancel) {
                console.log("user canceled image picker");
            } else if (response.error) {
                console.log("image picker Error:", response.error);
            } else if (response.customButton) {
                console.log("user tooped customButton:", response.customButton);
            } else {
                const source = { require: "data:image/jpeg;Base64," + response.assets[0].base64 };
                setimageUri(source)
            }
        });
    }


    const SendReport = async () => {
      

       
        axios.post('https://mirimbazi.ir/api/v1/contact-us', {
            subject:Team,
            first_name:Name,
            last_name:Family,
            mobile:Mobile,
            email:Email,
            description:Discription,
           
             
        })

            .then(response => {
           
              navigation.navigate("profile")
                
                  
            })
            .catch(function (error) {
              
                if(error.response.data.errors.subject){
                    Alert.alert(
                        
                        "اخطار",
                        "  لطفا موضوع خود را وارد کنید ",
                        [
                            { text: "باشه",}
                          ],
                          
                    )
                   }else
                if(error.response.data.errors.first_name){
                    Alert.alert(
                        
                        "اخطار",
                        "  لطفا نام خود را وارد کنید ",
                        [
                            { text: "باشه",}
                          ],
                          
                    )
                   }else if(error.response.data.errors.last_name){
                    Alert.alert(
                        
                        "اخطار",
                        "  لطفا نام خانوادگی را  وارد کنید ",
                        [
                            { text: "باشه",}
                          ],
                          
                    )
                   }else if(error.response.data.errors.mobile){
                    Alert.alert(
                        
                        "اخطار",
                        "  لطفا موبایل خود را وارد کنید ",
                        [
                            { text: "باشه",}
                          ],
                          
                    )
                   }else if(error.response.data.errors.email){
                    Alert.alert(
                        
                        "اخطار",
                        "  لطفا ایمیل خود را  وارد کنید ",
                        [
                            { text: "باشه",}
                          ],
                          
                    )
                   }else if(error.response.data.errors.description){
                    Alert.alert(
                        
                        "اخطار",
                        "  لطفا توضیحات خود را  وارد کنید ",
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
        <HStack style={{ flexDirection: "row-reverse",elevation:3, width: "100%", height: 70, backgroundColor: "#f5f6fa" }}>
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




            <ScrollView style={{ backgroundColor: 'white' }}>

<View style={{flex: 1,width:"90%" ,height:1800,borderWidth:0.5,borderColor:"#dcdde1",margin:"5%",elevation:3,borderRadius:5}} >


               

                <View style={{  alignItems: "flex-start",marginLeft:"10%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 18, marginTop:20 }}>
                         اطلاعات فوتبالیست
                        </Text>
                        <View style={{width:"45%",height:2,backgroundColor:"green"}}></View>
                </View>

                <View style={{  alignItems: "flex-start",marginLeft:"10%", marginTop:"10%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15}}>
                         نشانی 
                        </Text>
                        <View style={{width:"18%",height:2,backgroundColor:"#26C281"}}></View>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 13,marginTop:"5%"}}>
                         تهران  خ  ولیعصر کوچه رهبان پ 12 
                        </Text>
                </View>

                <View style={{ alignItems: "flex-start",marginLeft:"10%",marginTop:"10%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 18 }}>
                         ایمیل 
                        </Text>
                        <View style={{width:"18%",height:2,backgroundColor:"#26C281"}}></View>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 13,marginTop:"5%",color:"blue"}}>
                         info@mirimbazi.ir 
                        </Text>
                </View>

                <View style={{  alignItems: "flex-start",marginLeft:"10%",marginTop:"10%",marginBottom:"10%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 18  }}>
                          تلفن
                        </Text>
                        <View style={{width:"18%",height:2,backgroundColor:"#26C281"}}></View>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 13,marginTop:"5%"}}>
                        +98 21 91070296   
                        </Text>
                </View>

                <MapStop/>

                <View style={{width:"90%",height:2,backgroundColor:"#dcdde1",marginLeft:"5%",marginTop:20}}></View>


                 <View style={{  alignItems: "flex-start",marginLeft:"10%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 18, marginTop:20 }}>
                         تماس با فوتبالیست
                        </Text>
                        <View style={{width:"45%",height:2,backgroundColor:"green"}}></View>
                </View>

                <View style={{  justifyContent: "center", alignItems: "flex-start",  marginLeft: "7%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >موضوع   :</Text>
                </View>
                <VStack style={{  justifyContent: "center", width: Width, marginLeft: "5%", marginRight: "5%", marginTop: 15 }} >


                    <Select selectedValue={Team}
                        variant="filled"
                        color="#2980b9"

                        accessibilityLabel="  انتخاب کنید"

                        placeholder="   انتخاب کنید"
                        onValueChange={(Team) => setTeam(Team)}
                        _selectedItem={{
                            bg: "cyan.600",
                            endIcon: <CheckIcon size={4} />,

                        }}

                    >
                        <Select.Item  _text={{
                            style: { fontFamily: "IRANSansMobile_Bold" }
                        }} label="انتقاد و پیشنهاد" value="انتقاد و پیشنهاد" />
                        <Select.Item _text={{
                            style: { fontFamily: "IRANSansMobile_Bold" }
                        }} label="گزارش تخلف " value="گزارش تخلف " />
                          <Select.Item _text={{
                            style: { fontFamily: "IRANSansMobile_Bold" }
                        }} label="درخواست همکاری  " value="درخواست همکاری  " />
                    </Select>
                </VStack>
              

               
                <View style={{  justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >نام :</Text>
                </View>
                <View style={{  justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                    <Controller
                        control={control}
                        render={({ field: { onBlur } }) => (

                            <TextInput
                                style={{ backgroundColor: 'white', borderColor: '#dfe6e9', borderWidth: 1, height: 40, padding: 10, borderRadius: 4, marginLeft: "5%", marginRight: "5%" }}
                                onBlur={onBlur}
                                onChangeText={value => setName(value)}
                                value={Name}
                                placeholder="علی"
                            />
                        )}
                        name="firstname"
                        rules={{ required: true, minLength: 3 }}
                    />

                </View>
               

                <FormControl>
                    <View style={{  justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >نام خانوادگی :</Text>
                    </View>
                    <View style={{ justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                        <Controller
                            control={control}
                            render={({ field: { onBlur } }) => (

                                <TextInput
                                    style={{ backgroundColor: 'white', borderColor: '#dfe6e9', borderWidth: 1, height: 40, padding: 10, borderRadius: 4, marginLeft: "5%", marginRight: "5%" }}
                                    onBlur={onBlur}
                                    onChangeText={value => setFamily(value)}
                                    value={Family}
                                    placeholder="احسانی"
                                />
                            )}
                            name="lastname"
                            rules={{ required: true, minLength: 4 }}
                        />


                    </View>

               

                </FormControl>
                <FormControl>
                    <View style={{  justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >شماره موبایل :</Text>
                    </View>
                    <View style={{  justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                        <Controller
                            control={control}
                            render={({ field: {  onBlur, } }) => (

                                <TextInput
                                    style={{ backgroundColor: 'white', borderColor: '#dfe6e9', borderWidth: 1, height: 40, padding: 10, borderRadius: 4, marginLeft: "5%", marginRight: "5%" }}
                                    onBlur={onBlur}
                                    onChangeText={value => setMobile(value)}
                                    value={Mobile}
                                    placeholder="09154143630"
                                    keyboardType={"numeric"}
                                />
                            )}
                            name="numbermobile"
                            rules={{ required: true, minLength: 11 }}
                        />

                       

                    </View>
                </FormControl>

                <FormControl>
                    <View style={{ justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >ایمیل :</Text>
                    </View>
                    <View style={{  justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                        <Controller
                            control={control}
                            render={({ field: { onBlur } }) => (

                                <TextInput
                                    style={{ backgroundColor: 'white', borderColor: '#dfe6e9', borderWidth: 1, height: 40, padding: 10, borderRadius: 4, marginLeft: "5%", marginRight: "5%" }}
                                    onBlur={onBlur}
                                    onChangeText={value => setEmail(value)}
                                    value={Email}
                                    placeholder="Example@gmail.com"
                                    keyboardType={"email-address"}
                                    
                                    
                                />
                            )}
                            name="Emaile"
                            rules={{ required: true, minLength: 11 }}
                        />

                       

                    </View>
                </FormControl>

                <View style={{  justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >توضیحات :</Text>
                </View>
                <View style={{  alignItems: "center", justifyContent: "center", marginLeft: 10 }}>

                    <TextArea keyboardType={"default"} value={Discription} onChangeText={(value)=>setDiscription(value)} placeholder="توضیحات خود را بنویسید..." w={"90%"} style={{ marginTop: 10 }} />
                </View>

                <View style={{  justifyContent: "center", alignItems: "flex-start", marginLeft: "8%", marginTop: 30 }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15 }} >تصویر ضمیمه:</Text>
                </View>
               
                <View style={{ justifyContent:"center",alignItems:"center" }}>
                       

                      
                       <Button colorScheme="green" startIcon={<Icon size={7} as={Ionicons} name="albums" />}
                           style={{ width: "60%",height: 50, justifyContent: 'center', marginTop: 10, marginBottom: 10 }} onPress={() => { openGallery() }} >

                           <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 15,color:"white",marginLeft:10 }}>  انتخاب تصویر</Text>
                       </Button>
                   
               </View>





                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Button onPress={SendReport} colorScheme="green" style={{ width: "90%" }} >
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 20, color: "white" }}>
                            ثبت 
                             </Text>
                    </Button>
                </View>

</View>
            </ScrollView>
        </NativeBaseProvider>


    )

}
export default Calling