import React from 'react'
import { SafeAreaView, View, Text, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const EdicionAsistencia = ({navigation}) => {
  return (
    <SafeAreaView>
        {/* Barra de navegación */}
        <View style={styles.container}>
          <TouchableOpacity onPress={()=>{
            // navigation.dispatch(DrawerActions.openDrawer())
            navigation.openDrawer();
            }
          }>
          <Icon
              name="menu"
              size={40}
          />
          </TouchableOpacity>
          <ImageBackground
          source={require('../../assets/images/LogoGsA.png')}
          style={{width:37, height:40}}
          />
        </View>

        {/* Vista */}
        <View>
        <Text>EdicionAsistencia</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#dddddd9c',
      paddingTop: 40,
      padding: 20,
    },
    container_vista: {
      // justifyContent: 'center',
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 30,
    },
    cont_1 : {
      flexGrow: 1,
      justifyContent: 'center',
    },
    cont_2 : {
      flexGrow: 2,
      justifyContent: 'flex-start',
    },
    contenedor_encabezado: {
      paddingHorizontal: 10,
      paddingVertical: 20,
      marginBottom: 40,
    },
    title: {
      fontFamily:'sans-serif',
      fontSize: 26,
      textAlign: 'center',
      fontWeight: '800',
      marginVertical: 18,
    },
    subtitle: {
      fontFamily:'sans-serif',
      fontSize: 15,
      textAlign: 'center',
      lineHeight: 23,
    },
    lineaTexto: {
      marginTop: 15,
      alignSelf: 'center',
      // paddingHorizontal: 50,
      width: 50,
      height: 2,
      backgroundColor: '#7ED321'
    },
    input: {
      height: 45,
      fontSize: 15,
      borderColor: '#e2e2e2',
      // borderStyle: 0,
      backgroundColor: '#e2e2e2',
      borderWidth: 1,
      borderRadius: 10,
      marginTop: 20,
      paddingHorizontal: 10,
      paddingLeft: 20,
    },
    error: {
      color: 'red',
      padding: 10,
    },
    separator: {
      height: 30,
    },
    btnLogin: {
      // marginVertical: 20,
      alignSelf: 'center',
      backgroundColor: '#7ED321',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 20,
      width: deviceWidth-130,
    },
    btnRecupContra: {
      // marginVertical: 20,
      backgroundColor: '#73c120',
      alignSelf: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      width: deviceWidth-130,
    },
    btnText: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: '800',
      fontSize: 16,
    }
});
  

export default EdicionAsistencia
