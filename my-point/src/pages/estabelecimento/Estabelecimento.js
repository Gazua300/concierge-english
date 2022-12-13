import { useCallback, useContext, useEffect, useState } from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/url'
import Exit from 'react-native-vector-icons/MaterialCommunityIcons'
import Eye from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    BackHandler,
    Alert,
    RefreshControl
} from 'react-native'




const Estabelecimento = (props)=>{
    const { states, requests } = useContext(Context)
    const place = states.place
    const [mesas, setMesas] = useState([])
    const [visivel, setVisivel] = useState(false)
    const [icone, setIcone] = useState('eye-with-line')
    const [visivel2, setVisivel2] = useState(false)
    const [icone2, setIcone2] = useState('eye-with-line')
    const [isRefreshing, setIsRefreshing] = useState(false)



    useEffect(()=>{
        mostrarMesas()    
        requests.mostrarUsuario()
    }, [])


    BackHandler.addEventListener('hardwareBackPress', ()=>{
        props.navigation.navigate('Cardapio')

        return true
    })


    const wait = (timeout)=>{
        return new Promise((resolve, reject)=> {
            setTimeout(resolve, timeout)
        })
    }

    const onRefresh = useCallback(()=>{
        setIsRefreshing(true)
        mostrarMesas()
        wait(3000).then(()=>{
            setIsRefreshing(false)
        }).catch(e=>{
            console.log(e)
        })
    })


    const mostrarMesas = ()=>{
        const id = states.perfil.estabelecimento

        id && axios.get(`${url}/place/${id}`).then(res=>{
            setMesas(res.data)
        }).catch(e=>{
            console.log(e.response.data)
        })
    }


    const visibilidade = ()=>{
        if(icone === 'eye-with-line'){
            setVisivel(true)
            setIcone('eye')
        }else if(icone === 'eye'){
            setVisivel(false)
            setIcone('eye-with-line')
        }
    }

    const visibilidade2 = ()=>{
        if(icone2 === 'eye-with-line'){
            setVisivel2(true)
            setIcone2('eye')
        }else if(icone2 === 'eye'){
            setVisivel2(false)
            setIcone2('eye-with-line')
        }
    }


//#####################ESQUEMA PARA PEGAR MESAS OCUPADAS E LIVRES

    const ocupadas = place.mesas
    const todas = []
    const arrOcupadas = []
    
    for(let i = 1; i <= ocupadas; i++){
        todas.push(i)
    }
    
    mesas.map(mesa=>{
        arrOcupadas.push(mesa.mesa)
    })
    
    const mesasLivres = todas.filter(vagas=> !arrOcupadas.includes(vagas))
    const mesasOcupadas = todas.filter(vagas=> arrOcupadas.includes(vagas))

//***********************FIM DO ESQUEMA******************************


    const ocuparLugar = async(lugar)=>{
        try{

            const momento = new Date()
            const horario = `${momento.getHours()} : ${momento.getMinutes()}`
            const body={
                mesa: lugar,
                pushToken: states.expoPushToken,
                user: await AsyncStorage.getItem('id'),
                entrada: `${horario}`
            }
            axios.put(`${url}/user/${place.id}`, body).then(()=>{
                requests.sendPushNotification(
                    place.push_token,
                    'Atention!',
                    `Client on the table ${lugar}`
                    )
                props.navigation.navigate('Cardapio')                    
            }).catch(e=>{
                Alert.alert(
                    `It seems that you already occupy a place`,
                    e.response.data
                    )
            })

        }catch(e){
            console.log(`Demais erros da função ocuparLugar: ${e}`)
        }
    }


    const removeClient = async()=>{
        try{
            
            const id = await AsyncStorage.getItem('id')

            axios.put(`${url}/user/remove/${id}`).then(res=>{
                props.navigation.navigate('Home')
            }).catch(e=>{
               Alert.alert(
                `Isn't possible to exit at the time`,
                e.response.data
               )
            })

        }catch(e){
            console.log(`Demais erros da função removerClient: ${e}`)
        }
    }


    
    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>  
                <View style={styles.tituloContainer}>
                    <Text style={styles.titulo}>
                        {place.nome}
                    </Text>
                    <TouchableOpacity onPress={removeClient}>
                        <Exit name='exit-run' size={40} color='whitesmoke'/>
                    </TouchableOpacity>
                </View>
                <View style={{marginHorizontal:15, marginTop:50}}>
                    <Text style={styles.descricao}>
                        <Text>{place.servico} with capacity to {place.mesas} tables</Text>
                    </Text>
                </View>
                <View style={styles.mesasTitulo}>
                    <Text style={{color:'whitesmoke', fontSize:25}}>
                        Vacant tables
                    </Text>
                    <TouchableOpacity onPress={visibilidade}>
                        <Eye name={icone} size={25} color='whitesmoke'/>  
                    </TouchableOpacity>
                </View>
                    <View style={{borderColor:'whitesmoke', borderWidth:1}}/>
                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}/>}>
                        <View style={styles.gradeDeMesas}>
                            {!visivel ? null : (
                                mesasLivres && mesasLivres.map(mesa=>{
                                    return(
                                        <TouchableOpacity key={mesa} style={{margin:5}}
                                            onPress={()=> ocuparLugar(mesa)}>
                                            <Text style={{fontSize:22, color:'whitesmoke'}}>
                                                Table - {mesa}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            )}
                            
                        </View>
                        <View style={styles.mesasTitulo}>
                            <Text style={{color:'whitesmoke', fontSize:25}}>
                                Occupied tables
                            </Text>
                            <TouchableOpacity onPress={visibilidade2}>
                                <Eye name={icone2} size={25} color='whitesmoke'/> 
                            </TouchableOpacity>
                        </View>
                        <View style={{borderColor:'whitesmoke', borderWidth:1}}/>
                        <View style={styles.gradeDeMesas}>
                            {!visivel2 ? null : (
                                mesasOcupadas && mesasOcupadas.map(mesa=>{
                                    return(
                                        <TouchableOpacity key={mesa}>
                                            <Text style={{fontSize:20, color:'whitesmoke'}}>
                                                Table - {mesa}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            )}
                            
                        </View>
                </ScrollView>
            </View>            
        </ImageBackground>
    )
}


export default Estabelecimento