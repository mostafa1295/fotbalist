import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView,  DrawerItemList } from '@react-navigation/drawer';

import Calling from './drawer/calling';
import Profile from './drawer/profile';
import ProfileSetting from './drawer/profilesetting';
import Report from './drawer/report'
import Startplay from './drawer/startplay';
import { useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NativeBaseProvider, View,  Image } from 'native-base';
import Peyment from './drawer/payment';
import Moneybags from './drawer/moneybags';
import Laws from './drawer/laws';
import HomeScreen from './drawer/homescreen';






const Drawer = createDrawerNavigator();
const UserView = () => {
    return <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>

        <Image source={require('../assets/image/logo.png')} alt="draw" style={{ width: 50, height: 50 }} />

    </View>
}
const CustumDrawer = (props) => {

   


    return (
        <NativeBaseProvider>


            <View style={{ flex: 1 }}>
                <UserView />
                <DrawerContentScrollView style={{ backgroundColor: "white" }}  {...props}     >
                    <DrawerItemList {...props}
                    />
                    
    
                   
                </DrawerContentScrollView>

            </View>
        </NativeBaseProvider>
    )
}  


const Drawerlay = () => {

    const dimention = useWindowDimensions();
    const drawerType = dimention.width >= 700 ? 'permanent' : 'front'



    return (



        <Drawer.Navigator initialRouteName="homescreen"
            screenOptions={{
                drawerType: { drawerType },
                drawerPosition: "right",
                drawerStyle: { width: 300 }
            }}
            drawerContent={(props) => <CustumDrawer {...props} />}
        >

            <Drawer.Screen  name="homescreen" component={HomeScreen} options={{
                drawerLabel:"خانه ",
                drawerLabelStyle: { fontSize: 13, fontFamily: "IRANSansMobile" }, drawerInactiveTintColor: "black", drawerActiveTintColor: "#0984e3", headerShown: false,
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} /> 
                    ) 
                    }} />



            <Drawer.Screen name="startplay" component={Startplay} options={{
                drawerLabel:"شروع بازی ",
                drawerLabelStyle: { fontSize: 13, fontFamily: "IRANSansMobile" }, headerShown: false, drawerIcon: ({ color, size }) => (
                    <Ionicons name="walk" size={size} color={color} />
                )
            }} />






            <Drawer.Screen name="profile" component={Profile} options={{
                drawerLabel:" مشاهده پروفایل ",
                drawerLabelStyle: { fontSize: 13, fontFamily: "IRANSansMobile" }, headerShown: false, drawerIcon: ({ color, size }) => (
                    <Ionicons name="person-circle-outline" size={size} color={color} />
                )
            }} />


            <Drawer.Screen name="profilesetting" component={ProfileSetting} options={{
                drawerLabel:"ویرایش پروفایل  ",
                drawerLabelStyle: { fontSize: 13, fontFamily: "IRANSansMobile" }, headerShown: false, drawerIcon: ({ color, size }) => (
                    <Ionicons name="cog" size={size} color={color} />
                )
            }} />




            <Drawer.Screen name="report" component={Report} options={{
                drawerLabel:"گزارش درخواست های بازی",
                drawerLabelStyle: { fontSize:13, fontFamily: "IRANSansMobile" }, headerShown: false, drawerIcon: ({ color, size }) => (
                    <Ionicons name="football-outline" size={size} color={color} />
                )
            }} />

            <Drawer.Screen name="payment" component={Peyment} options={{
                drawerLabel:"تراکنش ها ",
                drawerLabelStyle: { fontSize: 13, fontFamily: "IRANSansMobile" }, headerShown: false, drawerIcon: ({ color, size }) => (
                    <Ionicons name="logo-usd" size={size} color={color} />
                )
            }} />

            <Drawer.Screen name="moneybags" component={Moneybags} options={{
                drawerLabel:"افزایش موجودی کیف پول",
                drawerLabelStyle: { fontSize: 13, fontFamily: "IRANSansMobile" }, headerShown: false, drawerIcon: ({ color, size }) => (
                    <Ionicons name="cash-outline" size={size} color={color} />
                )
            }} />




            <Drawer.Screen name="calling" component={Calling} options={{
                drawerLabel:" ارتباط با ما ",
                drawerLabelStyle: { fontSize: 13, fontFamily: "IRANSansMobile" }, headerShown: false, drawerIcon: ({ color, size }) => (
                    <Ionicons name="headset-outline" size={size} color={color} />
                )
            }} />

            <Drawer.Screen name="laws" component={Laws} options={{
                drawerLabel:"   شرایط و قوانین ",
                drawerLabelStyle: { fontSize:13, fontFamily: "IRANSansMobile" }, headerShown: false, drawerIcon: ({ color, size }) => (
                    <Ionicons name="shield-outline" size={size} color={color} />
                )
            }} />

        </Drawer.Navigator>




    )

}
export default Drawerlay;