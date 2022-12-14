import { useCallback, useContext, useEffect, useState } from 'react'
import Context from '../../global/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../../constants/url'
import DefaultButton from '../../components/DefaultButton'
import styles from './styles'
import {
    View,
    Text,
    ImageBackground,
    BackHandler,
    FlatList,
    Alert
 } from 'react-native'




const Home = (props)=>{
    const { states, setters } = useContext(Context)
    const pedidos = states.pedidos
    const [refresh, setRefresh] = useState(false)
    const [clientes, setClientes] = useState([])
    

    console.log('Pedidos: ', pedidos.length)
        
    useEffect(()=>{
        clientesPorLocal()
    }, [])


    
    BackHandler.addEventListener('hardwareBackPress', ()=>{
        props.navigation.navigate('Home')

        return true
    })


    const wait = (timeout)=>{
        return new Promise(res=> setTimeout(res, timeout))
    }

    const onRefresh = useCallback(()=>{
        setRefresh(true)
        clientesPorLocal()
        wait(2000).then(()=> setRefresh(false)).then(e=>{
            console.log(e)
        })
    }, [])


    const clientesPorLocal = async()=>{
        const id = await AsyncStorage.getItem('id')
             
        axios.get(`${url}/place/${id}`).then(res=>{
            setClientes(res.data)
        }).catch(e=>{
            console.log(e.response.data)
        })
    }


    const pedidosPorCliente = (cliente)=>{
        axios.get(`${url}/requests/${cliente.id}`).then(res=>{
            props.navigation.navigate('Pedidos')
            setters.setPedidos(res.data)
            setters.setCliente(cliente)
        }).catch(e=>{
            Alert.alert(
                `There's no requests for this client`,
                'Do you want to send a message?',
                [
                    {
                        text:'Cancel'
                    },
                    {
                        text:'Ok',
                        onPress: ()=> {
                            props.navigation.navigate('EnviarNotificacao')
                        }
                    }
                ]
            )
        })
    }


    const confirmarRemocaoDeCliente = (cliente)=>{
        Alert.alert(
        'Are you sure you want to remove client?',
        'Removing clients make their requests be removed too, então verifique se já foram atendidos e pagos.',
        [
            {
                text:'Cancelar'
            },
            {
                text:'Ok',
                onPress: ()=> remocaoDeCliente(cliente)
            }
        ]
       )
    }


    const permissaoDeMEsa = async(cliente)=>{
        const id = await AsyncStorage.getItem('id')
        const body = {
            user: cliente.id
        }

        axios.put(`${url}/permission/${id}`, body).then(res=>{
            alert('Permission granted')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const remocaoDeCliente = (cliente)=>{
        axios.delete(`${url}/requests/user/${cliente.id}`).then(res=>{
            alert(`Client table ${cliente.mesa} removed`)
        }).catch(e=>{
            console.log(e.response.data)
        })
    }

    
    
    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                <FlatList
                    data={clientes}
                    keyExtractor={cliente => cliente.id}
                    refreshing={refresh}
                    onRefresh={onRefresh}
                    renderItem={({ item: cliente })=>(
                        <View style={styles.card}>
                            <View>
                                <Text style={styles.txtStyle}>
                                    Table {cliente.mesa}{'\n'}
                                    <Text style={[styles.txtStyle, { fontSize:15, fontWeight:'300'}]}>
                                        Client entered at {cliente.entrada}
                                    </Text>
                                </Text>
                            </View> 
                            <View style={styles.btnContainer}>
                                <DefaultButton
                                    buttonText={'Check requests'}
                                    handlePress={()=> pedidosPorCliente(cliente)}/>
                                <DefaultButton
                                    buttonText={'Remove'}
                                    handlePress={()=> confirmarRemocaoDeCliente(cliente)}/>
                            </View>
                            <View style={{alignItems:'center'}}>  
                                <DefaultButton
                                    width={'90%'}
                                    buttonText={'Grant permission'}
                                    handlePress={()=> permissaoDeMEsa(cliente)}/>   
                            </View>                                   
                        </View>
                    )}/>  
            </View>
        </ImageBackground>
    )
}




export default Home