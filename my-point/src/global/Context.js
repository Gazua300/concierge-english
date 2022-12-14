import { useEffect, useRef, createContext, useState } from "react"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { url } from "../constants/url"
import { Alert } from "react-native";


const Context = createContext()


//inicio do expo-notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

//final parcial


export const GlobalState = (props)=>{
    const [place, setPlace] = useState({})    
    const [pedido, setPedido] = useState({})
    const [perfil, setPerfil] = useState({})
    const [conta, setConta] = useState([])
        
   
    

    //Espaço para expo-notifications

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    console.log(`Token gerado no context: ${expoPushToken}`)

    
    useEffect(() => {
        registerForPushNotificationsAsync().then(async(token) =>{
          setExpoPushToken(token)

          const id = await AsyncStorage.getItem('id')
          const body = {
            pushToken: expoPushToken
          }
          axios.put(`${url}/notification/${id}`, body).then(res=>{
            console.log(res.data)
          }).catch(e=>{
            console.log(`Erro ao armezenar token de notificação no banco de dados : `, e.response.data)
          })

        })    

    }, [])


//PEGAR TOKEN

    async function registerForPushNotificationsAsync() {
      let token;
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
                
      } else {
        console.log('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      return token;
    }

    
//ENVIAR NOTIFICAÇÃO

    async function sendPushNotification(pushtoken, title, body) {
      const message = {
        to: pushtoken,
        sound: 'default',
        title: title,
        body: body,
        data: { someData: 'goes here' },
      };
    
      await axios.post('https://exp.host/--/api/v2/push/send', message).then(res=>{
          console.log(res.data)
        }).catch(e=>{
          alert('É aqui parece', e.response.data)
        })
    }
    
    

//fim do expo-notifications

   
    
    const mostrarUsuario = async()=>{
      const id = await AsyncStorage.getItem('id')

      axios.get(`${url}/user/${id}`).then(res=>{
          setPerfil(res.data)
      }).catch(e=>{
          console.log(`Erro ao pegar perfil na função mostrarUsuario ${e}`)
      })
    } 
    

    const updateUserPushToken = async()=>{
      try{

        const id = await AsyncStorage.getItem('id')

        const body = {
          pushToken: expoPushToken
        }
        axios.put(`${url}/notification/${id}`, body).then(res=>{
          console.log(res.data)
        }).catch(e=>{
          console.log(`Erro na função updateUserPushTokenm: ${e.response.data}`)
        })

      }catch(e){
        console.log(`Demais erros da updateUserPushToken: ${e}`)
      }
    }    


    const pedidosPorCliente = async()=>{
      try{
        
          const id = await AsyncStorage.getItem('id')

          axios.get(`${url}/requests/${id}`).then(res=>{
              setConta(res.data)
          }).catch(e=>{
              console.log(`Erro na função fecharConta: ${e.response.data}`)
          })
      }catch(e){
         console.log(`Demais erros de fecharConta: ${e}`)
      }
      
    }

    
    
    const states = {
      pedido, perfil,
      place,
      expoPushToken,
      conta
    }
    const setters = { setPedido, setPlace }
    const requests = {
      mostrarUsuario,
      sendPushNotification,
      pedidosPorCliente,
      updateUserPushToken
    }
    

    return(
        <Context.Provider value={{ states, setters, requests }}>
            {props.children}
        </Context.Provider>
    )
}

export default Context

