import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, View, Text, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsistenciasListado from '../../components/AsistenciasListado';
import { BASE_URL } from '../../config';
import { RefreshControl } from 'react-native-gesture-handler';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const ListadoAsistencias = ({navigation}) => {

  const [asistencias, setAsistencias] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    getAsistencias();

    // setRefreshin = false;
  }, []);

  const getAsistencias = () => {
    var config = {
      method: 'get',
      url: `${BASE_URL}/asistencia_listado`,
    };

    axios(config)
    .then(function (response) {
      // if (response.length > 0) {
        setAsistencias(response.data);
      // }
    })
    .catch(function (error) {
    console.log(error);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);  
    setTimeout(() => {
      getAsistencias();
      setRefreshing(false);
    }, 200);
  }, []);


  // const eliminarAsistencia = (id_registro_asis) => {
  //   Alert.alert(
  //       'Confirmación de decisión', 'Está segur@ de que desea eliminar el registro de asistencia?', [
  //           { text: 'Si', onPress: () => {
  //               console.log("en eliminación")
  //           }},
  //           { text: 'No', onPress: () => {
  //               console.log("No eliminó");
  //           }},
  //       ]
  //   )
  // }



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
          <Text style={styles.titulo}>Listado de asistencia</Text>
          <Text style={styles.subtitulo}>En este espacio tiene completo acceso a la lista de aprendices que han desarrollado actividades en el gimnasio</Text>
          <Text style={styles.subtitulo}>Puede actualizar información si así lo requiere...</Text>
          <View style={styles.lineaTexto}/>
        </View>            
        {/* <View style={styles.contenedor_asistencia}> */}
          {/* <View style={styles.tabla}>
            <Text style={styles.row}>Id. Instructor</Text>
            <Text style={styles.row}>Id. Aprendiz</Text>
            <Text style={styles.row}>P.Nombre Aprendiz</Text>
            <Text style={styles.row}>P.Apellido Aprendiz</Text>
            <Text style={styles.row}>S.Apellido Aprendiz</Text>
            <Text style={styles.row}>Correo Aprendiz</Text>
            <Text style={styles.row}>Antecedente #1</Text>
            <Text style={styles.row}>Antecedente #2</Text>
            <Text style={styles.row}>Fecha asistencia</Text>
            <Text style={styles.row}>Acciones</Text>
          </View> */}
          {/* <View style={styles.separador} /> */}
          {/* { asistencias ?  */}
            <FlatList
              data={asistencias}
              keyExtractor={(item) => item.id_registro_asis}
              renderItem={({item}) => <AsistenciasListado item = {item} navigation={navigation} getAsistencias={getAsistencias}/>}
              style={{backgroundColor: 'rgb(237, 237, 237)'}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              // style={{width: deviceWidth+40}}
              // showsHorizontalScrollIndicator={true}
              // numColumns={2}
            //   renderItem={ ({ item }) => 
            //   <View style={styles.tabla}>
            //     <Text style={styles.row}>{item.id_instruc_asis}</Text>
            //     <Text style={styles.row}>{item.fk_id_aprend_asis}</Text>
            //     <Text style={styles.row}>{item.nom1_user}</Text>
            //     <Text style={styles.row}>{item.ape1_user}</Text>
            //     <Text style={styles.row}>{item.ape2_user}</Text>
            //     <Text style={styles.row}>{item.correo_sena_user}</Text>
            //     <Text style={styles.row}>{item.fk_anteced_salud_sel}</Text>
            //     <Text style={styles.row}>{item.anteced_salud_inp}</Text>
            //     <Text style={styles.row}>{item.fecha_asis}</Text>
            //     <Pressable
            //         style={styles.btnEdicion}
            //         onPress={() => navigation.navigate('Edicion asistencia', {id_registro_asis: item.id_registro_asis})}
            //     >
            //         <Text style={styles.textoEdicion}>Editar</Text>
            //     </Pressable>
            //   </View>
            // }

            // style={{width: deviceWidth+5, height: deviceHeight+5}}
            // showsHorizontalScrollIndicator= {false}
              // ItemSeparatorComponent={ () => <Image source={require('../../assets/images/anuncios/cinco.jpg')} style={styles.anuncios_img}/>}
              // ItemSeparatorComponent={ () => <Image source={require(`../../assets/images/anuncios/${item.img_anunc}`)} style={styles.anuncios_img}/>}
              // ItemSeparatorComponent={ () => <View />}
          />
          {/* : <Text>No hay registros</Text>
          } */}
          
          
        {/* </View> */}
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
  // separador: {
  //   paddingTop: 10,
  //   borderTopWidth: 30,
  //   borderTopColor: '#dfdfdf',
  // },
  // contenedor_asistencia: {
  //   flexGrow:1,
  //   // alignContent: 'center',
  //   // width: deviceWidth-90,
  //   // height: deviceHeight-130,
  // },
  // tabla: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   borderBottomWidth: 0.5,
  // },
  // row: {
  //     flex: 1,
  //     fontSize: 12,
  //     paddingHorizontal: 2,
  //     paddingVertical: 10,
  // },
  // btnEdicion: {
  //   justifyContent: 'center',
  //   alignContent: 'center',
  //   backgroundColor: 'rgb(220, 161, 12)',
  //   height: 30,
  //   width: 60,
  //   borderRadius: 8,
  //   paddingBottom: 2,
  // },
  //     textoEdicion: {
  //     textAlign: 'center',
  // }

  
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
});
  

export default ListadoAsistencias
