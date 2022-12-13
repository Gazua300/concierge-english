import { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    StyleSheet,
    Linking
} from 'react-native'


const RedefinirSenha = (props)=>{
    const [email, setEmail] = useState('')

    

    const redefinir = ()=>{
        
    }


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>            
            <View style={styles.container}>
                <Text style={styles.txtStyle}>
                    Digite seu email logo abaixo.
                </Text>
                <TextInput style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder='nome@email.com'
                    placeholderTextColor='rgba(255, 255, 255, 0.4)'/>
                <TouchableOpacity style={styles.button}
                    onPress={redefinir}>
                    <Text style={{color:'whitesmoke', fontSize:18}}>
                        Enviar
                    </Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    txtStyle: {
        fontSize: 20,
        color: 'whitesmoke',
        margin: 30
    },
    input: {
        borderWidth: 1,
        borderColor:'goldenrod',
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        margin: 20,
        width: 350,
        height: 50,
        color: 'whitesmoke'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#ae8625',
        width: 150,
        height: 40,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'goldenrod'
    }
})

export default RedefinirSenha