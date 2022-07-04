
import React, {  Component } from 'react'
import { View,  Text, } from 'native-base'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { Platform } from 'react-native';




class Map extends Component {
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            this.getPermissions()
        } else {
            this.findCoordinates()
        }
      
        this.state = {
            region: {
                latitude: 35.69876465083631,
                longitude: 51.385422684252255,
                latitudeDelta: 0.0980,
                longitudeDelta: 0.0421,
            },
            markers: []
        }
    }





    getPermissions = () => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
        .then(data => {
          if (data === "already-enabled") {
            this.getCurrentPosition()
          } else {
            setTimeout(() => {
              this.getCurrentPosition()
            }, 1000)
          }
        })
      };


    render() {

        return (

            <View>


                <Text
                     
                    onPress={this.getCurrentPosition.bind(this)}
                    style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 15, left: "9%", bottom: 10,marginTop:20 }}>ثبت <Text>موقعیت</Text> مکانی :</Text>
                <MapView
                    style={{ width: "90%", height: 250, marginLeft: "5%" }}
                    region={this.state.region}
                    showsTraffic={true}
                    showsUserLocation={true}

                    onLongPress={this.makeMarker.bind(this)}
                    onRegionChange={this.onregionChange.bind(this)}
                >
                    {
                        this.state.markers.map(this.renderMarker.bind(this))
                    }



                </MapView>





            </View>





        )
    }

    onregionChange({ region }) {
        this.setState({ region });
    }


    makeMarker({ nativeEvent }) {
        const pos = nativeEvent.coordinate;
        this.setState(() => {
            return {
                markers: [

                    {

                        latitude: pos.latitude,
                        longitude: pos.longitude,
                    }
                ]
            }
        })
        this.props.onSelectPos(pos);

    }



    renderMarker(marker, index) {
        return <Marker key={index} coordinate={marker} />
    }


   




    getCurrentPosition() {

        Geolocation.getCurrentPosition(
            
            position => this.setState({
                locationInfo: position,
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0980,
                    longitudeDelta: 0.0421,
                }
            })
            , error => console.log(error)
            , { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 })


    }



}

export default Map


// onLocationPressed = () => {
//     if (Platform.OS === 'android') {
//       RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
//       .then(data => {
//         alert(data);
//       }).catch(err => {
//         // The user has not accepted to enable the location services or something went wrong during the process
//         // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
//         // codes : 
//         //  - ERR00 : The user has clicked on Cancel button in the popup
//         //  - ERR01 : If the Settings change are unavailable
//         //  - ERR02 : If the popup has failed to open
//         alert("Error " + err.message + ", Code : " + err.code);
//       });
//     }
//   }


//   onPress={this.onLocationPressed}
