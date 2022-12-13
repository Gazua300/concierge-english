import { StyleSheet } from "react-native-web"




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    tituloContainer: {
        flexDirection:'column',
        alignItems:'center',
        marginHorizontal:'10%',
        justifyContent:'space-between'
    },
    titulo: {
        fontSize: 30,
        color: 'whitesmoke',
        textAlign: 'center',
        margin: 15,
    },
    mesasTitulo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20
    },
    mesasQntStyle: {
        margin: 20
    },
    descricao: {
        color: 'whitesmoke',
        fontSize: 18,
        lineHeight: 25,
        marginBottom: 30
    },
    gradeDeMesas: {
        marginHorizontal: 20,
        marginVertical: 10
    } 
})

export default styles