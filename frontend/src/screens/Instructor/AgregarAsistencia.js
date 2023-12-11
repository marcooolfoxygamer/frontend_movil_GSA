import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView, View, Text, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const AgregarAsistencia = ({navigation}) => {

  const {idUser} = useContext(AuthContext);

  // Campos a llenar
  let [idInstrucAsis, setIdInstrucAsis] = useState('');
  let [idAprendAsis, setIdAprendAsis] = useState('');
  let [fechaAsis, setFechaAsis] = useState('');
  let [estadoAsis, setEstadoAsis] = useState('');

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Errores
  const [idInstrucAsisError, setIdInstrucAsisError] = useState('');
  const [idAprendAsisError, setIdAprendAsisError] = useState('');
  const [fechaAsisError, setFechaAsisError] = useState('');

  // Cambios del picker para la fecha
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const onChangePicker = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS == 'android') {
        toggleDatePicker();
        setFechaAsis(format(currentDate, "yyyy-MM-dd", {wareOfUnicodeTokens: true}))
        // setFechaAsis(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  }

  // Validaciones
  const validateIdInstrucAsis = () => {
    if (!idInstrucAsis) {
      setIdInstrucAsisError('Por favor indique su número de documento');
    } else if (!/^\d+$/.test(idInstrucAsis)) {
      setIdInstrucAsisError('La identificación del instructor debe contener solo números.');
    } else if (idUser != idInstrucAsis) {
      setIdInstrucAsisError('La identificación digitada es incorrecta. Por favor, revise que sea su identificación');
    } else {
      setIdInstrucAsisError('');
    }
  };

  const validateIdAprendAsis = () => {
    if (!idAprendAsis) {
      setIdAprendAsisError('Por favor, digite el número de documento del aprendiz.');
    } else if (!/^\d+$/.test(idAprendAsis)) {
      setIdAprendAsisError('La identificación del aprendiz debe contener solo números.');
    } else {

      var config = {
        method: 'post',
        url: `${BASE_URL}/asistencia_listado_aprend`,
        data: {
          fk_id_aprend_asis: idAprendAsis
        }
      };

      axios(config)
      .then(function (response) {
        if (response.data == 'Si existe') {
            setIdAprendAsisError('');
        }
        else {
          setIdAprendAsisError('La identificación digitada no existe en el sistema. Por favor, revise que la haya escrito correctamente');
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }
  };

  const validateFechaAsis = () => {
    if (!fechaAsis) {
      setFechaAsisError('La fecha es obligatoria.');
      // let fecha_act = new Date();
      // let fecha = format(fecha_act, "yyyy-MM-dd", {wareOfUnicodeTokens: true})
      // setFechaAsis(fecha);
      // setDate(fecha);
    } else {
      setFechaAsisError('');
    }
  };

  const handleSubmit = () => {
    validateIdInstrucAsis();
    validateIdAprendAsis();
    validateFechaAsis();
  };


  const handleAccessList = () => {
    if (!idInstrucAsisError && !idAprendAsisError && !fechaAsisError) {
      agregar(idInstrucAsis, idAprendAsis, fechaAsis, estadoAsis);
    }
  };

  const agregar = (id_instruc_asis, fk_id_aprend_asis, fecha_asis) => {
    
    axios.post(`${BASE_URL}/asistencia_agregar`, {
      id_instruc_asis, fk_id_aprend_asis, fecha_asis
    })
    .then(response => {
      let resp = response.data;
      if (resp == 'Se agregó correctamente el registro') {
        Alert.alert('¡Hecho!', 'Se ha creado correctamente el registro de asistencia', [
          {
            text: 'Ok',
            onPress: () => {
              setTimeout(() => {
                navigation.navigate("Listado asistencias")
              }, 100)
            },
          }
        ])
      } else {
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

  useEffect(() => {
    let fecha_act = new Date();
    let fecha = format(fecha_act, "yyyy-MM-dd", {wareOfUnicodeTokens: true})
    setFechaAsis(fecha);
    setDate(new Date(fecha));
  }, []);


  return (
    <SafeAreaView style={{flex: 1}}>
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
        <View style={[styles.container_vista]}>
          <View style={styles.contenedor_encabezado}>
            <Text style={styles.title}>Toma de asistencia</Text>
            <Text style={styles.subtitle}>En este espacio, podrá tomar la asistencia al gimnasio por parte de los aprendices.</Text>
            <View style={styles.lineaTexto}/>
          </View>

          {/* <ScrollView> */}
            <View style={styles.cont_1}>
              <View style={styles.campo}>
                <TextInput
                    style={[styles.input, styles.textInp]}
                    placeholder='Identificación del Instructor'
                    placeholderTextColor={'#666'}
                    keyboardType='number-pad'
                    value={idInstrucAsis.toString()}
                    onChangeText={setIdInstrucAsis}
                    onBlur={validateIdInstrucAsis}
                    maxLength={15}
                />
                { idInstrucAsisError ? <View style={styles.error}>
                    <Text style={styles.errorText}>{idInstrucAsisError}</Text>
                </View> : null }
              </View>
              <View style={styles.campo}>
                <TextInput
                    style={[styles.input, styles.textInp]}
                    placeholder='Identificación del Aprendiz'
                    placeholderTextColor={'#666'}
                    keyboardType='number-pad'
                    value={idAprendAsis.toString()}
                    onChangeText={setIdAprendAsis}
                    onBlur={validateIdAprendAsis}
                    maxLength={15}
                />
                { idAprendAsisError ? <View style={styles.error}>
                    <Text style={styles.errorText}>{idAprendAsisError}</Text>
                </View> : null }
              </View>
              <View style={styles.campo}>
                { showPicker && (
                  <DateTimePicker
                    mode='date'
                    display='spinner'
                    value={date}
                    onChange={onChangePicker}
                  />
                )}
                {/* { !showPicker && ( */}
                  < Pressable
                    onPress={toggleDatePicker}
                  >
                    <TextInput
                      style={[styles.input, styles.textInp]}
                      placeholder='Fecha'
                      placeholderTextColor={'#b2b2b2'}
                      value={fechaAsis}
                      onChangeText={setFechaAsis}
                      onBlur={validateFechaAsis}
                      editable={false}
                      // icon={Ionicons}
                    />
                  </Pressable>
                {/* )} */}

                { fechaAsisError ? <View style={styles.error}>
                    <Text style={styles.errorText}>{fechaAsisError}</Text>
                </View> : null }
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.cont_2}>
              <Pressable
                style={styles.btnGuardar}
                onPressIn={handleSubmit}
                onPressOut={handleAccessList}
              >
                <Text style={styles.TextGuardar}>Guardar</Text>
              </Pressable>
            </View>
          {/* </ScrollView> */}
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
      flex: 1,
      backgroundColor: '#ffffffee',
      // paddingTop: 20,s
      paddingHorizontal: 20,
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
      // marginBottom: 40,
      marginBottom: 10,
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
      marginBottom: 5,
    },
    lineaTexto: {
      marginTop: 15,
      alignSelf: 'center',
      // paddingHorizontal: 50,
      width: 50,
      height: 2,
      backgroundColor: '#7ED321'
    },
    separator: {
      height: 30,
    },
    campo: {
      // marginTop: 10,
      height: 'auto',
      // marginBottom: 20,
      marginHorizontal: 8,
      marginBottom: 20,
      // backgroundColor: 'red'
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
    textInp: {
      color: '#5a5a5a',
    },
    dropdown: {
      height: 50,
      borderColor: '#e2e2e2',
      borderWidth: 0,
      borderRadius: 10,
      backgroundColor: '#e2e2e2',
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
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
    condicion1Input: {
      height: 100,
      // marginBottom: 80,
    },
  
    btnGuardar: {
      // marginVertical: 20,
      backgroundColor: '#7ED321',
      alignSelf: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      // marginTop: 45,
      width: deviceWidth-130,
    },
    
    TextGuardar: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: '800',
      fontSize: 16,
    },
    error: {
      paddingTop: 10,
      marginLeft: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 15,
    }
});
  

export default AgregarAsistencia
