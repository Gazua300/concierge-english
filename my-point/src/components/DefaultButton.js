import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'


const DefaultButton = ({
    handlePress,
    buttonText,
    width,
    height,
    padding,
    borderRadius,
    margin,
    fontSize
})=>{
    return(
        <TouchableOpacity onPress={handlePress}
            style={[styles.button, { 
                width: width || '40%',
                height: height,
                padding: padding || 5,
                borderRadius: borderRadius || 20,
                margin: margin || 5,
            }]}>
            <Text style={{fontSize: fontSize | 16, color:'whitesmoke'}}>{buttonText}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ae8625',
        borderColor: 'goldenrod',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default DefaultButton