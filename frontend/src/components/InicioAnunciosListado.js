import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

// const ruta_img = '../assets/images/anuncios/';

const InicioAnunciosListado = ({ item }) => {

    const { id_anunc, fk_id_admin_anunc, titulo_anunc, desc_anunc, img_anunc, estado_anunc } = item

    let BASE_URL = 'http://10.0.2.2:9300/images/';
    // console.log('url', BASE_URL+img_anunc);


    // let imagen = require(`../assets/images/anuncios/${img_anunc}`);

    return (
        <View style={{marginVertical: 30}}>
            <View style={styles.contenedor_anuncios_img}>
                <Image
                    // source={{uri: imagen}} // Cambiar ruta cuando vengan de la bd
                    // source={require(`../assets/images/anuncios/${img_anunc}`)} // Cambiar ruta cuando vengan de la bd
                    source={{uri: BASE_URL+img_anunc}} // Cambiar ruta cuando vengan de la bd
                    style={styles.anuncios_img}
                />
            </View>
            <View style={styles.contenedor_anuncios_texto}>
                <Text style={styles.anuncios_titulo}>{titulo_anunc}</Text>
                <Text style={styles.anuncios_descripcion}>{desc_anunc}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // contenedor_anuncios: {
    //     alignItems: 'center',
    //     width: deviceWidth-90,
    //     height: deviceHeight-930,
    // },
    contenedor_anuncios_img: {
        alignSelf: 'center',
        width: 250,
        height: 250,
    },
    anuncios_img: {
        maxWidth: 250,
        maxHeight: 250,
    },
    contenedor_anuncios_texto: {
        fontFamily:'sans-serif',
        marginTop: 30,
        marginHorizontal: 10
    },
    anuncios_titulo: {
        fontSize: 22,
        color: '#7ED321',
        marginBottom: 10,
    },
    anuncios_descripcion: {
        fontSize: 14,
        lineHeight: 20,
        paddingHorizontal: 5,
    },
});

export default InicioAnunciosListado