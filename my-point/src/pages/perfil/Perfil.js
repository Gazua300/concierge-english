import { useEffect, useContext, useState, useCallback } from 'react'
import Context from '../../global/Context'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import { url } from '../../constants/url'
import DefaultButton from '../../components/DefaultButton'
import Eye from 'react-native-vector-icons/Entypo'
import styles from './styles'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Alert,
    BackHandler,
    FlatList
} from 'react-native'




const Perfil = (props)=>{
    const { states, requests} = useContext(Context)
    const conta = states.conta
    const perfil = states.perfil
    const place = states.place
    const [refreshing, setRefreshing] = useState(false)
    const [resultado, setResultado] = useState('')
    const [visivel, setVisivel] = useState(false)
    const [icone, setIcone] = useState('eye-with-line')
      

   
    useEffect(()=>{
        requests.mostrarUsuario()
        requests.pedidosPorCliente()
    }, [])


    BackHandler.addEventListener('hardwareBackPress', ()=>{
        props.navigation.navigate('Cardapio')
        return true
    })


    const wait = (timout)=>{
        return new Promise(res => setTimeout(res, timout))
    }

    const onRefresh = useCallback(()=>{
        setRefreshing(true)
        requests.pedidosPorCliente()
        wait(2000).then(()=> setRefreshing(false))
    }, [])


    const visibilidade = ()=>{
        if(conta.length > 0){
            const valores = conta.map(valor=>{
                return valor.total
            })
        
            const resultado = valores.reduce((accumulator, value)=>{
                return accumulator + value
            })
            setResultado(resultado)
        }

        if(icone === 'eye-with-line'){
            setVisivel(true)
            setIcone('eye')
        }else if(icone === 'eye'){
            setVisivel(false)
            setIcone('eye-with-line')
        }
    }


    const solicitarRemocaoDePedido = (pedido)=>{
        Alert.alert(
            'Only the house can remove your request',
            `You can solicit to quit your request. The house will be notified and give you a feedback`,
            [
                {
                    text:'Cancel'
                },
                {
                    text:'Ok',
                    onPress: ()=> enviarRemocaoDePedido(pedido)                    
                }
            ]
        )
    }


    const enviarRemocaoDePedido = (pedido)=>{
        requests.sendPushNotification(
            place.push_token,
            'Solicitation of request remotion:',
            `Client from table ${pedido.mesa} solicit to remove your request of ${pedido.pedido}`
        )
    }


    const confirmarLogout = ()=>{
        Alert.alert(
            'Atention!',
            'Are you sure you want to logout?',
            [
                {
                    text:'Cancel'
                },
                {
                    text:'Ok',
                    onPress: ()=> {
                        if(conta.length > 0){
                            Alert.alert(
                                'Atention!',
                                'You can not logout without pay off. There are pending orders'
                                )
                        }else{
                            logout()
                        }
                    }
                }
            ]
        )
    }    


    const logout = async()=>{
        try{

            const id = await AsyncStorage.getItem('id')

            axios.put(`${url}/user/remove/${id}`).then(async()=>{
                await AsyncStorage.clear()
                props.navigation.navigate('Login')
            }).catch(e=>{
                Alert.alert(
                    'Error to logout:',
                    `${e.response.data}`
                )
            })

        }catch(e){
            console.log(e)
        }
    }


   
    const confirmarFechaconta = ()=>{
        const valores = conta.map(valor=>{
            return valor.total
        })
    
        const resultado = valores.reduce((accumulator, value)=>{
            return accumulator + value
        })
        setResultado(resultado)        

        Alert.alert(
            'Your total:',
            `Valor: R$ ${resultado.toFixed(2)}\n\nWhen you solicit your debt the house will be notified. Please wait`,
            [
                {
                    text:'Cancel'
                },
                {
                    text:'Ok',
                    onPress: ()=> {
                        requests.sendPushNotification(
                            place.push_token,
                            `Solicitation of pay off`,
                            `The client of table ${perfil.mesa} solicit to pay off his debt`
                            )
                    }
                }
            ]
        )
    }



    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <Text style={styles.title}>{perfil.nome}{'\n'}
                    <Text style={{fontWeight:'300', fontSize:20}}>
                        {perfil.email}
                    </Text>
                </Text>            
                    <View style={styles.placeContainer}>
                        {
                            Object.keys(place).length > 0 ?(
                                <View>
                                    <Text style={styles.placeTxtStyle}>
                                        You are at:{' '}
                                        <Text style={{fontWeight:'300'}}>
                                            {place.nome} - {place.servico}
                                        </Text>{'\n\n'}
                                        At the table:{' '}
                                        <Text style={{fontWeight:'300'}}>{perfil.mesa}</Text> 
                                    </Text>

                                    <View style={styles.calculation}>
                                        <Text style={styles.placeTxtStyle}>
                                            Total of your debt:{' '}${' '}
                                            <Text style={{fontWeight:'300'}}>
                                                {visivel ? resultado && resultado.toFixed(2) : '*****'}
                                            </Text>
                                        </Text>
                                        <TouchableOpacity style={styles.eye}
                                            onPress={visibilidade}>
                                            <Eye name={icone} size={25} color='whitesmoke'/>                    
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            ) : null
                        }
                    </View>                    
                
                <View style={styles.btnContainer}>
                    <DefaultButton
                        buttonText={'Logout'}
                        handlePress={confirmarLogout}/>
                    <DefaultButton
                        buttonText={'Edit'}
                        handlePress={()=> props.navigation.navigate('EditPerfil')}/>
                </View> 
                    <Text style={{color:'whitesmoke', fontSize:20, textAlign:'center', marginTop:20}}>
                        Your requests
                    </Text>
                    <View style={{borderWidth:1, borderColor:'whitesmoke', marginBottom:20, margin:10}}/>        
                    <FlatList
                        data={conta}
                        keyExtractor={pedido => pedido.id}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        renderItem={({ item: pedido })=>(
                            <View style={styles.card} key={pedido.id}>
                                <Text style={{textAlign:'center', color:'whitesmoke'}}>
                                    Request made at {pedido.ordem}
                                </Text>
                                <View style={styles.produto}>                                        
                                    <Text style={styles.txtStyle}>Product</Text>
                                    <Text style={styles.txtStyle}>{pedido.pedido}</Text>
                                </View>
                                <View style={styles.produto}>                                        
                                    <Text style={styles.txtStyle}>Quantity</Text>
                                    <Text style={styles.txtStyle}>{pedido.quantidade}</Text>
                                </View>
                                <View style={styles.produto}>                                        
                                    <Text style={styles.txtStyle}>Price</Text>
                                    <Text style={styles.txtStyle}>$ {pedido.preco.toFixed(2)}</Text>
                                </View>
                                <View style={styles.produto}>                                        
                                    <Text style={styles.txtStyle}>Total</Text>
                                    <Text style={styles.txtStyle}>$ {pedido.total.toFixed(2)}</Text>
                                </View>
                                <View style={{alignItems:'center', marginTop:5}}>
                                    <DefaultButton
                                        width={'85%'}
                                        buttonText={'Quit request'}
                                        handlePress={()=> solicitarRemocaoDePedido(pedido)}/>
                                </View>
                            </View>
                        )}/>  
                {
                    conta.length > 0 ?(
                        <View style={{alignItems:'center', margin:10}}>
                            <DefaultButton
                                width={'80%'}
                                buttonText={'Pay off'}
                                handlePress={confirmarFechaconta}/>
                        </View>
                    ) : null
                }
            </View>
        </ImageBackground>
    )
}


export default Perfil