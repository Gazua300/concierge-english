import { useContext, useEffect, useState } from "react"
import Context from "../../global/Context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import { url } from "../../constants/url"
import { 
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from "react-native"



const CreateUser = (props)=>{
    const { setters, states, requests } = useContext(Context)
    const [lugar, setLugar] = useState('')
    const placeholderBakcground = 'rgba(255, 255, 255, 0.4)'
    const place = states.place  

   

    useEffect(()=>{

        (async()=>{
            const id = await AsyncStorage.getItem('token')
          
            if(id){
                props.navigation.navigate('Pedido')
            }
        })()

        requests.updateUserPushToken()

    }, [])    
    
    
    const signUp = async()=>{
        try{

            const id = await AsyncStorage.getItem('id')

            const body={
                mesa: lugar,
                pushToken: states.expoPushToken,
                user: id
            }
            axios.put(`${url}/user/${states.place.id}`, body).then(res=>{
                setters.getToken(res.data)
                requests.sendPushNotification(
                    states.place.push_token,
                    'Atenção!',
                    `Cliente na mesa ${lugar}`
                    )                
                props.navigation.navigate('Pedido')
            }).catch(e=>{
                alert(e.response.data)
            })

        }catch(e){
            alert(e)
        }
    }



    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={{color:'whitesmoke', fontSize:20}}>
                        Este estabelecimento possui {place.mesas} mesas.
                    </Text>
                    <View style={styles.formContainer}>
                        <TextInput style={styles.input}
                            onChangeText={setLugar}
                            value={lugar}
                            placeholder="Mesa"
                            keyboardType="numeric"
                            placeholderTextColor={placeholderBakcground}/>
                        <TouchableOpacity style={styles.button}
                            onPress={signUp}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>Registrar</Text>
                        </TouchableOpacity> 
                    </View>                        
                </ScrollView>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 50
    },
    formContainer: {
        alignItems: 'center',
    },
    input: {
        borderRadius: 10,
        borderBottomWidth: 1,
        borderColor: '#ae8625',
        fontSize: 20,
        margin: 20,
        width: '30%',
        color: 'whitesmoke',
        textAlign: 'center',
        marginVertical: 30
    },
    button: {
        backgroundColor: '#ae8625',
        borderWidth: 1,
        borderColor: 'goldenrod',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 20
    }
})


export default CreateUser