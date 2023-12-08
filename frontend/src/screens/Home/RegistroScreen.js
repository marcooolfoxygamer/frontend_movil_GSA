import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, View, TextInput, ScrollView, Pressable, TouchableOpacity, ImageBackground, Dimensions, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '../../config';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const RegistroScreen = ({navigation}) => {

  // Campos a llenar
  const [primerNombre, setPNombre] = useState('');
  const [segundoNombre, setSNombre] = useState('');
  const [primerApellido, setPApellido] = useState('');
  const [segundoApellido, setSApellido] = useState('');
  const [email, setEmail] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [clave, setClave] = useState('');
  const [condicion1, setCondicion1] = useState('');

  // Antecedentes
  const [antecedenteData, setAntecedenteData] = useState([]);
  const [condicion, setCondicion] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // Errores
  const [primerNombreError, setPrimerNombreError] = useState('');
  const [primerApellidoError, setPrimerApellidoError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [identificacionError, setIdentificacionError] = useState('');
  const [claveError, setClaveError] = useState('');
  const [condicionError, setCondicionError] = useState('');
  
  // Validaciones
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

  const validateIdentificacion = () => {
    if (!identificacion) {
      setIdentificacionError('El número de identificación es obligatorio.');
    } else if (!/^\d+$/.test(identificacion)) {
      setIdentificacionError('Por favor, introduce solo números.');
    } else {
      setIdentificacionError('');
    }
  };

  const validateClave = () => {
    if (!clave) {
      setClaveError('La contraseña es obligatoria.');
    } else {
      setClaveError('');
    }
  };

  const validateCondicion = () => {
    if (!condicion) {
      setCondicionError('La condición médica es obligatoria.');
    } else {
      setCondicionError('');
    }
  };

  // En submit
  const handleSubmit = () => {
    validatePNombre();
    validatePApellido();
    validateEmail(),
    validateIdentificacion();
    validateClave();
    validateCondicion();
  };

  const handleRegistro = () => {
    if (!primerNombreError && !primerApellidoError && !emailError && !identificacionError && !claveError && !condicionError) {
      // Aqui se puede agregar la logica para el registro
      // Alert.alert('¡Hecho!', 'Se ha registrado correctamente', [
      //   {
      //     text: 'Ok',
      //     onPress: () => {
      //       setTimeout(() => {
      //         navigation.navigate('Inicio sesion');
      //       }, 100)
      //     },
      //   }
      // ])
      registrar(identificacion, primerNombre, segundoNombre, primerApellido, segundoApellido, email, clave, condicion, condicion1);
      
    }
    // alert('Por favor verifique la información digitada y vuelva a intentarlo')
  };

  const registrar = (id_user, nom1_user, nom2_user, ape1_user, ape2_user, correo_sena_user, contrasena, fk_anteced_salud_sel, anteced_salud_inp) => {
    
    axios.post(`${BASE_URL}/validar_correo`, {
      id_user, correo_sena_user
    })
    .then(response => {
      let resp_validacion_correo_id = response.data;

      if (resp_validacion_correo_id == 'Disponible') {
        var config = {
          method: 'post',
          url: `${BASE_URL}/registrarse`,
          data: {
            id_user, nom1_user, nom2_user, ape1_user, ape2_user, correo_sena_user, contrasena, fk_anteced_salud_sel, anteced_salud_inp
          }
        };
        axios(config)
        .then((response) => {
          let resp = response.data;
          if (resp == 'Se agregó correctamente el usuario') {
            Alert.alert('¡Hecho!', 'Se ha registrado correctamente', [
              {
                text: 'Ok',
                onPress: () => {
                  setTimeout(() => {
                    navigation.navigate('Inicio sesion');
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
      else {
        Alert.alert('Ups!', resp_validacion_correo_id, [
          {
            text: 'Ok'
          }
        ])
      }
    })
    .catch((error) => {
      console.log(error);
    })
    
    
      
    // axios.post(`${BASE_URL}/registrarse`, {
    //   id_user, nom1_user, nom2_user, ape1_user, ape2_user, correo_sena_user, contrasena, fk_anteced_salud_sel, anteced_salud_inp
    // })
    // .then(response => {
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   console.log("error");
    //   console.log(error);
    // })
  }


  // Selector

  useEffect(() => {
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
    <SafeAreaView style={{flex: 1}}>
      {/* Barra de navegación */}
      {/* <View style={styles.container}>
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
      </View> */}

      {/* Vista */}
      <View style={styles.container_vista}>
        <View style={styles.contenedor_encabezado}>
          <Text style={styles.title}>Registrarse</Text>
          <Text style={styles.subtitle}>Regístrese para obtener todas las funcionalidades que este sistema puede ofrecerle</Text>
          <View style={styles.lineaTexto}/>
        </View>
        <ScrollView style={{marginBottom: 190}} showsHorizontalScrollIndicator={false}>
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
            <TextInput
                style={styles.input}
                placeholder='Número de identificación'
                placeholderTextColor={'#666'}
                keyboardType='number-pad'
                value={identificacion}
                onChangeText={setIdentificacion}
                onBlur={validateIdentificacion}
                maxLength={10}/>
            { identificacionError ? <View style={styles.error}>
                <Text style={styles.errorText}>{identificacionError}</Text>
            </View> : null }
          </View>
          <View style={styles.campo}>
            <TextInput
                style={styles.input}
                placeholder='Contraseña'
                placeholderTextColor={'#666'}
                secureTextEntry={true} // oculta la contraseña
                value={clave}
                onChangeText={setClave}
                onBlur={validateClave}
                />
            { claveError ? <View style={styles.error}>
                <Text style={styles.errorText}>{claveError}</Text>
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
              onBlur={() => {setIsFocus(false)}}
            />
            { condicionError ? <View style={styles.error}>
                <Text style={styles.errorText}>{condicionError}</Text>
            </View> : null }
          </View>
          <View style={[styles.campo, {height: 120}]}>
            <TextInput
                style={[styles.input, styles.condicion1Input]}
                placeholder='¿Su condición médica no aparece? Descríbalas aquí'
                placeholderTextColor={'#666'}
                value={condicion1}
                onChangeText={setCondicion1}
                />
          </View>
          
          <Pressable
            style={styles.btnRegistro}
            onPressIn={handleSubmit}
            onPressOut={handleRegistro}
          >
            <Text style={styles.btnRegistrarse}>Registrarse</Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   backgroundColor: '#dddddd9c',
  //   paddingTop: 40,
  //   padding: 20,
  // },
  container_vista: {
    // flex: 1,
    // alignContent: 'center',
    // justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  contenedor_encabezado: {
    paddingHorizontal: 10,
    paddingVertical: 20,
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
    marginBottom: 80,
  },

  btnRegistro: {
    // marginVertical: 20,
    backgroundColor: '#7ED321',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 40,
    width: deviceWidth-130,
  },
  
  btnRegistrarse: {
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


export default RegistroScreen