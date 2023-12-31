import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, View, Text, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { RefreshControl } from 'react-native-gesture-handler';
import UsuariosListado from '../../components/UsuariosListado';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const ListadoUsuarios = ({navigation}) => {

  const [usuarios, setUsuarios] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = () => {
    var config = {
      method: 'get',
      url: `${BASE_URL}/usuarios_listado`,
    };

    axios(config)
    .then(function (response) {
      // if (response.length > 0) {
        setUsuarios(response.data);
      // }
    })
    .catch(function (error) {
    console.log(error);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);  
    setTimeout(() => {
      getUsuarios();
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
        <Text style={styles.titulo}>Listado de usuarios</Text>
        <Text style={styles.subtitulo}>En este espacio tiene completo acceso a la lista de usuarios registrados en el sistema</Text>
        <Text style={[styles.subtitulo, {marginTop: 8}]}>Puede actualizar información si así lo requiere...</Text>
        <View style={styles.lineaTexto}/>
      </View>
      {/* <View style={styles.tableContainer}> */}
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id_user}
          renderItem={({item, index}) => <UsuariosListado item={item} navigation={navigation}/>}
          style={{backgroundColor: 'rgb(237, 237, 237)'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      {/* </View> */}


        {/* <View>
          <Text>ListadoUsuarios</Text>
          <Pressable
            style={styles.btnEdicion}
            onPress={() => navigation.navigate('Edicion usuario', {id_user: 1})}
          >
            <Text style={styles.textoEdicion}>Editar</Text>
          </Pressable>
        </View> */}
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
    lineHeight: 23,
  },
  lineaTexto: {
    marginTop: 15,
    alignSelf: 'center',
    width: 50,
    height: 2,
    backgroundColor: '#7ED321'
  },
  // tableContainer: {
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   overflow: 'hidden',
  //   marginHorizontal: -5,
  //   marginBottom: 20,
  //   marginTop: 10,
  //   paddingVertical: 10,
  // },
    // container_vista: {
    //   // justifyContent: 'center',
    //   flex: 1,
    //   paddingTop: 20,
    //   paddingHorizontal: 30,
    // },
    // cont_1 : {
    //   flexGrow: 1,
    //   justifyContent: 'center',
    // },
    // cont_2 : {
    //   flexGrow: 2,
    //   justifyContent: 'flex-start',
    // },
    // contenedor_encabezado: {
    //   paddingHorizontal: 10,
    //   paddingVertical: 20,
    //   marginBottom: 40,
    // },
    // title: {
    //   fontFamily:'sans-serif',
    //   fontSize: 26,
    //   textAlign: 'center',
    //   fontWeight: '800',
    //   marginVertical: 18,
    // },
    // subtitle: {
    //   fontFamily:'sans-serif',
    //   fontSize: 15,
    //   textAlign: 'center',
    //   lineHeight: 23,
    // },
    // lineaTexto: {
    //   marginTop: 15,
    //   alignSelf: 'center',
    //   // paddingHorizontal: 50,
    //   width: 50,
    //   height: 2,
    //   backgroundColor: '#7ED321'
    // },
    // input: {
    //   height: 45,
    //   fontSize: 15,
    //   borderColor: '#e2e2e2',
    //   // borderStyle: 0,
    //   backgroundColor: '#e2e2e2',
    //   borderWidth: 1,
    //   borderRadius: 10,
    //   marginTop: 20,
    //   paddingHorizontal: 10,
    //   paddingLeft: 20,
    // },
    // error: {
    //   color: 'red',
    //   padding: 10,
    // },
    // separator: {
    //   height: 30,
    // },
    // btnLogin: {
    //   // marginVertical: 20,
    //   alignSelf: 'center',
    //   backgroundColor: '#7ED321',
    //   paddingVertical: 10,
    //   paddingHorizontal: 20,
    //   borderRadius: 10,
    //   marginBottom: 20,
    //   width: deviceWidth-130,
    // },
    // btnRecupContra: {
    //   // marginVertical: 20,
    //   backgroundColor: '#73c120',
    //   alignSelf: 'center',
    //   paddingVertical: 10,
    //   paddingHorizontal: 20,
    //   borderRadius: 10,
    //   width: deviceWidth-130,
    // },
    // btnText: {
    //   textAlign: 'center',
    //   color: '#fff',
    //   fontWeight: '800',
    //   fontSize: 16,
    // }
  // btnEdicion: {
  //   justifyContent: 'center',
  //   alignContent: 'center',
  //   backgroundColor: 'rgb(220, 161, 12)',
  //   height: 30,
  //   width: 60,
  //   borderRadius: 8,
  //   paddingBottom: 2,
  // },
  // textoEdicion: {
  //   textAlign: 'center',
  // }
});
  

export default ListadoUsuarios
