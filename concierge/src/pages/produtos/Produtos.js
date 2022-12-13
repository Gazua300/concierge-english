import { useCallback, useContext, useEffect, useState } from "react"
import Context from "../../global/Context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DefaultButton from "../../components/DefaultButton"
import { 
    FlatList,
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    Alert
} from 'react-native'
import axios from "axios"
import { url } from "../../constants/url"



const Produtos = (props)=>{
    const { requests } = useContext(Context)
    const [refresh, setRefresh] = useState(false)
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('')
    const [itens, setItens] = useState([])

  
   
   
    useEffect(()=>{
        produtos()
    }, [])


    const wait = (timeout)=>{
        return new Promise(resolve=> setTimeout(resolve, timeout))
    }

    const onRefresh = useCallback(()=>{
        setRefresh(true)
        produtos()
        wait(3000).then(()=>{
            setRefresh(false)
        }).catch(e=>{
            console.log(e)
        })
    }, [])


    const produtos = async()=>{
        const id = await AsyncStorage.getItem('id')
        
        axios.get(`${url}/cardapio/place/${id}`).then(res=>{
            setItens(res.data)
        }).catch(e=>{
            console.log(e.response.data)
        })
    }
    

    const inserirProduto = async()=>{
        const id = await AsyncStorage.getItem('id')

        const body = {
            nome,
            preco
        }
        axios.post(`${url}/cardapio/${id}`, body).then(()=>{
            produtos()
        }).catch(e=>{
            alert(e.response.data)
        })
    }
    

    const limpar = ()=>{
        setNome('')
        setPreco('')
    }


    const confirmarRemocao = (item)=>{
        Alert.alert(
            'Alerta',
            `Tem certeza que deseja excluir ${item.nome}?`,
            [
                {
                    text:'Cancelar'
                },
                {
                    text:'Ok',
                    onPress: ()=> removerProduto(item.id)
                }
            ]
        )
    }


    const removerProduto = (id)=>{
        axios.delete(`${url}/cardapio/${id}`).then(res=>{
            produtos()
        }).catch(e=>{
            alert(e.response.data)
        })
    }

    
    
    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                <Text style={styles.title}>Insert Products</Text>
                <View style={styles.formContainer}>            
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            onChangeText={setNome}
                            value={nome}
                            placeholder='Product'
                            placeholderTextColor='rgba(255, 255, 255, 0.4)'/>            
                        <TextInput style={styles.inputPreco}
                            onChangeText={setPreco}
                            value={preco}
                            keyboardType='numeric'
                            placeholder='$ 0,00'
                            placeholderTextColor='rgba(255, 255, 255,0.4)'/>
                    </View>                                    
                    <View style={styles.btnContainer}>
                        <DefaultButton
                            handlePress={limpar}
                            buttonText={'Erase'}/>
                        <DefaultButton
                            handlePress={inserirProduto}
                            buttonText={'Regist'}/>
                    </View>
                </View>

                <Text style={{
                    fontSize: 25,
                    textAlign: 'center',
                    margin: 10,
                    color: 'whitesmoke'
                }}>List</Text>
                <View style={{borderWidth:1, marginHorizontal:5, borderColor:'#ae8625'}}/>
                <FlatList
                    refreshing={refresh}
                    onRefresh={onRefresh}
                    data={itens}
                    keyExtractor={item => item.id}
                    renderItem={({item})=>(
                        <View style={styles.card}>
                            <View style={styles.txtContainer}>
                                <Text style={styles.txtStyle}>{item.nome}</Text>
                                <Text style={styles.txtStyle}>$ {item.preco.toFixed(2)}</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <DefaultButton
                                    width={'90%'}
                                    buttonText={'Remove'}
                                    handlePress={()=> confirmarRemocao(item)}/>
                            </View>
                        </View> 
                    )}/>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        margin: 20,
        color:'whitesmoke'
    },
    formContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 30
    },
    input: {
        color: 'whitesmoke',
        borderBottomWidth: 1,
        borderColor: '#ae8625',
        padding: 10,
        fontSize: 20,
        width: '50%',
        height: 50,
        marginRight: 27
    },
    inputPreco: {
        color: 'whitesmoke',
        borderBottomWidth: 1,
        borderColor: '#ae8625',
        padding: 10,
        fontSize: 20,
        height: 50,
        marginLeft: 27
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        margin: 15,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ae8625',
    },
    txtContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txtStyle: {
        fontSize: 20,
        marginBottom: 10,
        color: 'whitesmoke'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '95%'
    },
    remove: {
        backgroundColor: '#ae8625',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10
    }
})

export default Produtos