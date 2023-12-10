import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, View, Text, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AnunciosAdminListado from '../../components/AnunciosAdminListado';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { RefreshControl } from 'react-native-gesture-handler';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const ListadoAnuncios = ({navigation}) => {

  const [anuncios, setAnuncios] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAnuncios();
  }, []);

  const getAnuncios = () => {
    var config = {
      method: 'get',
      url: `${BASE_URL}/anuncios_listado`,
    };

    axios(config)
    .then(function (response) {
        setAnuncios(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);  
    setTimeout(() => {
      getAnuncios();
      setRefreshing(false);
    }, 200);
  }, []);


  return (
    <SafeAreaView style={{flex:1}}>
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
        <View style={styles.contenedor_encabezado}>
          <Text style={styles.titulo}>Listado de anuncios</Text>
          <Text style={styles.subtitulo}>En este espacio tiene completo acceso a la lista de anuncios que se muestran en el sistema</Text>
          <Text style={[styles.subtitulo, {marginTop: 8}]}>Puede agregar o actualizar anuncios si así lo requiere...</Text>
          <View style={styles.lineaTexto}/>
        </View>
        <Pressable
          style={styles.btnAgregar}
          onPress={() => navigation.navigate('Agregar anuncio')}
        >
          <Text style={styles.btnText}>Agregar anuncio</Text>
        </Pressable>
        <FlatList
          data={anuncios}
          keyExtractor={(item) => item.id_anunc}
          renderItem={({item}) => <AnunciosAdminListado item = {item} navigation={navigation} getAnuncios={getAnuncios}/>}
          style={{backgroundColor: 'rgb(237, 237, 237)'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
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
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  lineaTexto: {
    marginTop: 15,
    alignSelf: 'center',
    width: 50,
    height: 1,
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
    height: 20,
  },
  btnAgregar: {
    alignSelf: 'center',
    backgroundColor: '#7ED321',
    // backgroundColor: '#bdd0a9',
    paddingTop: 7,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    // borderBottomWidth: 1,
    // borderColor: '#acd085',
    marginBottom: 17,
    width: deviceWidth-280,
  },
  btnText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 12,
  }
});
  

export default ListadoAnuncios
