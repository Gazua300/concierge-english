import { useContext, useState } from "react"
import Context from "../../global/Context"
import axios from 'axios'
import { url } from "../../constants/url"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DefaultButton from "../../components/DefaultButton"
import DefaultInput from "../../components/DefaultInput"
import {
    View,
    StyleSheet,
    ImageBackground,
    ScrollView,
    BackHandler,
    Alert
} from "react-native"


const InsertAdress = (props)=>{
    const { states, setters, requests } = useContext(Context)
    const [endereco, setEndereco] = useState('')
    const [contato, setContato] = useState('')
    const [servico, setServico] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [mesas, setMesas] = useState('')
    const measure = 10



    BackHandler.addEventListener('hardwareBackPress', ()=>{
        return true
    })



    const register = async()=>{
        const id = await AsyncStorage.getItem('id')
        
        const body={
            endereco,
            contato,
            servico,
            responsavel,
            mesas
        }  
        axios.put(`${url}/client/address/${id}`, body).then(res=>{
            props.navigation.navigate('Home')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    
    const limpar = ()=>{
        setContato('')
        setEndereco('')
        setMesas('')
        setResponsavel('')
        setServico('')
    }



    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/login-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                    <DefaultInput
                        autoFocus={true}
                        margin={measure}
                        onChangeText={setEndereco}
                        value={endereco}
                        placeholder={'Place address'}/>
                    <DefaultInput
                        margin={measure}
                        onChangeText={setContato}
                        value={contato}
                        keyboardType={'numeric'}
                        placeholder={'Area code and phone number'}/>
                    <DefaultInput
                        margin={measure}
                        onChangeText={setServico}
                        value={servico}
                        placeholder={'Service offered'}/>
                    <DefaultInput
                        margin={measure}
                        onChangeText={setMesas}
                        value={mesas}
                        keyboardType={'numeric'}
                        placeholder={'Number of tables'}/>
                    <DefaultInput
                        margin={measure}
                        onChangeText={setResponsavel}
                        value={responsavel}
                        placeholder={'Responsible person'}/>
                    <View style={styles.btnContainer}>
                        <DefaultButton
                            buttonText={'Erase'}
                            handlePress={limpar}/>
                        <DefaultButton
                            buttonText={'Save'}
                            handlePress={register}/>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 20
    },
    btnContainer: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    }
})


export default InsertAdress