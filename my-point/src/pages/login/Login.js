import { useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Context from "../../global/Context"
import axios from "axios"
import { url } from "../../constants/url"
import Eye from 'react-native-vector-icons/Entypo'
import DefaultButton from '../../components/DefaultButton'
import DefaultInput from '../../components/DefaultInput'
import styles from './styles'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    BackHandler,
    Alert
} from "react-native"




const Login = (props)=>{
    const { setters } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visivel, setVisivel] = useState(true)
    const [icone, setIcone] = useState('eye-with-line')



    
    useEffect(()=>{

        (async()=>{
            const id = await AsyncStorage.getItem('id')  
            
            if(id){               
                props.navigation.navigate('Home')
            }
        })()

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

    
    const login = ()=>{    
        const body = {
            email,
            senha: password
        }
        
        axios.post(`${url}/user/login`, body).then(res=>{
                setters.getId(res.data)
                limpar()
                props.navigation.navigate('Home')
            }).catch(e=>{
                Alert.alert(
                    `Isn't possible to access your account:`,
                    e.response.data
                )
            })
    }
    


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <View style={{alignItems:'center', width:'100%'}}>
                    <DefaultInput
                        width={'85%'}
                        onChangeText={setEmail}
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
                    <TouchableOpacity style={{alignItems:'center'}}
                        onPress={()=> props.navigation.navigate('RedefinirSenha')}>
                        <Text style={{color:'blue', fontSize:18}}>
                            Forgot your password
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.btnContainer}>
                        <DefaultButton
                            width={'30%'}
                            height={35}
                            margin={20}
                            buttonText={'Erase'}
                            handlePress={limpar}/>
                        <DefaultButton
                            width={'30%'}
                            height={35}
                            margin={20}
                            buttonText={'Enter'}
                            handlePress={login}
                            />
                    </View>                    
                    <Text style={styles.txtStyle}>You're not subscribed yet? Click
                        <Text style={{color:'blue', fontSize:20}}
                            onPress={()=> props.navigation.navigate('Signup')}> here</Text>
                    </Text>
                </View>
            </View>
        </ImageBackground>
    )
}



export default Login