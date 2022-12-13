import { useContext, useState } from "react"
import Context from "../../global/Context"
import DefaultButton from "../../components/DefaultButton"
import styles from "./styles"
import {
    View,
    TextInput,
    ImageBackground
} from "react-native"




const EnviarNotificacao = (props)=>{
    const { states, requests } = useContext(Context)
    const [titulo, setTitulo] = useState('')
    const [msg, setMsg] = useState('')
    const placeholderBackground = 'rgba(255, 255, 255, 0.4)'
    



    const limpar = ()=>{
        setTitulo('')
        setMsg('')
    }


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                <View style={{alignItems: 'center', width: '90%'}}>
                <TextInput style={styles.input}
                    onChangeText={setTitulo}
                    value={titulo}
                    placeholderTextColor={placeholderBackground}
                    placeholder="Título da mensagem"/>

                <TextInput style={styles.textarea}
                    onChangeText={setMsg}
                    value={msg}
                    multiline={true}
                    numberOfLines={5}
                    placeholderTextColor={placeholderBackground}
                    placeholder='Mensagem'/>
                <View style={styles.btnContainer}>
                    <DefaultButton
                        buttonText={'Limpar'}
                        handlePress={limpar}/>
                    <DefaultButton
                        buttonText={'Enviar'}
                        handlePress={()=> requests.sendPushNotification(
                            states.cliente.push_token,
                            titulo,
                            msg
                        )}/>
                </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default EnviarNotificacao