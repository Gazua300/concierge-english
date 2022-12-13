import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 20
    },    
    eye: {
        position: 'relative',
        left: '82%',
        bottom: '13%'
    },
    eye2: {
        position: 'relative',
        left: '83%',
        bottom: '13%'
    },
    btnContainer: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})


export default styles
