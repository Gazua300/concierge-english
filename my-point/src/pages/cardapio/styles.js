import { StyleSheet } from "react-native-web"



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    card: {
        borderWidth: 2,
        borderColor: '#ae8625',
        margin: 15,
        padding: 15,
        borderRadius: 10
    },
    produto: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txtStyle: {
        fontSize: 23,
        color: 'whitesmoke'
    }
})

export default styles