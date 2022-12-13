import { StyleSheet } from "react-native"



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    perfilContainer: {
        margin: 20
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        color: 'whitesmoke',
        textAlign: 'center'
    },
    txtStyle: {
        fontSize: 20,
        color: 'whitesmoke',
    },
    localContainer: {
        color: 'whitesmoke',
        fontSize: 20,
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    editContainer: {
        direction: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '92%'
    },
    button: {
        backgroundColor: '#ae8625',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
    }
})

export default styles

