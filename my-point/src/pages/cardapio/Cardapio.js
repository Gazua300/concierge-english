import { useCallback, useContext, useEffect, useState } from "react"
import Context from "../../global/Context"
import axios from "axios"
import { url } from "../../constants/url"
import styles from "./styles"
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    BackHandler,
    Alert
} from 'react-native'



const Cardapio = (props)=>{      
    const { states, setters, requests } = useContext(Context)
    const perfil = states.perfil
    const [cardapio, setCardapio] = useState([])
    const [refreshing, setRefreshing] = useState(false)


    
    useEffect(()=>{
        requests.mostrarUsuario()
        mostrarCardapio()
    }, [])


    BackHandler.addEventListener('hardwareBackPress', ()=>{
        props.navigation.navigate('Estabelecimento')

        return true
    })

    
    const wait = (timeout)=>{
        return new Promise(res => setTimeout(res, timeout))
    }

    const onRefresh = useCallback(()=>{
        setRefreshing(true)
        mostrarCardapio()
        wait(2000).then(()=> setRefreshing(false))
    }, [])

    
    const mostrarCardapio = ()=>{
        axios.get(`${url}/cardapio/place/${states.place.id}`).then(res=>{
            setCardapio(res.data)
        }).catch(e=>{
            Alert.alert(
                'Erro ao carregar cardápio:',
                `${e.response.data}`
            )
        })
    }


    const fazerPedido = (id)=>{
        requests.mostrarUsuario()
        if(!perfil.mesa){
            Alert.alert(
                'You need to choose a table first:',
                `You didn't take a seat. Please return to the last page and choose a vacant table`,
                [
                    {
                        text:'Cancelar'
                    },

                    {
                        text:'Ok',
                        onPress: ()=> props.navigation.navigate('Estabelecimento')
                    }
                ]
            )
        }else if(!perfil.permission_id || perfil.permission_id !== perfil.estabelecimento){
            Alert.alert(
                'Waiting for permission to make requests:',
                `After choosing your table the establishment will verify if you're in the place.`
            )
        }else{
            axios.get(`${url}/cardapio/${id}`).then(res=>{
                setters.setPedido(res.data)
                props.navigation.navigate('Pedido')
            }).catch(e=>{
                console.log(e.response.data)
            })
        }        
        
    }

    
 
    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <FlatList
                    data={cardapio}
                    keyExtractor={item => item.id}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    renderItem={({ item })=>(
                        <TouchableOpacity onPress={()=> fazerPedido(item.id)}>
                            <View style={styles.card}>
                                <View style={styles.produto}>
                                    <Text style={styles.txtStyle}>{item.nome}</Text>
                                    <Text style={styles.txtStyle}>R$ {item.preco.toFixed(2)}</Text>                                    
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}/>
            </View>
        </ImageBackground>
    )
}


export default Cardapio