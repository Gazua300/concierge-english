import { StyleSheet } from "react-native-web"



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 30
    },
    txtContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 30
    },
    txtStyle: {
        fontSize: 25,
        color: 'whitesmoke',               
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    inputQnt: {
        width: '50%',
        borderBottomWidth: 2,
        borderColor: '#ae8625',
        borderRadius: 10,
        padding: 15,
        fontSize: 20,
        color: 'whitesmoke',
        textAlign: 'center'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 30,
    },
    btnTotalDaConta: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 80
    }
})


export default styles