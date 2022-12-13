import { useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { ImageBackground } from 'react-native'


const SplashAnimated = ({navigation})=>{


    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Login')
        }, 3500)
    }, [])


    return(
        <ImageBackground style={{flex:1, backgroundColor:'#CC9900'}}
            source={require('../../../assets/splash.png')} >
            <LottieView
                autoPlay
                speed={0.4}
                source={require('../../../assets/splash.json')}
            />
        </ImageBackground>
    )
}


export default SplashAnimated