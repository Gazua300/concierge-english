import { StyleSheet } from "react-native"



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#ae8625',
        borderRadius:10,
        margin: 15,
        padding: 10,
    },
    txtStyle: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'whitesmoke',
        marginBottom: 20
    },
    product: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txtTemp: {
        marginTop: 100,
        marginHorizontal: 50,
        textAlign: 'center',
        fontSize: 20,
        color: 'whitesmoke'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})


export default styles