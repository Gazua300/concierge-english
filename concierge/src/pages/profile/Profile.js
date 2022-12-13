import { useEffect, useContext, useState } from 'react'
import Context from '../../global/Context'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import { url } from '../../constants/url'
import styles from './style'
import DefaultButton from '../../components/DefaultButton'
import {
    View,
    Text,
    ImageBackground,
    Alert,
    FlatList
} from 'react-native'




const Profile = (props)=>{
    const [mesas, setMesas] = useState([])
    const { states, requests } = useContext(Context)
    const place = states.place
    const ddd = String(place.contato).substring(0,2)
    const prefixo = String(place.contato).substring(2,7)
    const sufixo = String(place.contato).substring(7,11)
    // const telefone = `${ddd} ${prefixo}-${sufixo}` 




    useEffect(()=>{
        requests.dadosDoLocal()
        
        axios.get(`${url}/place/${place.id}`).then(res=>{
            setMesas(res.data)
        }).catch(e=>{
            console.log(`Falha ao pegar clientes por local na screen Profile ${e.response.data}`)
        })
    }, [])    
    
    

    const confirmarLogout = ()=>{
        Alert.alert(
            'Alert',
            'Tem certeza que deseja sair da sua conta?',
            [
                {
                    text:'Cancelar'
                },
                {
                    text:'Ok',
                    onPress: ()=> logout()
                }
            ]
        )
    }


    const logout = async()=>{
        try{
            await AsyncStorage.clear()
            props.navigation.navigate('Login')
        }catch(e){
            alert(e)
        }
    }


//#####################ESQUEMA PARA PEGAR MESAS OCUPADAS E LIVRES   
/***********SEPARANDO MESAS OCUPADAS DE MESAS LIVRES*********/
    const ocupadas = place.mesas
    const todas = []
    const arrOcupadas = []

    for(let i = 1; i <= ocupadas; i++){
        todas.push(i)
    }

    mesas.map(mesa=>{
        arrOcupadas.push(mesa.mesa)
    })

    const mesasVagas = todas.filter(vagas=> !arrOcupadas.includes(vagas))
    const mesasOcupadas = todas.filter(ocupada=> arrOcupadas.includes(ocupada))

    console.log(`Mesas vagas: ${mesasVagas}`)
    console.log(`Mesas ocupadas: ${mesasOcupadas}`)

//***********************FIM DO ESQUEMA******************************

   

    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                
                <View style={styles.perfilContainer}>
                    <Text style={styles.title}>{place.nome}</Text>
                    <Text style={styles.txtStyle}>
                        {place.servico}{'\n'}
                        {place.mesas} tables{'\n'}                                
                    </Text>
                    <Text style={styles.localContainer}>
                        Your email:{'\n'}
                        {place.email}
                    </Text>
                </View>                
                
                <View style={{alignItems:'center'}}>
                    <Text style={{color:'whitesmoke', fontSize:20}}>
                        Vacant tables:
                    </Text> 
                    <FlatList
                        contentContainerStyle={{margin:5}}
                        horizontal
                        data={mesasVagas}
                        keyExtractor={mesa => mesa}
                        renderItem={({item: mesa})=>(
                            <Text style={{fontSize:18, color:'whitesmoke'}}>{mesa}{' '}</Text>
                        )}/>

                    <Text style={{color:'whitesmoke', fontSize:20}}>
                        Occupied tables:
                    </Text> 
                    <FlatList
                        contentContainerStyle={{margin:5}}
                        horizontal
                        data={mesasOcupadas}
                        keyExtractor={mesa => mesa}
                        renderItem={({item: mesa})=>(
                            <Text style={{fontSize:18, color:'whitesmoke'}}>{mesa}{' '}</Text>
                        )}/>
                </View>

                <View style={styles.btnContainer}>
                    <DefaultButton
                        width={'90%'}
                        buttonText={'Logout'}
                        handlePress={confirmarLogout}/>
                    <View style={styles.editContainer}>
                        <DefaultButton
                            width={'30%'}
                            buttonText={'Edit'}
                            handlePress={()=>{
                                props.navigation.navigate('Auth')
                            }}/>
                        <DefaultButton
                            width={'60%'}
                            buttonText={'Add coordinates'}
                            handlePress={()=>{
                                props.navigation.navigate('Location')
                            }}/>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}


export default Profile