import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, Text, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, Pressable, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import EjerciciosPorMusculoListado from '../../components/EjerciciosPorMusculoListado';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const PlanificadorScreen = ({navigation}) => {

  // Obtención de la identificación del aprendiz
  const {idUser} = useContext(AuthContext);

  // Músculos
  const [musculosData, setMusculosData] = useState([]);
  const [musculo, setMusculo] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [musculoSeleccionado, setMusculoSeleccionado] = useState('')

  // Ejercicios
  const [mostrarEjercicios, setMostrarEjercicios] = useState(false);
  const [ejercicios, setEjercicios] = useState([])

  // Errores
  const [musculoError, setMusculoError] = useState('');


  const validateMusculo = () => {
    if (!musculo) {
      setMusculoError('Seleccione el músculo.');
    } else {
      setMusculoError('');
    }
  };

  const corroborarDatos = () => {
    validateMusculo();
  };


  const ejecutarBusquedaMusculo = () => {
    if (!musculoError) {
      buscarMusculo(idUser,musculo);
    }
  };

  const buscarMusculo = (id_aprend, musculo) => {
    
    axios.post(`${BASE_URL}/planificador`, {
      id_aprend, musculo
    })
    .then(response => {
      let resp = response.data;
      if (resp == 'Se agregó correctamente') {
        
        var config = {
          method: 'get',
          url: `${BASE_URL}/ejercicios_musculo/${musculo}`
        };
        axios(config)
        .then((response2) => {
          let resp_ejerc = response2.data;
          if (resp_ejerc == 'No hay registros') {
            setEjercicios(resp_ejerc);
            Alert.alert('Ups!', resp, [
              {
                text: 'Ok'
              }
            ])
          } else {
            setMostrarEjercicios(true);
            setMusculoSeleccionado(musculo);
            setEjercicios(resp_ejerc);
          }
        })
        .catch((error) => {
          console.log(error);
        })
      }
      else {
        Alert.alert('Ups!', resp, [
          {
            text: 'Ok'
          }
        ])
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // Muestra de ejercicios
  const muestraEjerciciosVista = () => {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.titulo_musculo}>Ejercicios para entrenar {musculoSeleccionado}</Text>
        <FlatList
          data={ejercicios}
          keyExtractor={(item) => [item.pkfk_musculo, item.pkfk_ejercicio]}
          renderItem={({item}) => <EjerciciosPorMusculoListado navigation={navigation} item = {item}/>}
          style={{backgroundColor: 'rgb(240, 240, 240)'}}
        />
      </View>
    )
  }


  // Selector

  useEffect(() => {
    var config = {
      method: 'get',
      url: `${BASE_URL}/musculos`,
    };

    axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      var count = Object.keys(response.data).length;
      let musculosArray = [];
      for (var i = 0; i < count; i++ ) {
        musculosArray.push({
          value: response.data[i].musculo,
          label: response.data[i].musculo
        });
      }
      setMusculosData(musculosArray);
    })
    .catch(function (error) {
      console.log(error);
    });
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
          <Text style={styles.titulo}>Planificador de ejercicios</Text>
          <Text style={styles.subtitulo}>Seleccione el músculo que quiera trabajar, ejecute la búsqueda y obtendrá los ejercicios recomendados para entrenar dicho músculo</Text>
          {/* <Text style={[styles.subtitulo, {marginTop: 8}]}>Puede actualizar información si así lo requiere...</Text> */}
          <View style={styles.lineaTexto}/>
        </View>
        <View style={styles.campo}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={musculosData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Seleccione el músculo a entrenar' : 'Seleccione el músculo a entrenar'}
            searchPlaceholder="Buscar..."
            value={musculo}
            onFocus={() => {setIsFocus(true)}}
            onChange={item => {
              setMusculo(item.value);
              setIsFocus(false);
            }}
            // confirmSelectItem={true}
            // onConfirmSelectItem={item => {setMusculo(item.value)}}

            // onChange={item => {
            //   setMusculo( item.value, function() {setMusculo(item.value)});
            //   setIsFocus(false);
            // }}
            
            // onBlur={() => {setIsFocus(false), validateMusculo()}}
            onBlur={() => {setIsFocus(false)}}
          />
          { musculoError ? <View style={styles.error}>
              <Text style={styles.errorText}>{musculoError}</Text>
          </View> : null }
        </View>
        <Pressable
          style={styles.btnBuscar}
          onPressIn={corroborarDatos}
          onPressOut={ejecutarBusquedaMusculo}
        >
          <Text style={styles.textBtnBuscar}>Buscar</Text>
        </Pressable>
        { mostrarEjercicios ? muestraEjerciciosVista() : <Text>{ejercicios}</Text>}
        {/* <FlatList
          data={asistencias}
          keyExtractor={(item) => item.id_registro_asis}
          renderItem={({item}) => <AsistenciasListado item = {item} navigation={navigation} getAsistencias={getAsistencias}/>}
          style={{backgroundColor: 'rgb(237, 237, 237)'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        /> */}

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
  campo: {
    height: 'auto',
    marginHorizontal: 40,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#e2e2e2',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#e2e2e2',
    fontSize: 13,
    padding:15,
    borderRadius: 10,
  },
  dropdown: {
    height: 40,
    borderColor: '#e2e2e2',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#e2e2e2',
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 13,
  },
  placeholderStyle: {
    fontSize: 13,
    paddingLeft:8,
    color: 'rgb(115, 115, 115)',
  },
  selectedTextStyle: {
    fontSize: 13,
    paddingLeft:8,
    color: 'rgb(115, 115, 115)',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 13,
    // paddingLeft:15,
  },
  btnBuscar: {
    backgroundColor: '#7ED321',
    alignSelf: 'center',
    paddingVertical: 5,
    // paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 40,
    width: deviceWidth-290,
    height: 30
  },
  textBtnBuscar: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },
  error: {
    paddingTop: 10,
    marginLeft: 10,
  },
  errorText: {
      color: 'red',
      fontSize: 15,
  },
  titulo_musculo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
});
  

export default PlanificadorScreen
