import { StyleSheet, TextInput } from "react-native"



const DefaultInput = ({
    onChangeText,
    value,
    placeholder,
    width,
    height,
    margin,
    secureTextEntry,
    keyboardType,
    autoFocus
})=>{

    return(
        <TextInput
            style={[styles.input, {
                width: width || '95%',
                height: height || 45,
                margin: margin || 5
            }]}
            autoFocus={autoFocus}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            placeholderTextColor='rgba(255, 255, 255, 0.4)'/> 
    )

}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor:'goldenrod',
        borderRadius: 10,
        paddingHorizontal: 20,
        fontSize: 18,
        color: 'whitesmoke'
    }
})

export default DefaultInput