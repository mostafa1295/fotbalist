import React, { useState } from 'react'
import { NativeBaseProvider, HStack, Image, Button, View,  Text, Box, Heading, Spinner } from 'native-base'
import  Ionicons  from 'react-native-vector-icons/Ionicons'
import { ScrollView, StatusBar, TextInput, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form';
import axios from 'react-native-axios';






function Userpage ({navigation}) {

    let [Mobile, setMobile] = useState("");
    const [isLoading, setLoading] = useState(false);



    const { control, } = useForm({
        defaultValues: {
          Numberfhone: '',
          
        }
      });
      
     


     



const postdata=()=>{

    setLoading(true)
   
     axios.post('https://mirimbazi.ir/api/v1/auth/send-sms', {
        mobile: Mobile,
       
      })
      .then((response)=> {
       
        setLoading(false)

        if (response.data.data.status_user=="no-account") {
             navigation.navigate("setting",{number:Mobile})
        }else{
             navigation.navigate("sendsms",{number:Mobile})
        }
        
        
       

       })
    
      .catch(function (error) {
       
         if (error.response.data.errors.mobile) {
          Alert.alert(
              
              "اخطار",
              "  لطفا شماره موبایل را وارد کنید  ",
              [
                  { text: "باشه",}
                ],
                
          )
      }
        
      });
}




        return (
            <NativeBaseProvider>
                <HStack style={{ flexDirection: "row-reverse",elevation:3, width: "100%", height: 70, backgroundColor: "#f5f6fa" }}>
                    <StatusBar backgroundColor="#dcdde1" />
                    <HStack>
                    <Image source={require('../assets/image/logo.png')} alt="image" style={{ width: 40, height: 40, marginTop: "35%",right:10 }} />
                </HStack>
               
               
                </HStack>
                
                <ScrollView style={{ backgroundColor: 'white' }}>

                  
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/image/logo.png')} alt="image"
                            style={{ width: 60, height: 60,marginTop:20 }}
                        />
                    </View>
                    <View style={{flexDirection:"row", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/image/vezarat.png')} alt="image" style={{width:100,height:90,right:"40%",bottom:"5%"}} />
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 25 }}>
                            ورود کاربر
                         </Text>
                         <Image source={require('../assets/image/shahrdary.png')} alt="image" style={{width:100,height:70,left:"40%",bottom:"5%"}} />
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: 112, marginTop: 20, }}>

                        <Box style={{ backgroundColor: "#EEEEEE", width: "95%", borderLeftWidth: 3, borderLeftColor: "#4cd137" }}>
                            <Heading style={{ marginLeft: 10, marginTop: 10 }}>
                                <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 20, color: "#26C281" }}>
                                    خوش آمدید
                                    !
                    </Text>

                            </Heading>
                            <Text style={{ fontFamily: "IRANSansMobile", fontSize: 15, color: "#26C281",  marginLeft: 10, marginTop: 15 }}>لطفا شماره موبایل خود را وارد کنید تا کد فعالسازی برایتان ارسال شود.</Text>
                        </Box>

                    </View>
                    
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", marginTop: 25, marginLeft: "8%" }}>
                        <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: 15 }}>
                            شماره موبایل:
            </Text>
                    </View>




<View style={{flex: 1,justifyContent: 'center',padding: 8,backgroundColor: 'white'}}>
    
    <Controller
      control={control}
      render={({field: {onBlur }}) => (
          
        <TextInput
          style={{ backgroundColor: 'white',height: 40,padding: 10,borderRadius: 4, marginLeft:"5%",marginRight:"5%"}}
          onBlur={onBlur}
          onChangeText={Mobile=>setMobile(Mobile)}
          value={Mobile}
          placeholder="09120336558"
          maxLength={11}
          keyboardType={"phone-pad"}
         underlineColorAndroid="blue"
        
        />
        
      )}
      name="Numberfhone"
      rules={{ required: true,minLength: 11 }}
    />
   
        
  
  </View> 
  

  <Spinner size={30}  color="#44bd32"
                   animating={isLoading}
                       />
        

                     <View style={{flex:1,justifyContent:"center",alignItems:"center",marginBottom:18}}>
                         <Button onPress={postdata}   colorScheme="green" style={{width:"95%"}} >
                             <Text style={{fontFamily:"IRANSansMobile_Bold",fontSize:15,color:"white"}}>
                                  مرحله بعدی
                             </Text>
                         </Button>
                     </View>

                        
                    


                </ScrollView>
            </NativeBaseProvider>


        )
    
}


export default Userpage



