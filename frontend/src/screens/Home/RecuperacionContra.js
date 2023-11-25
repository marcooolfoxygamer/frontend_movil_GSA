import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Dimensions, SafeAreaView, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const RecuperacionContra = ({navigation}) => {

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const handleStep = () => {
    if (!emailError && !numberError) {
      setStep(2);
    }
  };

  const handleRecoveryPassword = () => {
    validateNewpassword();
    if (!newPasswordError) {

      Alert.alert('¡Hecho!', 'Se actualizó correctamente la contraseña', [    // Sustituir por respuesta de la bd
        {
          text: 'Ok',
          onPress: () => {
            setTimeout(() => {
              navigation.navigate('Inicio Sesion');
            }, 100)
          },
        }
      ])
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

  const validateNumber = () => {
    if (!number) {
      setNumberError('El número de identificación es obligatorio.');
    } else if (!/^\d+$/.test(number)) {
      setNumberError('Por favor, introduce solo números.');
    } else {
      setNumberError('');
    }
  };

  const validateNewpassword = () => {
    if (!newPassword) {
      setNewPasswordError('La nueva contraseña es obligatoria.');
    } else {
      setNewPasswordError('');
    }
  };

  const handleSubmit = () => {
    validateEmail();
    validateNumber();
  };

  const handleSubmit1 = () => {
    validateNewpassword();
  };


  return (
    <SafeAreaView style={{flex: 1}}>
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

      {/* Barra de navegación */}
      <View style={styles.container_vista}>
        {step === 1 && (
          <View>
            <View style={styles.contenedor_encabezado}>
              <Text style={styles.title}>Recuperar Contraseña</Text>
              <Text style={styles.subtitle}>Bienvenid@ a nuestro formulario de recuperación de contraseñas. Por favor, digite la información que le pedimos a continuación.</Text>
              <View style={styles.lineaTexto}/>
            </View>
            {/* <Text style={styles.title}>Recuperar Contraseña</Text>
            <View style={styles.separator} />
            <Text style={styles.subtitle}>Bienvenid@ a nuestro formulario de recuperación de contraseñas. Por favor, digite la información que le pedimos a continuación.</Text> */}
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              onBlur={validateEmail}
            />
            {emailError && <Text style={styles.error}>{emailError}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Número de identificación"
              keyboardType='number-pad'
              value={number}
              onChangeText={setNumber}
              onBlur={validateNumber}
            />
            {numberError && <Text style={styles.error}>{numberError}</Text>}
            <View style={styles.separator} />
            <Pressable
            style={styles.btnLogin}
            onPressIn={handleSubmit}
            onPressOut={handleStep}
            >
              <Text style={styles.btnText}>Recuperar Contraseña</Text>
            </Pressable>
          </View>
          
        )}

        {step === 2 && (
          <View>
            <View style={styles.contenedor_encabezado}>
              <Text style={styles.title}>Recuperar Contraseña</Text>
              <Text style={styles.subtitle}>Bienvenid@</Text>
              <Text style={styles.subtitle}>Por favor, digite la nueva contraseña con la que asegurará su cuenta.</Text>
              <View style={styles.lineaTexto}/>
            </View>
            {/* <Text style={styles.title}>Recuperar Contraseña</Text>
            <View style={styles.separator} />
            <Text style={styles.subtitle}>Bienvenid@</Text>
            <Text style={styles.subtitle}>Por favor, digite la nueva contraseña con la que asegurará su cuenta.</Text> */}
            <TextInput
              style={styles.input}
              placeholder="Nueva contraseña"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            {newPasswordError && <Text style={styles.error}>{newPasswordError}</Text>}
            <View style={styles.separator} />
            <Pressable
            style={styles.btnLogin}
            onPressIn={handleSubmit1}
            onPressOut={handleRecoveryPassword}>
            <Text style={styles.btnText}>Recuperar Contraseña</Text>
          </Pressable>
          </View>
        )}
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contenedor_encabezado: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 40,
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   paddingHorizontal: 20,
  // },
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
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   marginBottom: 10,
  // },
  // subtitle: {
  //   fontSize: 16,
  //   textAlign: 'center',
  //   marginBottom: 20,
  // },
  input: {
    height: 45,
    fontSize: 15,
    borderColor: '#e2e2e2',
    // borderStyle: 0,
    backgroundColor: '#e2e2e2',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingLeft: 20,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
  separator: {
    height: 30,
  },
  // input: {
  //   height: 40,
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   marginBottom: 10,
  //   paddingHorizontal: 10,
  // },
  // error: {
  //   color: 'red',
  //   marginBottom: 10,
  // },
  // separator: {
  //   height: 20,
  // },
  btnLogin: {
    // marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: '#7ED321',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 17,
    width: deviceWidth-130,
  },
  btnRecupContra: {
    // marginVertical: 20,
    backgroundColor: '#73c120',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: deviceWidth-130,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  }
});

export default RecuperacionContra