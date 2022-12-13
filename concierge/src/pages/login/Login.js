import { useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Context from "../../global/Context"
import axios from "axios"
import { url } from "../../constants/url"
import DefaultButton from "../../components/DefaultButton"
import DefaultInput from "../../components/DefaultInput"
import Eye from 'react-native-vector-icons/Entypo'
import styles from "./styles"
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    BackHandler
} from "react-native"




const Login = (props)=>{
    const { setters, requests } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visivel, setVisivel] = useState(true)
    const [icone, setIcone] = useState('eye-with-line')
    

    
    useEffect(()=>{
       
        (async()=>{
            const token = await AsyncStorage.getItem('id')
        
            if(token){
                props.navigation.navigate('Home')
            }  
        })()
        
        requests.updateClientPushToken()
            
    }, [])



    BackHandler.addEventListener('hardwareBackPress', ()=>{
        props.navigation.navigate('Login')

        return true
    })

    
    

    const visibilidade = ()=>{
        if(icone === 'eye-with-line'){
            setVisivel(false)
            setIcone('eye')
        }else if(icone === 'eye'){
            setVisivel(true)
            setIcone('eye-with-line')
        }
    }


    const limpar = ()=>{
        setEmail('')
        setPassword('')
    }


    const login = async()=>{    
        const body = {
            email,
            senha: password
        }
        axios.post(`${url}/client/login`, body).then(res=>{
            setters.getId(res.data)
            limpar()
            props.navigation.navigate('Home')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                <View style={{ alignItems:'center', width:'100%' }}>
                    <DefaultInput
                        onChangeText={setEmail}
                        width={'85%'}
                        value={email}
                        placeholder={'youremail@email.com'}/>    
                    <View style={{marginVertical:10}}/>                
                    <DefaultInput
                        width={'85%'}
                        onChangeText={setPassword}
                        value={password}
                        placeholder={'Password'}
                        secureTextEntry={visivel}/>
                    <TouchableOpacity style={styles.eye}
                        onPress={visibilidade}>
                        <Eye name={icone} size={25} color='whitesmoke'/>
                    </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={{alignItems:'center'}}
                        onPress={()=> props.navigation.navigate('RedefinirSenha')}>
                        <Text style={[styles.txtStyle, {color:'blue', marginVertical:15}]}>
                            Forgot you password
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.btnContainer}>
                        <DefaultButton
                            buttonText={'Limpar'}
                            handlePress={limpar}/>
                        <DefaultButton
                            buttonText={'Entrar'}
                            handlePress={login}/>
                    </View>
                    <Text style={styles.txtStyle}>You're not subscribed yet? Click
                        <Text style={{color:'blue', fontSize:20}}
                            onPress={()=> props.navigation.navigate('CreateClient')}> here</Text>
                    </Text>
            </View>
        </ImageBackground>
    )
}



export default Login