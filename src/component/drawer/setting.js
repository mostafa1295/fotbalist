
import React, { useEffect, useState } from 'react'
import { NativeBaseProvider, HStack, Image, Button, View,  Text, Select, VStack, CheckIcon, Checkbox, Box, FormControl, Radio } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Dimensions, Alert, ScrollView, StatusBar, TouchableOpacity, TextInput, StyleSheet, } from 'react-native'

import { useForm, Controller } from 'react-hook-form';
import PersianDatePicker from 'react-native-persian-date-picker2';
import axios from 'react-native-axios';
import Map from '../map';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Moment from 'moment';

const { Width, Height } = Dimensions.get('window');


function Setting({route ,navigation}) {

   
    let [Ostan, setOstan] = useState("");
    let [City, setCity] = useState("");
    const [Sex, setSex] = useState("man");
    let [Name, setName] = useState("");
    let [Family, setFamily] = useState("");
    let [Codmeli, setCodmeli] = useState("");
    let [Mobile, setMobile] = useState("");
    let [Tell, setTell] = useState("");
    let [Father, setFather] = useState("");
    let [Email, setEmail] = useState("");
    let [Address, setAddress] = useState("");
    let [Check, setCheck] = useState("");
    let [Position,setPosition]=useState("");
    let [Positionlon,setPositionlon]=useState("");
    const [GroupValue, setGroupValue] = useState([]);
    let [Otp, setOtp] = useState("");




     




    const { control } = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            Codmeli: '',
            numbermobile: '',
            numbertell: '',
            namefhader: '',
            Emaile: '',
            Address: '',
        }
    });
    


     // // انتخاب تاریخ
     const [datePickerVisibility, setDatePickerVisibility] = React.useState(false);
     const [birthDate, setBirthDate] = React.useState({});
     const toFarsiDigits = function (str) {
       return str.replace(/[0-9]/g, function (w) {
           var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
           return persian[w];
       })
     };
     const onBirthDatePickerConfirm = (objVal)=>{
             let dataString = objVal.value[0] + '-' + objVal.value[1] + '-' + objVal.value[2];
             setBirthDate({
               string : dataString,
               year: objVal.value[0],
               month: objVal.value[1],
               day: objVal.value[2]
             })
             setDatePickerVisibility(false);
             return true;
           }
 
    

  




//نقشه

          function handlePosition(value){
            setPosition(value.latitude);
             setPositionlon(value.longitude)
            
          }









// ست کردن شهر و استان

   const [stateTag, setStates] = useState('');
   
   const states = async () => {
    
    const  response= await axios.get("https://mirimbazi.ir/api/v1/state");
    setStates(response.data.data.state);
   } 

 
    let resFetch=[];

    for(let i = 0; i < stateTag.length; i++){

        resFetch.push(
           
             <Select.Item  key = {i} _text={{
                style: { fontFamily: "IRANSansMobile_Bold" }
            }} label={stateTag[i].state} value={stateTag[i].id} />
        )
    }



    const [allResCity, resCity] = useState('');

    function afterState(id){
       
       
        setOstan(id);
        
        axios.get("https://mirimbazi.ir/api/v1/city?state_id="+id).then((res)=>{
           resCity(res.data.data.city);
        })
    }

    let cityTag=[];

    for(let i = 0; i < allResCity.length; i++){

        cityTag.push(
           
             <Select.Item  key = {i} _text={{
                style: { fontFamily: "IRANSansMobile_Bold" }
            }} label={allResCity[i].city} value={allResCity[i].id} />
        )
    }

    



// AsyncStorage.getItem("OTP")
// .then(value => {
//     setOtp(value);
// }).catch(err => {

// });


  


 let dateSend=birthDate.string 
    

const SendData=()=>{
    

    
       let  dateUser=(Moment(dateSend,'YYYY-MM-DD').format('YYYY-MM-DD'));
       if (dateUser > "2010-01-01") {
          
           dateUser="1400-01-01"
        
       } 

    


    axios.post("https://mirimbazi.ir/api/v1/auth/register",{
        first_name:Name,
        last_name:Family,
        code_national:Codmeli,
        tel:Tell,
        father:Father,
        email:Email,
        sex:Sex,
        address:Address,
        state_id:Ostan,
        city_id:City,
        favorites:GroupValue.join(),
        birth:dateUser,
       lat:Position,
       lon:Positionlon,
        rule:Check,
        mobile:Mobile,
         code:Otp




    })
    .then((response)=>{
        

        if(response.data.message=='code_national'){
  
            Alert.alert(
                
                "اخطار",
                "  لطفا کد ملی را صحیح وارد کنید ",
                [
                    { text: "باشه", }
                  ],
                  
            )
    
        }else if(response.data.message=='birth_error'){

            Alert.alert("اخطار",
                " لطفا سن را صحیح وارد کنید ",
                [
                    { text: "باشه",}
                  ],
                  
            )
    
        }else if(response.data.message=='incorrect_code'){

            Alert.alert("اخطار",
                "کد ارسال شده به موبایل با شماره موبایل یکسان نمی باشد",
                [
                    { text: "باشه",}
                  ],
                  
            )
                }else{
                    AsyncStorage.setItem("user",JSON.stringify(response.data.data.user));
                    AsyncStorage.setItem("token",response.data.data.token);

        navigation.navigate("sendsms",{
            number:Mobile
            // screen:'profile',
            // params:{user_uni: response.data.data.user.unique_code,
            // user_token:response.data.data.token}

            }) 
                }


        





     
       
            
      
    })
    .catch(function(error){
        
         if(error.response.data.errors.first_name){
            Alert.alert(
                
                "اخطار",
                "  لطفا نام خود را وارد کنید ",
                [
                    { text: "باشه"}
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
                "  لطفا تلفن موبایل را صحیح وارد کنید ",
                [
                    { text: "باشه",}
                  ],
                  
            )
           }else if(error.response.data.errors.email){
            Alert.alert(
                
                "اخطار",
                "  لطفا ایمیل را صحیح وارد کنید ",
                [
                    { text: "باشه",}
                  ],
                  
            )
        }else if(error.response.data.errors.favorites){
            Alert.alert(
                
                "اخطار",
                "  لطفا ورزش مورد علاقه وارد کنید ",
                [
                    { text: "باشه", }
                  ],
                  
            )
        }else if(error.response.data.errors.address){
            Alert.alert(
                
                "اخطار",
                "  لطفا آدرس را وارد کنید ",
                [
                    { text: "باشه", }
                  ],
                  
            )
        }else if(error.response.data.errors.father){
            Alert.alert(
                
                "اخطار",
                "  لطفا نام پدر را وارد کنید ",
                [
                    { text: "باشه", }
                  ],
                  
            )
        }else if(error.response.data.errors.tel){
            Alert.alert(
                
                "اخطار",
                "  لطفا تلفن را وارد کنید ",
                [
                    { text: "باشه", }
                  ],
                  
            )
        }else if(error.response.data.errors.code_national){
            Alert.alert(
                
                "اخطار",
                "  لطفا کد ملی را وارد کنید ",
                [
                    { text: "باشه", }
                  ],
                  
            )
        }else if(error.response.data.errors.state_id){
            Alert.alert(
                
                "اخطار",
                "  لطفا نام استان را وارد کنید ",
                [
                    { text: "باشه",}
                  ],
                  
            )
        }else if(error.response.data.errors.city_id){
            Alert.alert(
                
                "اخطار",
                "  لطفا نام شهر را وارد کنید ",
                [
                    { text: "باشه", }
                  ],
                  
            )
        }else if(error.response.data.errors.rule){
            Alert.alert(
                
                "اخطار",
                "  لطفا قوانین را تایید کنید ",
                [
                    { text: "باشه",}
                  ],
                  
            )
        }else if(error.response.data.errors.code){
            Alert.alert(
                
                "اخطار",
                "  لطفا کد ارسال شده به موبایل را وارد کنید ",
                [
                    { text: "باشه",}
                  ],
                  
            )
        }else if(error.response.data.errors.lat){
            Alert.alert(
                
                "اخطار",
                "  لطفا موقعیت مکانی را انتخاب  کنید ",
                [
                    { text: "باشه",}
                  ],
                  
            )
        }
       
    })
    
}



  


useEffect(() => {
   
     
    
         states();
        
},[]);


    return (
        <NativeBaseProvider>
                <HStack style={{ flexDirection: "row-reverse",elevation:3, width: "100%", height: 70, backgroundColor: "#f5f6fa" }}>
                    <StatusBar backgroundColor="#dcdde1" />
                    <HStack>
                    <Image source={require('../../assets/image/logo.png')} alt="image" style={{ width: 40, height: 40, marginTop: "35%",right:10 }} />
                </HStack>
                <TouchableOpacity 
                    style={{flexDirection:"row",borderRadius:10,backgroundColor:"white",elevation:5, right: "5%", width: Width, height: Height, flex: 1, justifyContent: 'center', alignItems: "center", marginTop: 10, marginBottom: 10, marginRight: "20%", marginLeft: "20%" }} onPress={() => navigation.navigate("userpage")} >
                  <Ionicons name="person-add" size={20} color="black" style={{marginRight:20}} />
                    <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 12, }}>ورود/عضویت</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 40, height: 40, flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", right: 15, top: 10 }}>
                    <Ionicons name="arrow-forward" size={35} color="black" />
                </TouchableOpacity>
                </HStack>



            <ScrollView style={{ backgroundColor: 'white' }}>

              
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/image/logo.png')} alt="image"
                        style={{ width: 60, height: 60 ,marginTop:20 }}
                    />
                </View>

                

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 25, marginTop: 20 }}>
                        ثبت نام
                      
                        </Text>
                </View>



                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: 112, marginTop: 20, }}>

                    <Box style={{ backgroundColor: "#EEEEEE", width: "95%", borderLeftWidth: 3, padding: 10, borderLeftColor: "#4cd137" }}>

                        <Text style={{ fontFamily: "IRANSansMobile", fontSize: 16, color: "#26C281", marginLeft: 10, marginTop: 15 }}>ما هرگز شماره تلفن همراه وایمیل شمارا با دیگران به اشتراک نمیگذاریم</Text>
                    </Box>

                </View>
               
         
                 

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >نام :</Text>
                </View>
                <View  style={{ flex: 1, justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                    <Controller
                        control={control}
                        rules={{required:true}}
                        render={({ field: { onBlur } }) => (

                            <TextInput
                                style={{ backgroundColor: 'white', borderColor: '#dfe6e9', borderWidth: 1, height: 40, padding: 10, borderRadius: 4, marginLeft: "5%", marginRight: "5%" }}
                                onBlur={onBlur}
                                onChangeText={value => setName(value)}
                                value={Name}
                                placeholder="علی"
                                keyboardType={"default"}
                            />
                        )}
                        name="firstname"
                        rules={{ required: true, minLength: 3 }}
                    />


                </View>
                
          



                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >نام خانوادگی :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                        <Controller
                            control={control}
                            render={({ field: { onBlur} }) => (

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
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >کد ملی :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                        <Controller
                            control={control}
                            render={({ field: { onBlur } }) => (

                                <TextInput
                                    style={{ backgroundColor: 'white', borderColor: '#dfe6e9', borderWidth: 1, height: 40, padding: 10, borderRadius: 4, marginLeft: "5%", marginRight: "5%" }}
                                    onBlur={onBlur}
                                    onChangeText={value => setCodmeli(value)}
                                    value={Codmeli}
                                    placeholder="0923101195"
                                    keyboardType={"number-pad"}
                                    maxLength={10}
                                />
                            )}
                            name="Codmeli"
                            rules={{ required: true, minLength: 10 }}
                        />
                   
                     

                    </View>
                </FormControl>


                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >شماره موبایل :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                        <Controller
                            control={control}
                            render={({ field: {  onBlur } }) => (

                                <TextInput
                                    style={{ backgroundColor: 'white', borderColor: '#dfe6e9', borderWidth: 1, height: 40, padding: 10, borderRadius: 4, marginLeft: "5%", marginRight: "5%" }}
                                    onBlur={onBlur}
                                    onChangeText={value =>setMobile(value)}
                                    value={Mobile} 
                                    placeholder="09154143630"
                                    keyboardType={"number-pad"}
                                    maxLength={11}
                                />
                            )}
                            name="numbermobile"
                            rules={{ required: true, minLength: 11 }}
                        />


                    </View>
                </FormControl>
           

                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >تلفن ثابت :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                        <Controller
                            control={control}
                            render={({ field: {onBlur } }) => (

                                <TextInput
                                    style={{ backgroundColor: 'white', borderColor: '#dfe6e9', borderWidth: 1, height: 40, padding: 10, borderRadius: 4, marginLeft: "5%", marginRight: "5%" }}
                                    onBlur={onBlur}
                                    onChangeText={value =>setTell(value)}
                                    value={Tell}
                                    placeholder="05133224126"
                                    keyboardType={"phone-pad"}
                                    maxLength={11}
                                />
                            )}
                            name="numbertell"
                            rules={{ required: true, minLength: 11 }}
                        />

                      

                    </View>
                </FormControl>
             
                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >نام پدر :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                        <Controller
                            control={control}
                            render={({ field: { onBlur } }) => (

                                <TextInput
                                    style={{ backgroundColor: 'white', borderColor: '#dfe6e9', borderWidth: 1, height: 40, padding: 10, borderRadius: 4, marginLeft: "5%", marginRight: "5%" }}
                                    onBlur={onBlur}
                                    onChangeText={value => setFather(value)}
                                    value={Father}
                                    placeholder="رضا"
                                />
                            )}
                            name="namefhader"
                            rules={{ required: true, minLength: 3 }}
                        />

                      

                    </View>
                </FormControl>
             

                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >ایمیل :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

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
          

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >جنسیت :</Text>
                </View>

                <Radio.Group
                    value={Sex}
                    onChange={(next) => setSex(next)}
                    style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center", }}>

                    <Radio value="man" size="lg" style={{ marginRight: "20%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15 }}> مرد </Text>
                    </Radio>

                    <Radio value="woman" size="lg">
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15 }} > زن </Text>
                    </Radio>
                </Radio.Group>
            

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%", marginTop: 30 }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15 }} >ورزش های مورد علاقه:</Text>
                </View>



                <View style={{ marginTop: 10, alignItems: "center" }}>
                   
         
        <Checkbox.Group
        style={{marginRight:"65%"}}
        colorScheme="info"
        defaultValue={GroupValue}
        accessibilityLabel="pick an item"
        onChange={(values) => {
          setGroupValue(values || [])
        }}
      >
        <Checkbox value="فوتبال" my="1"  >
        <Text style={{ fontFamily: "IRANSansMobile",fontSize:15, marginLeft: 10 }}>فوتبال</Text>
        </Checkbox>
        <Checkbox value="فوتسال" my="1"  >
        <Text style={{ fontFamily: "IRANSansMobile",fontSize:15, marginLeft: 10 }}>فوتسال</Text>
        </Checkbox>
        <Checkbox value="والیبال" my="1"  >
        <Text style={{ fontFamily: "IRANSansMobile",fontSize:15, marginLeft: 10 }}>والیبال</Text>
        </Checkbox>
        <Checkbox value="بسکتبال" my="1"  >
        <Text style={{ fontFamily: "IRANSansMobile",fontSize:15, marginLeft: 10 }}>بسکتبال</Text>
        </Checkbox>
        <Checkbox value="تنیس" my="1" >
        <Text style={{ fontFamily: "IRANSansMobile",fontSize:15, marginLeft: 10 }}>تنیس</Text>
        </Checkbox>
        
      </Checkbox.Group>
  
                   
                   
                   
                   
                   
                   
                   
                   
                   
                  
                </View>



                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "10%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 10 }} >استان محل سکونت:</Text>
                </View>
                
                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "10%" }}>
                
                </View>
                <VStack style={{ flex: 1, justifyContent: "center", width: Width, marginLeft: "8%", marginRight: "8%", marginTop: 15 }} >


                    <Select  selectedValue={Ostan}
                        variant="outline"
                        color="#2980b9"

                        accessibilityLabel="استان را انتخاب کنید"

                        placeholder="استان را انتخاب کنید"
                        onValueChange={(itemval) =>afterState(itemval)}
                        _selectedItem={{
                            bg: "cyan.600",
                            endIcon: <CheckIcon size={4} />,

                        }}

                    >
                       {resFetch}
                    </Select>
                </VStack>
             

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "10%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 10 }} >شهر محل سکونت:</Text>
                </View>
                <VStack style={{ flex: 1, justifyContent: "center", width: Width, marginLeft: "8%", marginRight: "8%", marginTop: 15 }} >


                    <Select selectedValue={City}
                        variant="outline"
                        color="#2980b9"

                        accessibilityLabel="شهر را انتخاب کنید"

                        placeholder="شهر را انتخاب کنید"
                        onValueChange={(itemval) => setCity(itemval)}
                        _selectedItem={{
                            bg: "cyan.600",
                            endIcon: <CheckIcon size={4} />,

                        }}

                    >
                        {cityTag}
                        
                    </Select>
                </VStack>
            
                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >آدرس :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                        <Controller
                            control={control}
                            render={({ field: { onBlur } }) => (

                                <TextInput
                                    style={{ backgroundColor: 'white', borderColor: '#dfe6e9', borderWidth: 1, height: 40, padding: 10, borderRadius: 4, marginLeft: "5%", marginRight: "5%" }}
                                    onBlur={onBlur}
                                    onChangeText={value => setAddress(value)}
                                    value={Address}
                                    placeholder="تهران-خیابان انقلاب"
                                />
                            )}
                            name="Address"
                            rules={{ required: true, minLength: 2 }}
                        />


                    </View>
              




                </FormControl>

              



    <Map onSelectPos={handlePosition} />
   
                


                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%", marginTop: 20 }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, }} >تاریخ تولد :</Text>
                </View>

                <TouchableOpacity  onPress={()=>{setDatePickerVisibility(true);}} >
        {(birthDate.year) ? <View style={[styles.PersianDatePicker]}>
          <Text style={styles.PersianDatePickerText}>
            {toFarsiDigits(birthDate.day+"")}
          </Text>
          <Text style={styles.PersianDatePickerText}>
            {toFarsiDigits(birthDate.month+"")}
          </Text>
          <Text style={styles.PersianDatePickerText}>
            {toFarsiDigits(birthDate.year+"")}
          </Text>
        </View>
          :
          <View style={[styles.PersianDatePicker]}><Text style={styles.PersianDatePickerText} > انتخاب تاریخ  </Text></View>
        }
      </TouchableOpacity>
    
    <PersianDatePicker
       
        visible={datePickerVisibility}
        onConfirm={onBirthDatePickerConfirm}
        startYear={1330}
        endYear={1398}
        containerStyle={{backgroundColor:'#bdc3c7',height:260 }}
        pickercontainerStyle={{ }}
        pickerWrapperStyle={{ backgroundColor:'#54a0ff',borderRadius:8,marginLeft:3,marginRight:3,marginTop:20,}}
        pickerItemStyle={{color:'white'}}
        submitTextStyle={{fontFamily: "IRANSansMobile_Bold", fontSize: 18}}
        submitStyle={{backgroundColor:'#2e86de'}}
         defaultValue={[1370,7,5]}
      /> 








               

                <View style={{ flexDirection: "row", marginLeft: "10%", marginTop: 20, }}>


                    <Checkbox value={Check} onChange={val=>setCheck(val)}  accessibilityLabel="team" colorScheme="info" size="md" style={{ justifyContent: "center" }} />
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginLeft: "2%", }}>   پذیرفتن  <Text underline onPress={()=>navigation.navigate("lawsStop")}  style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15,color:"blue",}} >قوانین و مقررات</Text></Text>
                </View>


                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >تلفن ثابت :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>

                        <Controller
                            control={control}
                            render={({ field: {onBlur } }) => (

                                <TextInput
                                    style={{ backgroundColor: 'white', borderColor: '#dfe6e9', borderWidth: 1, height: 40, padding: 10, borderRadius: 4, marginLeft: "5%", marginRight: "5%" }}
                                    onBlur={onBlur}
                                    onChangeText={value =>setOtp(value)}
                                    value={Otp}
                                    placeholder="0513"
                                    keyboardType={"phone-pad"}
                                    maxLength={4}
                                />
                            )}
                            name="numbertell"
                            rules={{ required: true, minLength: 4 }}
                        />

                      

                    </View>
                </FormControl>
            

 
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: "20%", marginTop: 40 }}>
                    <Button  onPress={SendData} colorScheme="green" style={{ width: "95%" }} >
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 20, color: "white" }}>
                            مرحله بعد
                             </Text>
                    </Button>
                </View>




            </ScrollView>
        </NativeBaseProvider>


    )

}
export default Setting;


const styles = StyleSheet.create({
    PersianDatePicker:{
      width:"85%",
      flexDirection:'row',
      justifyContent:'center',
      alignItems:"center",
      padding:10,
      paddingRight:1,
      paddingLeft:1,
      borderRadius:6,
      marginBottom:30,
      backgroundColor:'#20bf6b',
      marginLeft:"8%",
      
  
      
    },
    PersianDatePickerText:{
      flex:1,
      padding:0,
      fontSize:18,
      fontFamily: "IRANSansMobile_Bold",
      textAlign:'center',
      color:'white',
    }
  });


  









