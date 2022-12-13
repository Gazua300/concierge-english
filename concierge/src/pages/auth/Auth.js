import { useState } from "react"
import Eye from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import { url } from "../../constants/url"
import DefaultButton from "../../components/DefaultButton"
import DefaultInput from "../../components/DefaultInput"
import styles from './style'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from "react-native"




const Auth = (props)=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visivel, setVisivel] = useState(false)
    const [icone, setIcone] = useState('eye-with-line')
    
    
    
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
        axios.post(`${url}/client/login`, body).then(res=>{
                props.navigation.navigate('EditProfile')
                limpar()
            }).catch(e=>{
                alert(e.response.data)
            })
    }



    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                <Text style={styles.txtStyle}>
                   You need to authenticate to change your details.
                </Text>
                <ScrollView>
                    <DefaultInput
                        width={'95%'}
                        onChangeText={setEmail}
                        value={email}
                        placeholder={'youremail@email.com'}/>
                    <View style={{marginVertical:10}}/>
                    <DefaultInput
                        width={'95%'}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={visivel}
                        placeholder={'Password'}/>
                    <TouchableOpacity style={styles.eye}
                        onPress={visibilidade}>
                        <Eye name={icone} size={25} color='whitesmoke'/>                    
                    </TouchableOpacity>
                    <View style={styles.btnContainer}>
                        <DefaultButton
                            buttonText={'Erase'}
                            handlePress={limpar}/>
                        <DefaultButton
                            buttonText={'Verify'}
                            handlePress={login}/>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}


export default Auth