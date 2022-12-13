import { useContext, useEffect, useState } from "react"
import Context from "../../global/Context"
import axios from "axios"
import { url } from "../../constants/url"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DefaultButton from "../../components/DefaultButton"
import styles from "./style" 
import { 
    View,
    Text,
    TextInput,
    ImageBackground,
    ScrollView,
    BackHandler
} from 'react-native'




const Pedido = (props)=>{
    const [quantidade, setQuantidade] = useState('')
    const [compra, setCompra] = useState('')
    const { states, requests } = useContext(Context)
    const pedido = states.pedido
    const conta = states.conta
    
    
   
    useEffect(()=>{
        requests.mostrarUsuario()
    }, [])



    BackHandler.addEventListener('hardwareBackPress', ()=>{
        props.navigation.navigate('Cardapio')

        return true
    })
    

    let total = pedido.preco * quantidade   
    

    const realizarPedido = async()=>{
        try{            
            
            const id = await AsyncStorage.getItem('id')
            const tempoAtual = new Date()
            const ordem = `${tempoAtual.getHours()} : ${tempoAtual.getMinutes()}`
        
            const body = {
                quantidade,
                cliente: id,
                ordem
            }
            
            axios.post(`${url}/request/${pedido.id}`, body).then(res=>{
                setCompra(res.data)
                setQuantidade('')
                requests.pedidosPorCliente()
                requests.sendPushNotification(
                    states.place.push_token,
                    `Request to table ${states.perfil.mesa}`,
                    'Verify requests list at the home page'
                    )
            }).catch(e=>{
                alert(e.response.data)
            })
        }catch(e){
            console.log(e)
        } 
        
    }
    



    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.txtContainer}>
                        <Text style={styles.txtStyle}>
                            {pedido.nome}
                        </Text>
                        <Text style={styles.txtStyle}>
                            R$ {pedido.preco.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput style={styles.inputQnt}
                            onChangeText={setQuantidade}
                            value={quantidade}
                            keyboardType='numeric' 
                            placeholder="Quantity"
                            placeholderTextColor='rgba(255, 255, 255, 0.4)'/>                    
                    </View>
                    <View style={styles.btnContainer}>
                        <DefaultButton
                            buttonText={'Request'}
                            handlePress={realizarPedido}/>
                    </View>
                    <Text style={{color:'whitesmoke',fontSize:20, textAlign:'center'}}>
                        {compra}
                    </Text>
                    <Text style={{
                        color:'whitesmoke', fontSize:25, margin:30,
                        textAlign:'center'
                    }}>Total of request: $ {total.toFixed(2)}{'\n'}
                    </Text>
                    <View style={styles.btnTotalDaConta}>
                        {
                            conta.length > 0 
                            ?  
                            <DefaultButton
                                buttonText={'Your total'}
                                handlePress={()=> props.navigation.navigate('Perfil')}
                                />
                            :
                            null
                            
                        }
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}



export default Pedido