import { useState } from "react"
import axios from 'axios'
import { url } from "../../constants/url"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DefaultButton from "../../components/DefaultButton"
import styles from "./styles"
import {
    View,
    Text,
    TextInput,
    ImageBackground,
    ScrollView
} from "react-native"




const Location = (props)=>{
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    



    const inserirCoordenadas = async()=>{
        try{

            const id = await AsyncStorage.getItem('id')
            
            const body = {
                latitude,
                longitude
            }
            axios.put(`${url}/location/${id}`, body).then(res=>{
                alert(res.data)
                props.navigation.navigate('Profile')
            }).catch(e=>{
                alert(e.response.data)
            })

        }catch(e){
            console.log(e)
        }
    }


    const limpar = ()=>{
        setLatitude('')
        setLongitude('')
    }


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                <Text style={styles.txtStyle}>
                    Report the latitude and longitude of the place.
                </Text>
                <ScrollView>
                    <View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                onChangeText={setLatitude}
                                value={latitude}
                                placeholder='Latitude'
                                placeholderTextColor='rgba(255, 255, 255, 0.5)'
                                keyboardType='numeric'/>
                            <TextInput style={styles.input}
                                onChangeText={setLongitude}
                                value={longitude}
                                placeholder='Longitude'
                                placeholderTextColor='rgba(255, 255, 255, 0.5)'
                                keyboardType='numeric'/>
                        </View>
                        <View style={styles.btnContainer}>
                            <DefaultButton
                                height={35}
                                buttonText={'Erase'}
                                handlePress={limpar}/>
                                <DefaultButton
                                height={35}
                                buttonText={'Add coords'}
                                handlePress={inserirCoordenadas}/>   
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}


export default Location