import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GlobalState } from "./src/global/Context"
import Perfil from 'react-native-vector-icons/Ionicons'
import List from 'react-native-vector-icons/FontAwesome'
import Back from 'react-native-vector-icons/AntDesign'
import Send from 'react-native-vector-icons/FontAwesome'
import HomeIcon from 'react-native-vector-icons/Entypo'
import CreateClient from "./src/pages/createClient/CreateClient"
import InsertAdress from "./src/pages/createClient/InsertAddress"
import Login from './src/pages/login/Login'
import Home from "./src/pages/home/Home"
import Pedidos from "./src/pages/pedidos/Pedidos"
import Produtos from "./src/pages/produtos/Produtos"
import Profile from './src/pages/profile/Profile'
import EditProfile from "./src/pages/editProfile/EditProfile"
import EnviarNotificacao from './src/pages/enviarNotificacao/EnviarNoficacao'
import Auth from "./src/pages/auth/Auth"
import RedefinirSenha from './src/pages/redefinirSenha/RedefinirSenha'
import Location from "./src/pages/location/Location"
import SplashAnimated from "./src/pages/splashAnimated/SplashAnimated"
import { TouchableOpacity, StatusBar, View } from 'react-native'




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
            options={{
              headerShown: false
            }}/>

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login',
              headerLeft: ()=>(
                <View/>
              )
            }}/>

          <Stack.Screen
            name="CreateClient"
            component={CreateClient}
            options={{
              title: 'Signup'
            }}/>
          
          <Stack.Screen
            name="InsertAddress"
            component={InsertAdress}
            options={({navigation})=>({
              title: 'Insert address',
              headerLeft: ()=>(
                <View/>
              )
            })}/>

          <Stack.Screen
            name="Home"
            component={Home}
            options={({navigation})=>({
              title: 'Clients and requests',
              headerLeft: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Produtos')}>
                  <List name="list-alt" size={30} color='whitesmoke'/>
                </TouchableOpacity>
              ),
              headerRight: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                  <Perfil name="person" color='whitesmoke' size={30}/>
                </TouchableOpacity>
              )
            })}/>

          <Stack.Screen
              name="Produtos"
              component={Produtos}
              options={({navigation})=>({
                title: 'Products',
                headerRight: ()=>(
                  <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                    <Perfil name="person" color='whitesmoke' size={30}/>
                  </TouchableOpacity>
                )
              })}/>

          <Stack.Screen
            name='Profile'
            component={Profile}
            options={({navigation})=> ({
              title: 'Your profile',
              headerRight: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
                  <HomeIcon name='home' size={30} color='whitesmoke'/>
                </TouchableOpacity>
              ),
              headerLeft: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Produtos')}>
                  <List name="list-alt" size={30} color='whitesmoke'/>
                </TouchableOpacity>
              )
            })}/>

          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={({navigation})=>({
              title: 'Update profile',
              headerLeft: ()=>(
                <TouchableOpacity
                  onPress={()=> navigation.navigate('Profile')}>
                  <Back name="arrowleft" size={25} color='whitesmoke'/>
                </TouchableOpacity>
              )
            })} />
          
          <Stack.Screen
            name="Pedidos"
            component={Pedidos}
            options={({navigation})=>({
              title: 'Requests of the client',
              headerRight: ()=> (
                <TouchableOpacity onPress={()=> navigation.navigate('EnviarNotificacao')}>
                  <Send name="send" color='whitesmoke' size={25}/>
                </TouchableOpacity>
              )
            })} />
          
          <Stack.Screen
            name="EnviarNotificacao"
            component={EnviarNotificacao}
            options={({navigation})=>({
              title: 'Send notifications'
            })} />

          <Stack.Screen
            name="Auth"
            component={Auth}
            options={({navigation})=>({
              title: 'Authentication'
            })}/>

          <Stack.Screen
            name="RedefinirSenha"
            component={RedefinirSenha}
            options={({navigation})=>({
              title: 'Reset password'
            })}
            />
          
          <Stack.Screen
            name="Location"
            component={Location}
            options={({navigation})=>({
              title: 'Insert coordinates'
            })}
            />

        </Stack.Navigator>
      </GlobalState>
    </NavigationContainer>
  )
}
