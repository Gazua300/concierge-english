import { useContext, useEffect, useState } from 'react'
import Context from '../../global/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../../constants/url'
import styles from './styles'
import DefaultInput from '../../components/DefaultInput'
import DefaultButton from '../../components/DefaultButton'
import { 
    View,
    ImageBackground,
    Alert,
    BackHandler
} from 'react-native'



const EditProfile = (props)=>{
    const { states, requests } = useContext(Context)
    const place = states.place
    const [nome, setNome] = useState(place.nome)
    const [email, setEmail] = useState(place.email)
    const [servico, setServico] = useState(place.servico)
    const [responsavel, setResponsavel] = useState(place.responsavel)
    const [mesas, setMesas] = useState(place.mesas)
    const [endereco, setEndereco] = useState(place.endereco)
    const [contato, setContato] = useState(place.contato)
    const width = '85%'
    
    

    BackHandler.addEventListener('hardwareBackPress', ()=>{
        props.navigation.navigate('Profile')

        return true
    })


    
    useEffect(()=>{
        requests.dadosDoLocal()
    }, [])
    


    const limpar = ()=>{
        setEmail('')
        setEndereco('')
        setNome('')
        setResponsavel('')
        setContato('')
        setServico('')
        setMesas('')
    }


    const confirmarAtualizacao = ()=>{
        Alert.alert(
            'Atention!',
            'Are you sure you want to change your details?',
            [
                {
                    text:'Cancel'
                },
                {
                    text:'Ok',
                    onPress: ()=> atualizar()
                }
            ]
        )
    }


    const atualizar = async()=>{
        const id = await AsyncStorage.getItem('id')

        const body = {
            nome,
            servico,
            responsavel,
            mesas,
            endereco,
            contato,
            email
        }
        axios.put(`${url}/client/${id}`, body).then(res=>{
            requests.dadosDoLocal()
            props.navigation.navigate('Profile')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const confirmarDel = ()=>{
        Alert.alert(
            'Atention!',
            'This will erase all of your account registration. Are you sure you want to continue?',
            [
                {
                    text:'Cancel'
                },
                {
                    text:'Ok',
                    onPress: ()=> delConta()
                }
            ]
        )
    }


    const delConta = async()=>{
        const id = await AsyncStorage.getItem('id')

        axios.delete(`${url}/client/${id}`).then(res=>{
            Alert.alert(
                'Conta excluída',
                res.data
            )
            logout()
        }).catch(e=>{
            Alert.alert(
                `It wasn't possible to delete your account:`,
                e.response.data
            )
        })

    }
       

    const logout = async()=>{
        try{
            await AsyncStorage.clear()
            props.navigation.navigate('Login')
        }catch(e){
            alert(e)
        }
    }



    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                    <DefaultInput
                        width={width}
                        onChangeText={setNome}
                        value={nome}
                        placeholder={'New name'}/>
                    <DefaultInput
                        width={width}
                        onChangeText={setEmail}
                        value={email}
                        placeholder={'newemail@email.com'}/>
                    <DefaultInput
                        width={width}
                        onChangeText={setEndereco}
                        value={endereco}
                        placeholder={'New address'}/>
                    <DefaultInput
                        width={width}
                        onChangeText={setContato}
                        value={contato}
                        keyboardType={'numeric'}
                        placeholder={'Area code and number phone'}/>
                    <DefaultInput
                        width={width}
                        onChangeText={setServico}
                        value={servico}
                        placeholder={'Service offered'}/>
                    <DefaultInput
                        width={width}
                        onChangeText={setMesas}
                        value={mesas}
                        placeholder={'Number of tables'}
                        keyboardType={'numeric'}/>
                    <DefaultInput
                        width={width}
                        onChangeText={setResponsavel}
                        value={responsavel}
                        placeholder={`Place's responsible`}/>
                    <View style={styles.btnContainer}>
                        <DefaultButton
                            buttonText={'Erase'}
                            handlePress={limpar}/>
                        <DefaultButton
                            buttonText={'Save'}
                            handlePress={confirmarAtualizacao}/>
                    </View>
                    <DefaultButton
                        width={'82%'}
                        buttonText={'Delete account'}
                        handlePress={confirmarDel}/>
            </View>
        </ImageBackground>
    )
}


export default EditProfile