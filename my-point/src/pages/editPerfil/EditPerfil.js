import { useContext, useState } from "react"
import Context from "../../global/Context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import { url } from "../../constants/url"
import DefaultButton from "../../components/DefaultButton"
import DefaultInput from "../../components/DefaultInput"
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground
} from "react-native"



const EditPerfil = (props)=>{
    const { states, requests } = useContext(Context)
    const perfil = states.perfil
    const [email, setEmail] = useState(perfil.email)
    const [nome, setNome] = useState(perfil.nome)
    
    

    
               
    const atualizarPerfil = async()=>{
        try{

            const id = await AsyncStorage.getItem('id')

            const body = {
                nome,
                email
            }
            axios.put(`${url}/user/edit/${id}`, body).then(res=>{
                requests.mostrarUsuario()
                props.navigation.navigate('Perfil')
            }).catch(e=>{
                alert(e.response.data)
            })

        }catch(e){
            alert(e)
        }
    }


    const limpar = ()=>{
        setNome('')
        setEmail('')
    }


    
    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <Text style={styles.subtitle}>
                    Fill the form with your new details
                </Text>                        
             <View style={styles.editContainer}>
                <DefaultInput
                    onChangeText={setNome}
                    value={nome}
                    placeholder={'New name'}/>
                <View style={{marginVertical:10}}/>
                <DefaultInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder={'newmail@email.com'}/>
                <View style={styles.editBtnContainer}>
                    <DefaultButton
                        buttonText={'Erase'}
                        handlePress={limpar}/>
                    <DefaultButton
                        buttonText={'Update'}
                        handlePress={atualizarPerfil}/>
                </View>
            </View>
            </View>            
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    subtitle: {
        color: 'whitesmoke',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 40
    },
    editContainer: {
        marginHorizontal: 30,
    },
    editBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },  
})


export default EditPerfil