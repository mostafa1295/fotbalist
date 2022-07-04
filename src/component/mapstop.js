
import React, { useContext, Component } from 'react'
import { NativeBaseProvider, HStack, Image, Button, View, Icon, Fab, Text, Select, CheckIcon, VStack, Box } from 'native-base'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'




class MapStop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 35.715752,
                longitude: 51.406912,
                latitudeDelta: 0.0012,
                longitudeDelta: 0.0131,
            },
           
        }
    }


    render() {

        return (

            <View>


                <MapView
                    style={{ width: "90%", height: 250, marginLeft: "5%" }}
                    region={this.state.region}
                    showsTraffic={true}

                >



                    <MapView.Marker
                    
                        coordinate={{
                            latitude: 35.715752,
                            longitude: 51.406912,
                        }}

                    />

                </MapView>

            </View>





        )
    }




}

export default MapStop


