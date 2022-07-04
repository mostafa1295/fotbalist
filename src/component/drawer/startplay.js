import React, {  useState } from 'react'
import { NativeBaseProvider, HStack, Image, Button, View, Text, Select, CheckIcon, VStack, Checkbox } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Dimensions, ScrollView, StatusBar, TouchableOpacity,StyleSheet, Alert} from 'react-native'
import PersianDatePicker from 'react-native-persian-date-picker2';
import Map from '../map'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios'
import Moment from 'moment';
import moment from 'jalali-moment'


const { Width, Height } = Dimensions.get('window');


 
function Startplay({ navigation }) {

    let [Ground, setGround] = useState("");
    let [Age, setAge] = useState("");
    let [Position,setPosition]=useState("");
    let [Positionlon,setPositionlon]=useState("");
    let [Token, setTokon] = useState();
    const [GroupValue, setGroupValue] = useState([]);
  

 
   

 

    





//نقشه

function handlePosition(value){
    setPosition(value.latitude);
    setPositionlon(value.longitude)
  }

  
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

         


          AsyncStorage.getItem("token")
              .then(value => {
                  setTokon(value);
              }).catch(err => {
      
              });
      

    
            
 let dateSend=birthDate.string 

  
let  dateUser=(Moment(dateSend,'YYYY-MM-DD').format('YYYY-MM-DD'));


 let milady=moment.from(dateUser, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');

 let week =moment.from(milady, "en", "YYYY/MM/DD").locale("fa").format("ddd")

  

  
    const ToStart=()=> {



        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Token
        }

        axios.post('https://mirimbazi.ir/api/v1/request', {
                type_ground: Ground,
                time_range:GroupValue.join(),
                age_range:Age,
                day:week,
                date:dateUser,
                lat:Position,
                lon:Positionlon,
       
      },{
        headers: headers
    })
      .then(response=> {
     
      
      if(response.data.message=='old-time'){
        Alert.alert("اخطار",
        "محدوده زمانی انتخاب شده سپری شده است",
        [
            { text: "باشه" }
          ],    
    )
      }else
        if(response.data.message=='ground-error'){

            Alert.alert("اخطار",
                " با توجه به نوع مکان انتخاب شده زمینی در نزدیکی شما وجود ندارد، لطفا نوع زمین انتخاب شده خود را تغییر دهید",
                [
                    { text: "باشه" }
                  ],
                  
            )

        }else if(response.data.message=='date_error'){
          Alert.alert("اخطار",
          "  تاریخ رزرو مجاز نمی باشد،حداکثر تاریخ رزرو 6 روز بعد از تاریخ فعلی می باشد",
          [
              { text: "باشه" }
            ],    
      )
        }else
        if(response.data.message=='radius-error'){
          Alert.alert("اخطار",
          "تا رنجی که بازگشت داده میشود(به کیلومتر) هیچ زمینی برای رزرو کاربر پیدا نشده است و کاربر باید موقعیت مکانی خود را تغییر دهید",
          [
              { text: "باشه" }
            ],    
      )
        }else if(response.data.message=='day-error'){
          Alert.alert("اخطار",
          "تا رنجی که بازگشت داده میشود(به کیلومتر) در روز انتخاب شده هیچ زمینی برای رزرو کاربر پیدا نشده است و کاربر باید روز رزرو خود را تغییر دهد",
          [
              { text: "باشه"}
            ],    
      )
        }else if(response.data.message=='time-error'){
          Alert.alert("اخطار",
          "تا رنجی که بازگشت داده میشود(به کیلومتر) در محدوده زمانی انتخاب شده هیچ زمینی برای رزرو کاربر پیدا نشده است و کاربر باید محدوده زمانی روز رزرو خود را تغییر دهد",
          [
              { text: "باشه" }
            ],    
      )
        }else if(response.data.message=='not-money'){
          Alert.alert("اخطار",
          "موجودی کیف پول شما کافی نمی باشد، مبلغ بازگشتی هزینه سانس انتخاب شده به ریال می باشد",
          [
              { text: "باشه"}
            ],    
      )
        } else if(response.data.message=='full-sanse'){
          Alert.alert("اخطار",
          "تمامی ظرفیت های سالن ها در زمان های انتخابی شما تکمیل شده است، لطفا روز دیگری را انتخاب نمایید",
          [
              { text: "باشه"}
            ],    
      )
        }else{

            navigation.navigate("Home",{
                screen:"report"})
         

    }
        
        
        

      }) 
      .catch(function (error) {
   
        if (error.response.data.errors.type_ground) {
            Alert.alert(
                
                "اخطار",
                "  لطفا نوع زمین را انتخاب کنید  ",
                [
                    { text: "باشه",}
                  ],
                  
            )
        }else  if (error.response.data.errors.day) {
            Alert.alert(
                
                "اخطار",
                "  لطفا زمان را تغییردهید  ",
                [
                    { text: "باشه", }
                  ],
                  
            )
        }else   if (error.response.data.errors.age_range) {
            Alert.alert(
                
                "اخطار",
                "  لطفا محدوده سنی را مشخص کنید  ",
                [
                    { text: "باشه", }
                  ],
                  
            )
        }else   if (error.response.data.errors.time_range) {
            Alert.alert(
                
                "اخطار",
                "  لطفا تایم سانس را مشخص کنید  ",
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



            <ScrollView  style={{ flex: 1, backgroundColor: "white", height: "100%" }}>



                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/image/logo.png')} alt="start"
                        style={{ width: 60, height: 60, marginTop: "10%" }}
                    />
                </View>


                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 25, marginTop: 10 }}>
                        درخواست بازی
           
                        </Text>
                </View>

              

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "10%",marginTop: 15 }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, }} >زمین بازی:</Text>
                </View>
                <VStack style={{ flex: 1, justifyContent: "center", width: Width, marginLeft: "8%", marginRight: "8%", marginTop: 15 }} >


                    <Select selectedValue={Ground}
                        variant="outline"
                        color="#2980b9"

                        accessibilityLabel="زمین را انتخاب کنید"

                        placeholder="زمین را انتخاب کنید"
                        onValueChange={(value) => setGround(value)}
                        _selectedItem={{
                            bg: "cyan.600",
                            endIcon: <CheckIcon size={4} />,

                        }}

                    >
                     
                        <Select.Item  _text={{
                            style: { fontFamily: "IRANSansMobile_Bold" }
                        }} label="چمن طبیعی" value="چمن طبیعی"/>
                        <Select.Item _text={{
                            style: { fontFamily: "IRANSansMobile_Bold" }
                        }} label="چمن مصنوعی" value="چمن مصنوعی" />
                        <Select.Item _text={{
                            style: { fontFamily: "IRANSansMobile_Bold" }
                        }} label="فوتسال(کفپوش)" value="فوتسال(کفپوش)" />
                        <Select.Item _text={{
                            style: { fontFamily: "IRANSansMobile_Bold" }
                        }} label="خاکی" value="خاکی" />
                        <Select.Item _text={{
                            style: { fontFamily: "IRANSansMobile_Bold" }
                        }} label="سایر" value="سایر" />
                    </Select>
                </VStack>


   
        

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "9%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 10 }} > محدوده سنی:</Text>
                </View>
                <VStack style={{ flex: 1, justifyContent: "center", width: Width, marginLeft: "8%", marginRight: "8%", marginTop: 15 }} >


                    <Select selectedValue={Age}
                        variant="outline"
                        color="#2980b9"

                        accessibilityLabel="رده سنی را انتخاب کنید"

                        placeholder="رده سنی را انتخاب کنید"
                        onValueChange={(itemval) => setAge(itemval)}
                        _selectedItem={{
                            bg: "cyan.600",
                            endIcon: <CheckIcon size={4} />,

                        }}

                    >
                        <Select.Item _text={{
                            style: { fontFamily: "IRANSansMobile_Bold" }
                        }} label=" نونهال (تا12سال)  " value=" نونهال   " />
                        <Select.Item _text={{
                            style: { fontFamily: "IRANSansMobile_Bold" }
                        }} label="نوجوان(12-22) " value="نوجوان " />
                        <Select.Item _text={{
                            style: { fontFamily: "IRANSansMobile_Bold" }
                        }} label=" بزرگسال(22سال به بالا)" value=" بزرگسال" />
                    </Select>
                </VStack>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "10%" }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, marginTop: 10 }} >زمان برگزاری :</Text>
                </View>

                <View style={{ marginTop: 10, alignItems: "center" }}>
                   
               
           <Checkbox.Group
           style={{marginRight:"45%"}}
           colorScheme="info"
           defaultValue={GroupValue}
           accessibilityLabel="pick an item"
           onChange={(values) => {
             setGroupValue(values || [])
           }}
         >
           <Checkbox value=" صبح (6-12)" my="1"  >
           <Text style={{ fontFamily: "IRANSansMobile",fontSize:15, marginLeft: 10 }}>صبح (6-12)</Text>
           </Checkbox>
           <Checkbox value=" ظهر-عصر " my="1"  >
           <Text style={{ fontFamily: "IRANSansMobile",fontSize:15, marginLeft: 10 }}>ظهر - عصر</Text>
           </Checkbox>
           <Checkbox value=" شب ( 7  شب به بعد)" my="1"  >
           <Text style={{ fontFamily: "IRANSansMobile",fontSize:15, marginLeft: 10 }}>شب ( 7 شب به بعد)</Text>
           </Checkbox>
           
           
         </Checkbox.Group>
         </View>
               

          


                <Map  onSelectPos={handlePosition}/>


                
               


                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "10%", marginTop: 35,marginBottom:10 }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, }} >تاریخ رزرو:</Text>
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
        startYear={1400}
        endYear={1403}
        containerStyle={{backgroundColor:'#bdc3c7',height:260 }}
        pickercontainerStyle={{ }}
        pickerWrapperStyle={{ backgroundColor:'#54a0ff',borderRadius:8,marginLeft:3,marginRight:3,marginTop:20,}}
        pickerItemStyle={{color:'white'}}
        submitTextStyle={{fontFamily: "IRANSansMobile_Bold", fontSize: 18}}
        submitStyle={{backgroundColor:'#2e86de'}}
        defaultValue={[1400,7,5]}
      /> 

<View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginLeft: "10%", marginTop: 5 }}>
                    <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, paddingBottom: 8 }} >روز رزرو:</Text>
                </View>
               


<View style={{width:"85%",height:50,justifyContent:"center",alignItems:"flex-start",borderRadius:5,borderWidth:1,borderColor:"#dcdde1",marginLeft:"8%"}}>
  <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15,marginLeft:"5%",color:"#45aaf2"}}>{(week=="Invalid date"?"تاریخ را انتخاب کنید":week)}</Text>  
</View>



                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50, marginBottom: 20 }}>
                    <Button colorScheme="green" style={{ width: "95%" }} onPress={ToStart} >
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15, color: "white" }}>
                            ثبت درخواست
                             </Text>
                    </Button>
                </View>

            </ScrollView>




        </NativeBaseProvider>


    )

}
export default Startplay



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