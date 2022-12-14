import { useContext, useEffect, useState } from "react"
import Context from "../../global/Context"
import Eye from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import DefaultInput from "../../components/DefaultInput"
import DefaultButton from "../../components/DefaultButton"
import { url } from "../../constants/url"
import styles from './styles'
import {
    View,
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from "react-native"


const CreateClient = (props)=>{
    const { states, setters, requests } = useContext(Context)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confSenha, setConfSenha] = useState('')
    const [visivel, setVisivel] = useState(true)
    const [icone, setIcone] = useState('eye-with-line')
    const [visivel2, setVisivel2] = useState(true)
    const [icone2, setIcone2] = useState('eye-with-line')
    const inputMargin = 8
    

    
    
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
            pushToken: states.expoPushToken
        }
        axios.post(`${url}/client`, body).then(res=>{
            setters.getId(res.data)
            props.navigation.navigate('InsertAddress')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    
    const limpar = ()=>{
        setConfSenha('')
        setNome('')
        setPassword('')
        setEmail('')
    }


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                    <DefaultInput
                        onChangeText={setNome}
                        value={nome}
                        placeholder={'Name of the place'}
                        margin={inputMargin}/>
                    <DefaultInput
                        onChangeText={setEmail}
                        value={email}
                        placeholder={'place@email.com'}
                        margin={inputMargin}/>
                    <DefaultInput
                        onChangeText={setPassword}
                        value={password}
                        placeholder={'Password'}
                        secureTextEntry={visivel}
                        margin={inputMargin}/>
                    <TouchableOpacity style={styles.eye}
                        onPress={visibilidade}>
                        <Eye name={icone} size={25} color='whitesmoke'/>
                    </TouchableOpacity>
                    <DefaultInput
                        onChangeText={setConfSenha}
                        value={confSenha}
                        secureTextEntry={visivel2}
                        placeholder={'Confirm your password'}
                        margin={inputMargin}/>

                    <TouchableOpacity style={styles.eye2}
                        onPress={visibilidade2}>
                        <Eye name={icone2} size={25} color='whitesmoke'/>
                    </TouchableOpacity>                    
                    <View style={styles.btnContainer}>
                        <DefaultButton
                            buttonText={'Erase'}
                            handlePress={limpar}/>
                        <DefaultButton
                            buttonText={'Save'}
                            handlePress={signUp}/>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}



export default CreateClient