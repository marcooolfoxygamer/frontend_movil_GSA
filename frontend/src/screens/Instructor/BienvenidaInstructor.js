import React from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const BienvenidaInstructor = ({navigation}) => {
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
        <View style={styles.contenedor_vista}>
            <View style={styles.contenedor_encabezado}>
              <Text style={styles.titulo}>¡Bienvenid@ a su cuenta instructor!</Text>
              {/* <Text style={styles.subtitulo}>En la parte inferior encontrará anuncios importantes que el gimnasio tiene para usted</Text> */}
              <View style={styles.lineaTexto}/>
            </View>
            <View style={styles.contenido}>
              <Image
                source={require('../../assets/images/Instructor.jpg')}
                style={styles.imagen}
              />
              <Text style={styles.subtitulo}>Mis actividades</Text>
              <Text style={styles.text}>
                En el menú encontrará las actividades a realizar.
              </Text>
              {/* <Text style={styles.text2}>
                Acceder al planificador
              </Text> */}
            </View>
            {/* <View style={styles.recomendacion_cont_item}>
              <View style={styles.recomendacion_cont_imagen}>
                <Image
                  source={require('../../assets/images/salud_comida.png')}
                  style={[styles.recomendacion_img, { width: 75, height: 75}]}
                />
              </View>
              <View style={styles.recomendacion_texto}>
                  <Text style={styles.recomendacion_titulo}>Cuide su alimentación</Text>
                  <Text style={styles.recomendacion_descripcion}>De nada le servirá entrenar intensamente durante largas horas si
                    no mantiene una alimentación adecuada que le brinde lo necesario
                    para mantenerse activ@ en su día a día y que le mantenga fuerte
                    para seguir con su entrenamiento
                  </Text>
              </View>
            </View> */}
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
  contenedor_vista: {
    backgroundColor: '#ffffffee',
    height: '90%'
  },
  contenedor_encabezado: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    // marginBottom: 30,
  },
  titulo: {
    fontFamily:'sans-serif',
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '800',
    marginTop: 18,
    marginBottom: 5,
    // paddingVertical: 20,
  },
  lineaTexto: {
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'center',
    // paddingHorizontal: 50,
    width: 50,
    height: 2,
    backgroundColor: '#7ED321'
  },
  contenido: {
    alignItems: 'center'
  },
  imagen: {
    width: 250,
    height: 200,
    marginBottom: 35
  },
  subtitulo: {
    fontFamily:'sans-serif',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    // lineHeight: 23,
    marginBottom: 17,
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 15,
    textAlign: 'center',
    lineHeight: 25,
    // marginBottom: 60
  },
  // text2: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   textDecorationLine: 'underline',
  //   marginBottom: 50
  // },
  // recomendacion_cont_item: {
  //   marginVertical: 20,
  // },
  // recomendacion_cont_imagen: {
  //   alignSelf: 'center',
  // },
  // recomendacion_img: {
  //   width: 80,
  //   height: 80,
  // },
  // recomendacion_texto: {
  //   fontFamily:'sans-serif',
  //   paddingHorizontal: 10,
  //   marginVertical: 20,
  //   alignItems: 'center',
  // },
  // recomendacion_titulo: {
  //   fontWeight: '900',
  //   fontSize: 20,
  //   marginBottom: 20,
  // },
  // recomendacion_descripcion: {
  //   textAlign: 'center',
  //   fontSize: 14,
  //   lineHeight: 20
  // }
});

export default BienvenidaInstructor