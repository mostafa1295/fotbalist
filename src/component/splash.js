import React, {  useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { NativeBaseProvider, Center, Container, Spinner, Text, Image } from 'native-base'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import { useIsFocused } from '@react-navigation/native';

const Splash = ({ navigation }) => {

 

  const isFocused = useIsFocused();
  const [animating, setAnimating] = useState(true);
 





  const Spal=()=>{

  
  AsyncStorage.getItem("token")
    .then(Token => {
      if(Token == null){
        setAnimating(false);
        navigation.replace('userpage')
      }else{ 
        AsyncStorage.getItem("user")
        .then( value=> {
            if(value == null){
              setAnimating(false);
              navigation.replace('userpage')
            }else{
                let jsonValue = JSON.parse(value);
                
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
                        

                          
                          setAnimating(false);
                          
                          navigation.replace("Home",{
                                  screen:'profile',
                                  // params:{user_uni: jsonValue.unique_code,
                                  //   user_token:Token,}
                          });
                        })
              
                        .catch(function (error) {
                          setAnimating(false);
                          navigation.replace('userpage')
                            
                            
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


     useEffect(()=>{
      
         Spal();
      
     
  

    },[isFocused]);







  return (
    <NativeBaseProvider>
      <Center style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#4cd137" }}>
        <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <StatusBar backgroundColor="#27ae60" />
          <Image source={require('../assets/image/logo.png')} alt="image" style={{ width: 150, height: 150, marginBottom: 20 }} />
          <Text style={{ color: 'white', fontSize: 50, fontFamily: 'IRANSansMobile', marginBottom: 15 }}>
            فوتبالیست
      </Text >
          <Spinner size='lg' color="#2c3e50"
            animating={animating}
          />
        </Container>
      </Center>
    </NativeBaseProvider>


  )









}
export default Splash;

