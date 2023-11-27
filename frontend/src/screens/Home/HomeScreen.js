import React, {useContext} from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {

  return (
    <SafeAreaView style={styles.container}>

      {/* Barra de navegación */}
      {/* <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
          <Icon
            name="menu"
            size={40}
          />
        </TouchableOpacity>
        <ImageBackground
          source={require('../../assets/images/LogoGsA.png')}
          style={{width:37, height:40}}
        />
      </View> */}

      {/* Vista */}
      <View style={styles.cont_1}>
        <Image
          source={require('../../assets/images/Isologo_GsA-removebg-preview.png')}
          style={styles.img}
        />
        <Text style={styles.subt}>Su gimnasio Sena al alcance de sus manos</Text>
      </View>
      <View style={styles.espaciado}/>
      <View style={styles.cont_2}>
        <Pressable
          style={styles.btnRegistro}
          onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.btnText}>Registrarse</Text>
        </Pressable>
        <Pressable
          style={styles.btnLogin}
          onPress={() => navigation.navigate('Inicio sesion')}>
          <Text style={styles.btnText}>Iniciar Sesión</Text>
        </Pressable>
      </View>

   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor: '#dddddd9c',
    // paddingTop: 40,
    // padding: 20,
  },
  cont_1 : {
    flexGrow: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
  },
  cont_2 : {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  img: {
    alignSelf: 'center',
    // marginTop: deviceHeight/6,
    // marginTop: 20,
    width: 210,
    height: 250,
    resizeMode: 'stretch'
  },
  subt: {
    fontWeight: '900',
    marginTop: 25,
    marginBottom: 40,
    // margin: 20,
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 34,
    paddingHorizontal: 35,
  },
  espaciado: {
    height: 20,
  },
  btnRegistro: {
    // marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: '#7ED321',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 17,
    width: deviceWidth-150,
  },
  btnLogin: {
    // marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: '#7ED321',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 17,
    width: deviceWidth-150,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  }
});

export default HomeScreen