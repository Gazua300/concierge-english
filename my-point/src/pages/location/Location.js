import { useContext, useState, useRef, useEffect } from "react"
import Context from "../../global/Context"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import * as Position from 'expo-location'
import MyLocation from 'react-native-vector-icons/MaterialIcons'
import LocationFooter from "../../components/LocationFooter"
// import MapViewDirections from "react-native-maps-directions"
// import config from '../../../config'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native'




const Location = (props)=>{
    const mapRef = useRef(null)
    const { states } = useContext(Context)
    const place = states.place
    const [mapType, setMapType] = useState('standard')
    const [location, setLocation] = useState({})
    // const origin = {latitude: location.latitude, longitude: location.longitude}
    // const destination = {latitude: place.latitude, longitude: place.longitude}
    
console.log(place)

    useEffect(()=>{
        (async()=>{

            let { status } = await Position.requestForegroundPermissionsAsync()

            if(status !== 'granted'){
                setErrorMsg('App não tem permissão para acessar localizaçõa')
            }

            const { latitude, longitude } = (await Position.getCurrentPositionAsync()).coords
            const region = {
                latitude,
                longitude,
            }
            
            region && setLocation(region)
            
        })()
    }, [])


    const getLocation = async()=>{
        const region = {
            latitude: place.latitude,
            longitude: place.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
        }

        return region
    }

    const goToLocation = async()=>{
        const region = await getLocation()
        region && mapRef.current.animateToRegion(region, 3000)
    }

    
    const changeMapType = (type)=>{
        setMapType(type)
    } 

    return(
        <View style={styles.container}>            
            <MapView style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
                }}
                ref={mapRef}
                mapType={mapType}
                onMapReady={goToLocation}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton={true}>

                {
                    (place.latitude && place.longitude) ? (
                        <Marker
                            title={place.nome}
                            coordinate={{
                                latitude:  place.latitude,
                                longitude: place.longitude
                                }}/>
                    ) : null
                }           

                {
                    (location.latitude && location.longitude) ? (
                        <Marker
                            title='Você'
                            coordinate={{
                                latitude:  location.latitude,
                                longitude: location.longitude
                                }}/>
                    ) : null
                }

                {/* {
                    (origin && destination) ? (
                        <MapViewDirections
                            origin={origin}
                            destination={destination}
                            apikey={config.googleApi} />
                    ) : null
                        
                } */}

            </MapView>
            <TouchableOpacity style={styles.mylocatin}
                onPress={goToLocation}>
                <MyLocation name='my-location' size={25} color='red'/>
            </TouchableOpacity>
            <LocationFooter changeMapType={changeMapType} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    txtStyle: {
        fontSize: 20,
    },
    mylocatin: {
        position: 'absolute',
        top: '2%',
        left: '5%'
    },
    search: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: '20%'
    }
})


export default Location