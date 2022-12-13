import { useContext, useState } from "react"
import Context from "../../global/Context"
import Eye from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import { url } from "../../constants/url"
import DefaultButton from "../../components/DefaultButton"
import DefaultInput from "../../components/DefaultInput"
import styles from "./styles"
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Alert
} from "react-native"



const Signup = (props)=>{
    const { states, setters, requests } = useContext(Context)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confSenha, setConfSenha] = useState('')
    const [visivel, setVisivel] = useState(true)
    const [icone, setIcone] = useState('eye-with-line')
    const [visivel2, setVisivel2] = useState(true)
    const [icone2, setIcone2] = useState('eye-with-line')
    const measure = '85%'
        
    
    
    const visibilidade = ()=>{
        if(icone === 'eye-with-line'){
            setVisivel(false)
            setIcone('eye')
        }else if(icone === 'eye'){
            setVisivel(true)
            setIcone('eye-with-line')
        }
    }

    const visibilidade2 = ()=>{
        if(icone2 === 'eye-with-line'){
            setVisivel2(false)
            setIcone2('eye')
        }else if(icone2 === 'eye'){
            setVisivel2(true)
            setIcone2('eye-with-line')
        }
    }



    const signUp = ()=>{
        const body={
            nome,
            email,
            senha: password,
            confirmSenha: confSenha,
            push_token: states.expoPushToken
        }
        axios.post(`${url}/user`, body).then(res=>{
            setters.getId(res.data)
            props.navigation.navigate('Home')
        }).catch(e=>{
            Alert.alert(
                'Error to register:',
                e.response.data
            )
        })
    }


    
    const limpar = ()=>{
        setNome('')
        setConfSenha('')
        setPassword('')
        setEmail('')
    }


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <Text style={styles.subTitle}>
                    Fill that little form to create your account
                </Text>
                <View style={{alignItems:'center', width:'100%'}}>
                    <DefaultInput
                        width={measure}
                        onChangeText={setNome}
                        value={nome}
                        placeholder={'Your name or nickname'}/>
                    <View style={{marginVertical:10}}/>
                    <DefaultInput
                        width={measure}
                        onChangeText={setEmail}
                        value={email}
                        placeholder={'youremail@email.com'}/>
                    <View style={{marginVertical:10}}/>
                    <DefaultInput
                        width={measure}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={visivel}
                        placeholder={'Password'}/>
                    <TouchableOpacity style={styles.eye}
                        onPress={visibilidade}>
                        <Eye name={icone} size={25} color='whitesmoke'/>
                    </TouchableOpacity>
                    <DefaultInput
                        width={measure}
                        onChangeText={setConfSenha}
                        value={confSenha}
                        secureTextEntry={visivel2}
                        placeholder={'Confirm your password'}/>
                    <TouchableOpacity style={styles.eye2}
                        onPress={visibilidade2}>
                        <Eye name={icone2} size={25} color='whitesmoke'/>
                    </TouchableOpacity>                                        
                    <View style={styles.btnContainer}>
                        <DefaultButton
                            width={'30%'}
                            buttonText={'Erase'}
                            handlePress={limpar}/>
                        <DefaultButton
                            width={'30%'}
                            buttonText={'Register'}
                            handlePress={signUp}/>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}




export default Signup