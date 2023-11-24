import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ImageBackground, Image, Dimensions, StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import InicioAnunciosListado from '../../components/InicioAnunciosListado';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const AnunciosScreen = ({navigation}) => {

    const [anuncios, setAnuncios] = useState([]);

    useEffect(() => {
        getAnuncios();
    }, []);

    const getAnuncios = () => {
        var config = {
            method: 'get',
            url: 'http://10.0.2.2:9300/anuncios_listado',
            // headers: {
            //   "Content-Type" : 'application/json',
            // }
          };
      
          axios(config)
          .then(function (response) {
            setAnuncios(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <SafeAreaView style={{flex:1}}>
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
            <View style={styles.contenedor_encabezado}>
                <Text style={styles.titulo}>Anuncios</Text>
                <Text style={styles.subtitulo}>En la parte inferior encontrará anuncios importantes que el gimnasio tiene para usted</Text>
                <View style={styles.lineaTexto}/>
            </View>            
            <View style={styles.contenedor_anuncios}>
                <FlatList
                    data={anuncios}
                    keyExtractor={(item) => item.id_anunc}
                    renderItem={ ({ item }) => <InicioAnunciosListado item = {item}/>}
                    // ItemSeparatorComponent={ () => <Image source={require('../../assets/images/anuncios/cinco.jpg')} style={styles.anuncios_img}/>}
                    // ItemSeparatorComponent={ () => <Image source={require(`../../assets/images/anuncios/${item.img_anunc}`)} style={styles.anuncios_img}/>}
                    ItemSeparatorComponent={ () => <View />}
                />
                {/* <View style={styles.contenedor_anuncios_img}>
                    <Image
                        source={require('../../assets/images/anuncios/cinco.jpg')} // Cambiar ruta cuando vengan de la bd
                        style={styles.anuncios_img}
                    />
                </View>
                <View style={styles.contenedor_anuncios_texto}>
                    <Text style={styles.anuncios_titulo}>Recuerda...</Text>
                    <Text style={styles.anuncios_descripcion}>Estamos disponibles de 6am a 8pm (sugeto a cambios).</Text>
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
    contenedor_encabezado: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    titulo: {
        fontFamily:'sans-serif',
        fontSize: 26,
        textAlign: 'center',
        fontWeight: '800',
        marginVertical: 18,
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
        width: 50,
        height: 2,
        backgroundColor: '#7ED321'
    },
    contenedor_anuncios: {
        flex: 1,
        alignContent: 'center',
        // width: deviceWidth-90,
        // height: deviceHeight-130,
    },
    contenedor_anuncios_img: {
        backgroundColor: 'blue',
        alignContent: 'center',
        width: 50,
        height: 50,

    },
    anuncios_img: {
        width: 50,
        height: 50,
    },
});

export default AnunciosScreen