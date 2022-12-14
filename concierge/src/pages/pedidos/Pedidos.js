import { useContext } from 'react'
import axios from 'axios'
import { url } from '../../constants/url'
import Context from '../../global/Context'
import DefaultButton from '../../components/DefaultButton'
import { 
    FlatList,
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Alert
 } from 'react-native'




const Pedidos = (props)=>{
    const { states, requests } = useContext(Context)
    const pedidos = states.pedidos
    
    


    const deletePedido = (id)=>{
        axios.delete(`${url}/request/${id}`).then(res=>{
            requests.requestsByClient(states.cliente.id)            
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    
    const remover = (pedido)=>{
        Alert.alert(
            'Are you sure you want to remove the request?',
            `Verify if it's paid off.`,
            [
                {
                    text:'Cancel',                                        
                },
                {
                    text:'Ok',
                    onPress: ()=> {
                        deletePedido(pedido.id)
                        requests.sendPushNotification(
                            states.cliente.push_token,
                            'Reuqest removed',
                            `Establishment removed your request of ${pedido.pedido}`
                        )
                    }
                }
            ]
        )
    }


    const fecharConta = ()=>{
        axios.delete(`${url}/requests/user/${states.cliente.id}`)
        .then(res=>{
            alert(res.data)
            requests.sendPushNotification(
                states.cliente.push_token,
                'Debt paid off',
                'Your debt has just been paid off by establishment'
            )
            props.navigation.navigate('Home')
        }).catch(e=>{
            alert(e.response.data)
        })
    }



    const confirmarFechamentoDeConta = ()=>{
        const valores = pedidos.map(valor=>{
            return valor.total
        })
        
        const total = valores.reduce((accumulator, value)=>{
            return accumulator + value
        })

        Alert.alert(
            'Total to pay',
            `Debt: $ ${total.toFixed(2)}\n\nClient will be notified.`,
            [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Ok',
                    onPress: ()=> fecharConta()
                }
            ]
        )
    }

    
    
    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>   
                <FlatList
                    data={pedidos}
                    keyExtractor={pedido => pedido.id}
                    renderItem={({ item: pedido })=>(
                        <View style={styles.card}>
                            <View>
                                <Text style={styles.txtStyle}>
                                    {pedido.pedido} - Table {pedido.mesa}{'\n'}     
                                    <Text style={{fontSize:15, fontWeight:'normal'}}>
                                        Request made at {pedido.ordem}
                                    </Text>                               
                                </Text>                                
                            </View>
                            <View>
                                <Text style={styles.pedido}>
                                    <Text style={{fontWeight:'bold'}}>
                                        Value:
                                    </Text> $ {pedido.preco.toFixed(2)}{'\n'}
                                    <Text style={{fontWeight:'bold'}}>
                                        Quantity:
                                    </Text> {pedido.quantidade}{'\n'}
                                    <Text style={{fontWeight:'bold'}}>
                                        Total:
                                    </Text> $ {pedido.total.toFixed(2)}
                                </Text>
                            </View>
                            <View style={{alignItems:'center', marginTop:10}}>
                                <DefaultButton
                                    width={'90%'}
                                    handlePress={()=> remover(pedido)}
                                    buttonText={'Remove'}/>
                            </View>                                
                        </View>
                    )}/>
                <View style={{alignItems:'center'}}>
                    <DefaultButton
                        buttonText={'Fechar conta'}
                        handlePress={confirmarFechamentoDeConta}
                        width={'90%'}
                        margin={10}
                        />
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
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#ae8625',
        borderRadius:10,
        margin: 15,
        padding: 20,
    },
    txtStyle: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'whitesmoke',
        marginBottom: 20
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pedido: {
        color: 'whitesmoke',
        fontSize: 20,
        lineHeight: 30
    },
    button: {
        backgroundColor: '#ae8625',
        padding: 5,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center'
    },
    btnFecharConta: {
        backgroundColor: '#ae8625',
        padding: 5,
        borderRadius: 10,
        margin: 20,
        alignItems: 'center'
    }
})


export default Pedidos