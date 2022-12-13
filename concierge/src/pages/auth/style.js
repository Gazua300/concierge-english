import { StyleSheet } from "react-native"



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 50
    },
    txtStyle: {
        color: 'whitesmoke',
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 15,
        marginBottom: 40
    },
    input: {
        borderWidth: 1,
        borderColor:'goldenrod',
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        margin: 20,
        height: 50,
        color: 'whitesmoke'
    },
    eye: {
        position: 'relative',
        left: '83.5%',
        bottom: '17%',
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30
    },
    button: {
        backgroundColor: '#ae8625',
        width: '30%',
        height: 40,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'goldenrod'
    }
})

export default styles