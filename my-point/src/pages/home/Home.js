import { useContext, useEffect, useState, useCallback } from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/url'
import AsyncStorage from "@react-native-async-storage/async-storage"
import DefaultButton from '../../components/DefaultButton'
import styles from './styles'
import { 
    View,
    Text,
    ImageBackground,
    FlatList,
    BackHandler,
    Alert
 } from 'react-native'



const Home = (props)=>{
    const { setters } = useContext(Context)
    const [places, setPlaces] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)



   
    useEffect(()=>{
        mostrarEstabelecimentos()
    }, [])


    
    BackHandler.addEventListener('hardwareBackPress', ()=>{
        props.navigation.navigate('Home')

        return true
    })


    const wait = (timeout) => { 
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        mostrarUsuarios() 
        wait(2000).then(() => setIsRefreshing(false))
    }, []);


    const mostrarEstabelecimentos = ()=>{
        axios.get(`${url}/clients`).then(res=>{
            setPlaces(res.data)
        }).catch(e=>{
            console.log(`Erro na função mostrarUsuarios ${e}`)
        })
    }


    const acessarEstabelecimento = async(place)=>{
        const body = {
              userId: await AsyncStorage.getItem('id')
        } 

        axios.post(`${url}/place/${place.id}`, body).then(res=>{
            setters.setPlace(place)
            props.navigation.navigate('Estabelecimento')
        }).catch(e=>{
            Alert.alert(
                `It's not possible to access local at the time:`,
                `${e.response.data}`
            )
        })
    }


    const getPlaceById = (id)=>{        
        axios.get(`${url}/client/${id}`).then(res=>{
            setters.setPlace(res.data)
            if(!res.data.latitude || !res.data.longitude){
            Alert.alert(
                `Isn't possible to access location at the time:`,
                'Coordinates were not insert yet'
                )
            }else{
            props.navigation.navigate('Location')
            }
        }).catch(e=>{
            Alert.alert(
                `Isn't possible to access location at the time:`,
                e.reponse.data
                )
        })
      
    }


    
    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <FlatList
                    data={places}
                    keyExtractor={place => place.id}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                    renderItem={({item: place})=>(
                        <View style={styles.card}>
                            <View>
                                <Text style={styles.title}>
                                    {place.nome}                                    
                                </Text>
                                <Text style={styles.txtStyle}>
                                    {place.servico}{'\n'}
                                    {place.mesas} tables{'\n'}
                                    {place.endereco}{'\n'}
                                    ({String(place.contato).substring(0,2)}){' '}
                                    {String(place.contato).substring(2,7)}-
                                    {String(place.contato).substring(7,11)}
                                </Text>
                            </View>
                            <View style={styles.btnContainer}>
                                <DefaultButton
                                    buttonText={'Location'}
                                    handlePress={()=> getPlaceById(place.id)}/>
                                <DefaultButton
                                    buttonText={'Enter'}
                                    handlePress={()=> acessarEstabelecimento(place)}/>
                            </View>
                        </View>
                    )}/>
            </View>
        </ImageBackground>
    )
}


export default Home