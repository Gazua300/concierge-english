import { StyleSheet } from "react-native-web"



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    title: {
        fontSize: 30,
        color: 'whitesmoke',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30
    },
    txtStyle: {
        fontSize: 20,
        lineHeight: 30,
        color: 'whitesmoke',
    },
    placeTxtStyle: {
        fontSize: 20,
        color: 'whitesmoke'
    },
    placeContainer: {
        margin: 20,
    },
    calculation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 2,
        borderColor: '#ad8625',
        borderRadius: 10,
        margin: 15,
        padding: 15
    },
    produto: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})


export default styles