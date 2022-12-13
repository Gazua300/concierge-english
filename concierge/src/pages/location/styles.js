import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 50
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        textAlign: 'center',
        width: '40%',
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor:'goldenrod',
        margin: 20,
        color: 'whitesmoke'
    },
    eye: {
        position: 'absolute',
        left: '80%',
        top: '47%'
    },
    txtStyle:{
        marginHorizontal: 20,
        marginBottom: 30,
        fontSize: 20,
        color: 'whitesmoke',
        textAlign: 'center'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
})


export default styles