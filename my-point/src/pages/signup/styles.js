import { StyleSheet } from "react-native-web"




const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 20
    },
    subTitle: {
        color: 'whitesmoke',
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 30,
        marginBottom: 40,
        marginTop: 20
    },
    eye: {
        position: 'relative',
        left: '34%',
        bottom: '10.5%'
    },
    eye2: {
        position: 'relative',
        left: '34%',
        bottom: '10.5%'
    },
    btnContainer: {
        width: '100%',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20
    }
})


export default styles