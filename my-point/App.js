import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GlobalState } from "./src/global/Context"
import Person from 'react-native-vector-icons/Ionicons'
import HomeIcon from 'react-native-vector-icons/Entypo'
import Food from 'react-native-vector-icons/Ionicons'
import Signup from './src/pages/signup/Signup'
import Login from "./src/pages/login/Login"
import Home from "./src/pages/home/Home"
import Estabelecimento from "./src/pages/estabelecimento/Estabelecimento"
import Cardapio from "./src/pages/cardapio/Cardapio"
import Pedido from "./src/pages/pedido/Pedido"
import Location from './src/pages/location/Location'
import Perfil from "./src/pages/perfil/Perfil"
import EditPerfil from "./src/pages/editPerfil/EditPerfil"
import SplashAnimated from "./src/pages/splashAnimated/SplashAnimated"
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet
} from 'react-native'




const Stack = createNativeStackNavigator()



export default function App() {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#ae8625'/>
      <GlobalState>
        <Stack.Navigator
          initialRouteName="SplashAnimated"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor: '#CC9900',                                  
            },
            headerTintColor: 'whitesmoke',
          }}>


          <Stack.Screen
            name="SplashAnimated"
            component={SplashAnimated}
            options={({navigation})=>({
              headerShown: false
            })}/>

          <Stack.Screen
            name="Login"
            component={Login}
            options={({navigation})=>({
              title: 'My point',
              headerLeft: ()=>(
                <View/>
              )
            })}/>
          
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={({navigation})=>({
              title: 'Signup'
            })}/>

          <Stack.Screen
            name="Home"
            component={Home}
            options={({navigation})=>({
              title: 'Lista de locais',
              headerLeft: ()=>(
                <View/>
              )
            })}/>

          <Stack.Screen
            name="Cardapio"
            component={Cardapio}
            options={({navigation})=>({
              title: 'Menu',
              headerRight: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Perfil')}>
                  <Person name="person" size={30} color='whitesmoke'/>
                </TouchableOpacity>
              ),
              headerLeft: ()=>(
                  <TouchableOpacity onPress={()=> navigation.navigate('Estabelecimento')}>
                    <HomeIcon name="home" size={25} color='whitesmoke'/>
                  </TouchableOpacity>
                )
            })}/>

          <Stack.Screen
            name="Pedido"
            component={Pedido}
            options={({navigation})=>({
              title: 'Requests',
              headerLeft: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Cardapio')}>
                  <Food name="restaurant" size={25} color='whitesmoke'/>
                </TouchableOpacity>
              ),
              headerRight: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Perfil')}>
                  <Person name="person" size={30} color='whitesmoke'/>
                </TouchableOpacity>
              )
            })}/>          

          <Stack.Screen
            name="Estabelecimento"
            component={Estabelecimento}
            options={({navigation})=>({
              title: 'Local',
              headerLeft: ()=>(
                <TouchableOpacity style={styles.restaurant}
                  onPress={()=> navigation.navigate('Cardapio')}>
                  <Food name="restaurant" size={25} color='whitesmoke'/>
                </TouchableOpacity>
              ),
              headerRight: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Perfil')}>
                  <Person name="person" size={30} color='whitesmoke'/>
                </TouchableOpacity>
              )
            })}/>
          
          <Stack.Screen
            name="Location"
            component={Location}
            options={({navigation})=>({
              title: 'Localização',
              // headerShown: false
            })}/>
          
          <Stack.Screen
            name="Perfil"
            component={Perfil}
            options={({navigation})=>({
              title: 'Perfil do usuário',
              headerLeft: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Cardapio')}>
                  <Food name="restaurant" size={25} color='whitesmoke'/>
                </TouchableOpacity>
              ),
              headerRight: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Estabelecimento')}>
                  <HomeIcon name="home" size={25} color='whitesmoke'/>
                </TouchableOpacity>
              )
            })}/>

          <Stack.Screen
            name="EditPerfil"
            component={EditPerfil}
            options={({navigation})=>({
              title: 'Atualização de  perfil'
            })}/>

        </Stack.Navigator>
      </GlobalState>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  restaurant: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})
