import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, ImageBackground, Image, Dimensions, StyleSheet, TextInput, ScrollView, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '../../config';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

let estadosUsuarioData = [
  { label: 'Activo', value: 1 },
  { label: 'Inactivo', value: 0 },
];

const EdicionUsuario = ({navigation, route}) => {
  
  let id_user = route.params?.id_user

  // Campos a llenar
  let [primerNombre, setPNombre] = useState('');
  let [segundoNombre, setSNombre] = useState('');
  let [primerApellido, setPApellido] = useState('');
  let [segundoApellido, setSApellido] = useState('');
  let [email, setEmail] = useState('');
  let [condicion1, setCondicion1] = useState('');
  let [estadoUsuario, setEstadoUsuario] = useState(null);

  // Tipos de usuarios
  let [TiposUsuariosData, setTiposUsuariosData] = useState([]);
  let [tipoUsuario, setTipoUsuario] = useState(null);
  let [isFocus, setIsFocus] = useState(false);

  // Antecedentes
  let [antecedenteData, setAntecedenteData] = useState([]);
  let [condicion, setCondicion] = useState(null);
  // const [isFocus, setIsFocus] = useState(false);

  // Errores
  const [tipoUsuarioError, setTipoUsuarioError] = useState('');
  const [primerNombreError, setPrimerNombreError] = useState('');
  const [primerApellidoError, setPrimerApellidoError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [condicionError, setCondicionError] = useState('');
  const [estadoUsuarioError, setEstadoUsuarioError] = useState('');


  // Validaciones
  const validateTipoUsuario = () => {
    if (!tipoUsuario) {
      setTipoUsuarioError('Indicar el tipo de usuario es obligatorio.');
    } else {
      setTipoUsuarioError('');
    }
  };

  const validatePNombre = () => {
    if (!primerNombre) {
      setPrimerNombreError('El primer nombre es obligatorio.');
    } else {
      setPrimerNombreError('');
    }
  };

  const validatePApellido = () => {
    if (!primerApellido) {
      setPrimerApellidoError('El primer apellido es obligatorio.');
    } else {
      setPrimerApellidoError('');
    }
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('El correo electrónico es obligatorio.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('La dirección de correo electrónico es inválida.');
    } else {
      setEmailError('');
    }
  };

  const validateCondicion = () => {
    if (!condicion) {
      setCondicionError('La condición médica es obligatoria.');
    } else {
      setCondicionError('');
    }
  };

  const validateEstadoUsuario = () => {
    if (!estadoUsuario) {
      setEstadoUsuarioError('Indicar el estado del usuario dentro del sistema es obligatorio.');
    } else {
      setEstadoUsuarioError('');
    }
  };

  // En submit
  const handleSubmit = () => {
    validateTipoUsuario();
    validatePNombre();
    validatePApellido();
    validateEmail(),
    validateCondicion();
    validateEstadoUsuario();
  };

  const handleEdicion = () => {
    if (!tipoUsuarioError && !primerNombreError && !primerApellidoError && !emailError && !condicionError && !estadoUsuarioError) {

      editar(tipoUsuario, primerNombre, segundoNombre, primerApellido, segundoApellido, email, condicion, condicion1, estadoUsuario);
    }
    // alert('Por favor verifique la información digitada y vuelva a intentarlo')
  };

  const editar = (fk_tipo_user, nom1_user, nom2_user, ape1_user, ape2_user, correo_sena_user, fk_anteced_salud_sel, anteced_salud_inp, estado_user) => {
    
    axios.put(`${BASE_URL}/usuarios_edicion/${id_user}`, {
      fk_tipo_user, nom1_user, nom2_user, ape1_user, ape2_user, correo_sena_user, fk_anteced_salud_sel, anteced_salud_inp, estado_user
    })
    .then(response => {
      let resp = response.data;
      if (resp == 'Se actualizó correctamente el usuario') {
        Alert.alert('¡Hecho!', 'Se ha actualizado correctamente el usuario', [
          {
            text: 'Ok',
            onPress: () => {
              setTimeout(() => {
                navigation.navigate('Listado de usuarios');
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

    // Obtencion datos del usuario pasado por parámetro

    var config = {
      method: 'get',
      url: `${BASE_URL}/usuarios_listado/${id_user}`,
      // headers: {
      //   "Content-Type" : 'application/json',
      // }
    };

    axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));

      let campo_resp = response.data[0];
      setTipoUsuario(campo_resp.fk_tipo_user);
      setPNombre(campo_resp.nom1_user);
      setSNombre(campo_resp.nom2_user);
      setPApellido(campo_resp.ape1_user);
      setSApellido(campo_resp.ape2_user);
      setEmail(campo_resp.correo_sena_user);
      setCondicion(campo_resp.fk_anteced_salud_sel);
      setCondicion1(campo_resp.anteced_salud_inp);
      setEstadoUsuario(campo_resp.estado_user);
    })
    .catch(function (error) {
      console.log(error);
    });



    // Llamado a los tipos de usuarios

    var config = {
      method: 'get',
      url: `${BASE_URL}/tipos_usuarios`,
      // headers: {
      //   "Content-Type" : 'application/json',
      // }
    };

    axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      var count = Object.keys(response.data).length;
      let rolesArray = [];
      for (var i = 0; i < count; i++ ) {
        rolesArray.push({
          value: response.data[i].cod_tipo_user,
          label: response.data[i].tipo_user
        });
      }
      setTiposUsuariosData(rolesArray);
    })
    .catch(function (error) {
      console.log(error);
    });



    // Llamado a los antecedentes

    var config = {
      method: 'get',
      url: `${BASE_URL}/antecedentes`,
      // headers: {
      //   "Content-Type" : 'application/json',
      // }
    };

    axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      var count = Object.keys(response.data).length;
      let antecedentesArray = [];
      for (var i = 0; i < count; i++ ) {
        antecedentesArray.push({
          value: response.data[i].antecedente,
          label: response.data[i].antecedente
        });
      }
      setAntecedenteData(antecedentesArray);
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
        <View style={[styles.container_vista, {flex:1}]}>
          <View style={styles.contenedor_encabezado}>
            <Text style={styles.title}>Edición</Text>
            <Text style={styles.subtitle}>Edita los datos del usuario</Text>
            <View style={styles.lineaTexto}/>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.campo}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={TiposUsuariosData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Tipo de usuario' : 'Tipo de usuario'}
                searchPlaceholder="Buscar..."
                value={tipoUsuario}
                onFocus={() => setIsFocus(true)}
                onChange={item => {
                  setTipoUsuario(item.value);
                  setIsFocus(false);
                }}
                onBlur={() => {setIsFocus(false), validateTipoUsuario()}}
              />
              { tipoUsuarioError ? <View style={styles.error}>
                  <Text style={styles.errorText}>{tipoUsuarioError}</Text>
              </View> : null }
            </View>
            <View style={styles.campo}>
              <TextInput
                  style={styles.input}
                  placeholder='Primer nombre'
                  placeholderTextColor={'#666'}
                  value={primerNombre}
                  onChangeText={setPNombre}
                  onBlur={validatePNombre}
              />
              { primerNombreError ? <View style={styles.error}>
                  <Text style={styles.errorText}>{primerNombreError}</Text>
              </View> : null }
            </View>
            <View style={styles.campo}>
              <TextInput
                  style={styles.input}
                  placeholder='Segundo nombre (no obligatorio)'
                  placeholderTextColor={'#666'}
                  value={segundoNombre}
                  onChangeText={setSNombre}/>
            </View>
            <View style={styles.campo}>
              <TextInput
                  style={styles.input}
                  placeholder='Primer apellido'
                  placeholderTextColor={'#666'}
                  value={primerApellido}
                  onChangeText={setPApellido}
                  onBlur={validatePApellido}
              />
              { primerApellidoError ? <View style={styles.error}>
                  <Text style={styles.errorText}>{primerApellidoError}</Text>
              </View> : null }
            </View>
            <View style={styles.campo}>
              <TextInput
                  style={styles.input}
                  placeholder='Segundo apellido (no obligatorio)'
                  placeholderTextColor={'#666'}
                  value={segundoApellido}
                  onChangeText={setSApellido}/>
            </View>
            <View style={styles.campo}>
              <TextInput
                  style={styles.input}
                  placeholder='Correo electrónico brindado por el SENA'
                  placeholderTextColor={'#666'}
                  keyboardType='email-address'
                  value={email}
                  onChangeText={setEmail}
                  onBlur={validateEmail}/>
              { emailError ? <View style={styles.error}>
                  <Text style={styles.errorText}>{emailError}</Text>
              </View> : null }
            </View>
            <View style={styles.campo}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={antecedenteData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? '¿Tiene alguna condición médica?' : '¿Tiene alguna condición médica?'}
                searchPlaceholder="Buscar..."
                value={condicion}
                onFocus={() => setIsFocus(true)}
                onChange={item => {
                  setCondicion(item.value);
                  setIsFocus(false);
                }}
                onBlur={() => {setIsFocus(false), validateCondicion()}}
              />
              { condicionError ? <View style={styles.error}>
                  <Text style={styles.errorText}>{condicionError}</Text>
              </View> : null }
            </View>
            <View style={styles.campo}>
              <TextInput
                  style={[styles.input, styles.condicion1Input]}
                  placeholder='¿Su condición médica no aparece? Descríbalas aquí'
                  placeholderTextColor={'#666'}
                  value={condicion1}
                  onChangeText={setCondicion1}
                  />
            </View>
            <View style={[styles.campo, {marginBottom: 45}]}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={estadosUsuarioData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Estado del usuario' : 'Estado del usuario'}
                searchPlaceholder="Buscar..."
                value={estadoUsuario}
                onFocus={() => setIsFocus(true)}
                onChange={item => {
                  setEstadoUsuario(item.value);
                  setIsFocus(false);
                }}
                onBlur={() => {setIsFocus(false), validateEstadoUsuario()}}
              />
              { estadoUsuarioError ? <View style={styles.error}>
                  <Text style={styles.errorText}>{estadoUsuarioError}</Text>
              </View> : null }
            </View>
            
            <Pressable
              style={styles.btnActualizar}
              onPressIn={handleSubmit}
              onPressOut={handleEdicion}
            >
              <Text style={styles.TextActualizar}>Actualizar información</Text>
            </Pressable>
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
    container_vista: {
      backgroundColor: '#ffffffee',
      // paddingTop: 20,s
      paddingHorizontal: 20,
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
  
    btnActualizar: {
      // marginVertical: 20,
      backgroundColor: '#7ED321',
      alignSelf: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 45,
      width: deviceWidth-130,
    },
    
    TextActualizar: {
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
  

export default EdicionUsuario
