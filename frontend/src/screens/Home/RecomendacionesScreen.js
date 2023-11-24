import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, ImageBackground, Image, Dimensions, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const RecomendacionesScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      {/* Barra de navegación */}
      <View style={styles.container}>
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
      </View>

      {/* Vista */}
      <View style={styles.contenedor_recomendaciones}>
        <ScrollView>
          <View style={styles.contenedor_encabezado}>
            <Text style={styles.titulo}>Anuncios</Text>
            <Text style={styles.subtitulo}>En la parte inferior encontrará anuncios importantes que el gimnasio tiene para usted</Text>
            <View style={styles.lineaTexto}/>
          </View>
          <View style={styles.recomendacion_cont_item}>
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
          </View>
          <View style={styles.recomendacion_cont_item}>
            <View style={styles.recomendacion_cont_imagen}>
              <Image
                source={require('../../assets/images/scale.png')}
                style={[styles.recomendacion_img, { width: 70, height: 70}]}
              />
            </View>
            <View style={styles.recomendacion_texto}>
                <Text style={styles.recomendacion_titulo}>Vaya lento, pero seguro</Text>
                <Text style={styles.recomendacion_descripcion}>Recuerde que su cuerpo no es invencible, necesita tiempo para
								acoplarse a la nueva rutina que le propone. Así que sea comprensiv@ 
								y respetuos@ con su cuerpo, y fortalézcalo progresivamente, paso
								por paso, y así verá cómo su cuerpo responde correctamente a lo que
								le propone y, cuando menos lo espere, alcanzará y hasta superarás las
								metas que tenía fijadas al tomar la decisión de mejorar su estado físico
                </Text>
            </View>
          </View>
          <View style={styles.recomendacion_cont_item}>
            <View style={styles.recomendacion_cont_imagen}>
              <Image
                source={require('../../assets/images/mental.png')}
                style={[styles.recomendacion_img, {height: 85}]}
              />
            </View>
            <View style={styles.recomendacion_texto}>
                <Text style={styles.recomendacion_titulo}>Cuide su autoestima</Text>
                <Text style={styles.recomendacion_descripcion}>Analice constantemente porqué está entrenando, debe primar ante todo
								la sinceridad consigo mism@, está bien replantearse y a veces hacer
								lo necesario por salud, el resto es secundario y debe estar delimitado
								por lo que quiera, no por que se lo impongan
                </Text>
            </View>
          </View>
          <View style={styles.recomendacion_cont_item}>
            <View style={styles.recomendacion_cont_imagen}>
              <Image
                source={require('../../assets/images/water.png')}
                style={[styles.recomendacion_img, {width: 80, height: 100}]}
              />
            </View>
            <View style={[styles.recomendacion_texto, {marginBottom: 240}]}>
                <Text style={styles.recomendacion_titulo}>Hidrátese</Text>
                <Text style={styles.recomendacion_descripcion}>Si, eso mismo, aunque es algo que siempre se sugiere, muy poco se lleva
								a la práctica; y es un elemento fundamental para que su cuerpo pueda
								asimilar todo lo que está desarrollando, y lo enfrente de la mejor
								manera posible, sin que hallan riesgos de que se genere alguna afectación 
								a su salud. Asi que ¡A beber agua!
                </Text>
            </View>
          </View>
        </ScrollView>
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
  contenedor_recomendaciones: {
    backgroundColor: '#ffffffee'
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
    marginVertical: 18,
    // paddingVertical: 20,
  },
  subtitulo: {
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
  recomendacion_cont_item: {
    marginVertical: 20,
  },
  recomendacion_cont_imagen: {
    alignSelf: 'center',
  },
  recomendacion_img: {
    width: 80,
    height: 80,
  },
  recomendacion_texto: {
    fontFamily:'sans-serif',
    paddingHorizontal: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  recomendacion_titulo: {
    fontWeight: '900',
    fontSize: 20,
    marginBottom: 20,
  },
  recomendacion_descripcion: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20
  }
});

export default RecomendacionesScreen