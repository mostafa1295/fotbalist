import React, { useEffect, useState } from 'react'
import {
    NativeBaseProvider, HStack, Image, Button, View, Icon, Text,
     Input, FormControl, TextArea, Radio, VStack, Select, CheckIcon, Spinner
} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Dimensions, ScrollView, StatusBar, StyleSheet, TouchableOpacity,PermissionsAndroid, Alert } from 'react-native'
import {  launchImageLibrary } from 'react-native-image-picker';
import PersianDatePicker from 'react-native-persian-date-picker2';
import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from 'moment';


const { Width, Height } = Dimensions.get('window');



  

export default function ProfileSetting({ navigation }) {
    


    const [isLoading, setLoading] = useState(true);

    let [Name, setName] = useState("");
    let [Family, setFamily] = useState("");
    let [Codmeli, setCodmeli] = useState("");
    let [Tell, setTell] = useState("");
    let [Father, setFather] = useState("");
    let [Email, setEmail] = useState("");
    let [Sex, setSex] = useState("man");
    let [Ostan, setOstan] = useState("");
    let [City, setCity] = useState("");
    let [Address, setAddress] = useState("");
    let [Instagram,setInstagram]=useState("");
    let [Whatsapp,setWhatsapp]=useState("");
    let [Twitter,setTwitter]=useState("");
    let [Weight,setWeight]=useState("");
    let [Height,setHeight]=useState("");
    let [Discription,setDiscription]=useState("");
    let [Post,setPost]=useState("");
    let [About,setAbout]=useState("");
    // let [OldImage,setOldImage]=useState("");
  
    let [Leg,setLeg]=useState("");
    let [Age,setAge]=useState("");
    const [imageUri, setimageUri] = useState("");
    let [wall, setwall] = useState("");
   let [defaultOstan,setdefaultOstan]=useState("");
     let [defaultCity,setdefaultCity]=useState("");









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
  
     





    const requestPermission = async () => {
        await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
            title: 'Get Read External Storage Access',
            message:'آیا اجازه دسترسی به گالری را می دهید',
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
            message: 'آیا اجازه دسترسی به گالری را می دهید',
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
            } else if (response.assets[0].fileSize >"1500000") {
                Alert.alert(
                
                    "اخطار",
                    "    حجم عکستان نباید بیشتر از 1.5 مگ  باشد     ",
                    [
                        { text: "باشه", }
                      ],
                      
                )
            }else{
                const source = { require: "data:image/jpeg;base64," + response.assets[0].base64 };
                setimageUri(source)
            }
        });
    }








    //ostan and city
   const [stateTag, setStates] = useState('');
   
   const states = async () => {
    
    const  response= await axios.get("https://mirimbazi.ir/api/v1/state");
    setStates(response.data.data.state);
   } 







   useEffect(() => {
      
            states();
    
    }, []);



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


    

  

    useEffect(() => {
         
    AsyncStorage.getItem("user")
    .then(value => {
        if(value == null){
           
        }
        else{
            setLoading(false)
            let jsonValue = JSON.parse(value);
            
            
           
             setName(jsonValue.first_name)
            setFamily(jsonValue.last_name);
            setCodmeli(jsonValue.code_national);
            setTell(jsonValue.tel);
            setFather(jsonValue.father);
            setEmail(jsonValue.email);
            setSex(jsonValue.sex);
            setOstan(jsonValue.state_id);
            setCity(jsonValue.city_id);
            setAddress(jsonValue.address);
            setDiscription(jsonValue.description);
             setHeight(jsonValue.height);
             setWeight(jsonValue.weight);
             setLeg(jsonValue.leg);
             setPost(jsonValue.post);
             setAbout(jsonValue.about_me);
             setInstagram(jsonValue.instagram);
             setWhatsapp(jsonValue.whatsapp);
             setTwitter(jsonValue.twitter);
             setAge(jsonValue.birth)
             setwall(jsonValue.wallet);
              //  setOldImage(jsonValue.image);
              setdefaultOstan(jsonValue.state.state);
            setdefaultCity(jsonValue.city.city);
             
        } 
          
    }).catch(err => {
      
    })
  
    
    }, []);




    let dateSend=birthDate.string
    
  


    const Dataprofile=()=>{
        let  dateUser=(Moment(dateSend,'YYYY-MM-DD').format('YYYY-MM-DD'));
        if (dateUser >"2010-01-01") {
            dateUser=Age
        }
     
        AsyncStorage.getItem("token")
            .then(Token => {
                if (Token == null) {
                } else {
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ Token
          }



 
        
        
        axios.post("https://mirimbazi.ir/api/v1/profile/edit",{
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
             description:Discription,
             instagram:Instagram,
             whatsapp:Whatsapp,
             twitter:Twitter,
             weight:Weight,
             height:Height,
             post:Post,
             about_me:About,
             leg:Leg,
             image:imageUri.require,
              birth:dateUser,
            //  old_image:OldImage,
            
    
        },{
            headers: headers
          })
        .then((response)=>{
           
            AsyncStorage.setItem("user",JSON.stringify(response.data.data.user));
          
            navigation.navigate('profile');
        })
        .catch(function(error){
           
            
        })

    }
})

.catch(err => {

});
        
    }
    

  
    return  !isLoading ? (


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
                    <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 12, }}>{Name} {Family} </Text>
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


         
      
          

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/image/logo.png')} alt="settingprof"
                        style={{ width: 60, height: 60,marginTop:"10%" }}
                    />
                </View>


              





                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 25, marginTop: 20 }}>
                        ویرایش پروفایل
                        
                        </Text>
                </View>
               

                <Spinner size={50}  color="#44bd32"
                   animating={isLoading}
                       /> 


               
                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >نام :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                        <Input value={Name} onChangeText={val=>setName(val)} variant="outline" placeholder="مثلا علی" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>
               





                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >نام خانوادگی :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <Input  value={Family} onChangeText={val=>setFamily(val)} variant="outline" placeholder="مثلا مرادی" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>

                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >کد ملی :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <Input keyboardType={"numeric"}  value={Codmeli} onChangeText={val=>setCodmeli(val)} variant="outline" placeholder="مثلا 032564789" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>

        
                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start",marginLeft: "8%"}}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >تلفن ثابت :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <Input  keyboardType={"numeric"} value={Tell} onChangeText={val=>setTell(val)}  variant="outline" placeholder="مثلا 02125455897" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>


                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >نام پدر :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <Input  value={Father} onChangeText={val=>setFather(val)} variant="outline" placeholder="مثلا محمد" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>

                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >ایمیل :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <Input  keyboardType={"email-address"}  value={Email} onChangeText={val=>setEmail(val)} variant="outline" placeholder="مثلا Example@gmail.com" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >جنسیت :</Text>
                </View>

                <Radio.Group
                    value={Sex}
                    onChange={(Sex) => setSex(Sex)}
                    style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center", }}>

                    <Radio value="man" size="lg" style={{ marginRight: "20%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15 }}> مرد </Text>
                    </Radio>

                    <Radio value="women" size="lg">
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15 }} > زن </Text>
                    </Radio>
                </Radio.Group>


                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 10 }} >استان:</Text>
                </View>
                <VStack style={{ flex: 1, justifyContent: "center",  width:"90%",marginLeft:"5%", marginTop: 15 }} >


                    <Select selectedValue={Ostan}
                     
                        variant="outline"
                        color="#2980b9"

                        accessibilityLabel="استان را انتخاب کنید"

                        placeholder={defaultOstan}
                        placeholderTextColor="black"
                        onValueChange={itemval => afterState(itemval)}
                        _selectedItem={{
                            bg: "cyan.600",
                            endIcon: <CheckIcon size={4} />,

                        }}

                    >
                       {resFetch}
                    </Select>
                </VStack>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 10 }} >شهر:</Text>
                </View>
                <VStack style={{ flex: 1, justifyContent: "center", width:"90%",marginLeft:"5%", marginTop: 15 }} >


<Select selectedValue={City}

    variant="outline"
    color="#2980b9"

    accessibilityLabel="شهر را انتخاب کنید"

    placeholder={defaultCity}
    placeholderTextColor="black"
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
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <Input   value={Address} onChangeText={val=>setAddress(val)}variant="outline" placeholder="مثلا تهران-خیابان مطهری" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "7%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >توضیحات :</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginLeft: 3 }}>

                    <TextArea  value={Discription} onChangeText={val=>setDiscription(val)} placeholder="توضیحات خود را بنویسید..." w={"90%"} style={{ marginTop: 10 }} />
                </View>


                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >آیدی اینستاگرام :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <Input value={Instagram} onChangeText={val=>setInstagram(val)} variant="outline" placeholder="مثلا footbalist" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>
                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >شماره واتس آپ :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <Input value={Whatsapp} onChangeText={val=>setWhatsapp(val)} variant="outline" placeholder="09154143660" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>
                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >آیدی توییتر :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <Input value={Twitter} onChangeText={val=>setTwitter(val)} variant="outline" placeholder="مثلا footbalist" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>

              

                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >قد :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <Input  keyboardType={"numeric"} value={Height} onChangeText={val=>setHeight(val)} variant="outline" placeholder="مثلا 180" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>

                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start",  marginLeft: "8%"}}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >وزن :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <Input  keyboardType={"numeric"} value={Weight} onChangeText={val=>setWeight(val)} variant="outline" placeholder="مثلا 75" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>

                <FormControl>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20 }} >پست مورد علاقه :</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <Input value={Post} onChangeText={val=>setPost(val)} variant="outline" placeholder="مثلا مهاجم" w="90%" style={{ marginTop: 10, borderWidth: 2, }} />
                    </View>
                </FormControl>

           

              

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: 15 }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 20,marginLeft:"5%" }} >درباره من :</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginLeft: 3, marginBottom: 30 }}>

                    <TextArea value={About} onChangeText={val=>setAbout(val)} placeholder="توضیحات خود را بنویسید..." w={"90%"} style={{ marginTop: 10 }} />
                </View> 
                

                
                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 30 }} >چپ پا یا راست پا :</Text>
                </View>

                <VStack style={{ flex: 1, justifyContent: "center", width: Width, marginLeft: "5%",marginRight:"5%", marginTop: 15 }} >



<Radio.Group
                    value={Leg}
                    onChange={(val) => setLeg(val)}
                    style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center", }}>

                    <Radio value="right" size="lg" style={{ marginRight: "20%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15 }}> راست پا </Text>
                    </Radio>

                    <Radio value="left" size="lg">
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15 }} > چپ پا </Text>
                    </Radio>
                </Radio.Group>
                </VStack>










                 

                

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "8%", marginTop: 30 }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15 }} >تصویر پروفایل:</Text>
                </View>
               
                <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
                       

                      
                       <Button colorScheme="green" startIcon={<Icon size={6} as={Ionicons} name="albums" />}
                           style={{ width: "85%",height: 48, justifyContent: 'center', marginTop: 10, marginBottom: 10 }} onPress={() => { openGallery() }} >

                           <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 15,color:"white",marginLeft:10 }}>انتخاب تصویر </Text>
                       </Button>
                   
               </View>



                    
                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "10%",marginTop:35 }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15,}} >تاریخ تولد :</Text>
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
        endYear={1388}
        containerStyle={{backgroundColor:'#bdc3c7',height:260 }}
        pickercontainerStyle={{ }}
        pickerWrapperStyle={{ backgroundColor:'#54a0ff',borderRadius:8,marginLeft:3,marginRight:3,marginTop:20,}}
        pickerItemStyle={{color:'white'}}
        submitTextStyle={{fontFamily: "IRANSansMobile_Bold", fontSize: 18}}
        submitStyle={{backgroundColor:'#2e86de'}}
        defaultValue={[1400,7,5]}
      /> 


    

              
             

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center",marginBottom:"20%",marginTop:"10%" }}>
                    <Button onPress={Dataprofile} colorScheme="green" style={{ width: "95%" }} >
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 18, color: "white" }}>
                             ویرایش 
                             </Text>
                    </Button>
                </View>



            </ScrollView>
        </NativeBaseProvider>

    
    ):(
        <NativeBaseProvider >
            <View style={{width:"100%",height:100,justifyContent:"center",alignItems:"center",marginTop:"30%",}}>
               <Spinner size={50}  color="#44bd32"
             animating={isLoading}
            /> 
           
           
            <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 25, color: "green",marginTop:20 }}>لطفا شکیبا باشید...</Text>
           
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:30 }}>
                    <Image
                        source={require('../../assets/image/logo.png')} alt="settingprof"
                        style={{ width: 60, height: 60,marginTop:"10%" }}
                    />
                </View>
           
           
            </View>
        
            </NativeBaseProvider> 
    )
}




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
      fontSize:15,
      fontFamily: "IRANSansMobile_Bold",
      textAlign:'center',
      color:'white',
      
    }
  });













