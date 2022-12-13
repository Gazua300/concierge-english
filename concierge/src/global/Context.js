import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { createContext, useState, useEffect, useRef } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { url } from "../constants/url"


const Context = createContext()


//inicio do expo-notification
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
});
  
//final parcial


export const GlobalState = (props)=>{      
    
    const [show, setShow] = useState(false)    
    const [pedidos, setPedidos] = useState([])
    const [cliente, setCliente] = useState({})
    const [place, setPlace] = useState({})
    const [titulo, setTitulo] = useState('')
    const [msg, setMsg] = useState('')
    
    
    //Espaço para expo-notification
    
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    
    
    console.log('token gerado:', expoPushToken)



    useEffect(() => {
      registerForPushNotificationsAsync().then(async(token)=>{
        setExpoPushToken(token)

        const id = await AsyncStorage.getItem('id')

        const body = {
          pushToken: token
        }
        axios.put(`${url}/client/notification/${id}`, body).then(res=>{
          console.log(res.data)
        }).catch(e=>{
          throw new Error(e.response.data)
        })

      })
    }, [])

    
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


    const getId = async(tk)=>{
      try{
          await AsyncStorage.setItem('id', tk)
      }catch(e){
          alert(e)
      }
    }
    

    const requestsByClient = (id)=>{
      axios.get(`${url}/requests/${id}`).then(res=>{
          setPedidos(res.data)
      }).catch(e=>{
          alert(e.response.data)
      })
    }
        
      
    const updateClientPushToken = async()=>{
      try{

        const id = await AsyncStorage.getItem('id')

        const body = {
          pushToken: expoPushToken
        }
        axios.put(`${url}/client/notification/${id}`, body).then(res=>{
          console.log(res.data)
        }).catch(e=>{
          throw new Error(e.response.data)
        })

      }catch(e){
        console.log(e)
      }
    }
    
        
    async function sendPushNotification(pushtoken, titulo, msg) {
        const message = {
          to: pushtoken,
          sound: 'default',
          title: titulo,
          body: msg,
          data: { someData: 'goes here' },
        };
       console.log('Aqui porra:',message.to) 
        await axios.post('https://exp.host/--/api/v2/push/send', message).then(res=>{
          console.log(res.data)
        }).catch(e=>{
          console.log(e.response.data)
        })
    }


    
    const perfilDoUsuario = async()=>{

      axios.get(`${url}/user/${cliente.id}`).then(res=>{
          setCliente(res.data)
      }).catch(e=>{
          console.log(e.response.data)
      })
    }


    const dadosDoLocal = async()=>{
      const id = await AsyncStorage.getItem('id')
      
      axios.get(`${url}/client/${id}`).then(res=>{
          setPlace(res.data)
      }).catch(e=>{
          console.log(`Resultado da função getPlace em context:`, e.response.data)
      })
    } 

   
    const states = { show, pedidos, cliente, msg, titulo, expoPushToken, place }
    const setters = { setShow, getId, setPedidos, setCliente, setTitulo, setMsg }
    const requests = {
      requestsByClient,
      sendPushNotification,
      perfilDoUsuario,
      updateClientPushToken,
      dadosDoLocal
    }

    return(
        <Context.Provider value={{ states, setters, requests }}>
            {props.children}
        </Context.Provider>
    )
}

export default Context
  