import { StyleSheet } from "react-native-web"



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    scrollView: {
        flex: 1,
      },
    card: {
        borderWidth: 2,
        borderColor: '#ad8625',
        borderRadius: 10,
        margin: 15,
        padding: 10
    },
    title: {
        fontSize: 25,
        color: 'whitesmoke',
        textAlign: 'center',
        marginBottom: 20
    },
    txtStyle: {
        fontSize: 18,
        color: 'whitesmoke',
        lineHeight: 25,
        marginBottom: 20
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#ae8625',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center'
    },
    txtTemp: {
        fontSize: 20,
        color: 'whitesmoke',
        margin: 20,
        textAlign: 'center'
    }
})


export default styles