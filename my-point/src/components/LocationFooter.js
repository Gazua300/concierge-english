import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'


const LocationFooter = ({changeMapType}) => {
  
  
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <View>
          <Text style={styles.textStyle}>Padrão</Text>
          <TouchableOpacity onPress={()=> changeMapType('standard')}>
            <Image style={styles.img}
              source={require('../../assets/map_standard.png')}/>
          </TouchableOpacity>
        </View>        
        
        <View>
          <Text style={styles.textStyle}>Terra</Text>
          <TouchableOpacity onPress={()=> changeMapType('terrain')}>
            <Image style={styles.img}
              source={require('../../assets/map_terrain.png')}/>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.textStyle}>Satelite</Text>
          <TouchableOpacity onPress={()=> changeMapType('satellite')}>
            <Image style={styles.img}
              source={require('../../assets/map_satellite.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    imgContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    textStyle: {
      textAlign: 'center',
      marginBottom: 10
    },
    img: {
      width: 75,
      height: 75
    }
})


export default LocationFooter