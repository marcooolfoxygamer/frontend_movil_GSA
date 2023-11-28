import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, ImageBackground, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../conext/AuthContext';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const InicioSesionScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const {login} = useContext(AuthContext);


  const handleLogin = () => {
    if (!emailError && !passwordError) {
      // Aqui se puede agregar la logica para el inicio de sesion

      // alert('Haz iniciado sesion');

      login(email, password);
      // console.log(respLogin);
      // console.log(respLogin);
      // if (respLogin === 'Se encontró') {
      //   console.log('entró');
      // } else {
      //   console.log(respLogin);
      //   alert(respLogin);
      // }
      
    }
    // alert('Por favor verifique la información digitada y vuelva a intentarlo')
  };

  const handleForgotPassword = () => {
    // alert('Recuperar contraseña');
    navigation.navigate('Recuperacion Contraseña');
    // this.props.navigation.navigate("RecuperacionContra")
    // Aqui se puede agregar la logica para recuperar la contraseña
  };

  //Validaciones

  const validateEmail = () => {
    if (!email) {
      setEmailError('El correo electrónico es obligatorio.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('La dirección de correo electrónico es inválida.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('La contraseña es obligatoria.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = () => {
    validateEmail();
    validatePassword();
  };

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
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>Inicie sesión en su cuenta dentro del sistema.</Text>
          <View style={styles.lineaTexto}/>
        </View>
        <View style={styles.cont_1}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            onBlur={validateEmail}
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onBlur={validatePassword}
          />
          {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
        </View>
        <View style={styles.separator} />
        <View style={styles.cont_2}>
          <Pressable
            style={styles.btnLogin}
            onPressIn={handleSubmit}
            onPressOut={handleLogin}>
            <Text style={styles.btnText}>Iniciar Sesión</Text>
          </Pressable>
          <Pressable style={styles.btnRecupContra}
            onPress={handleForgotPassword}>
            <Text style={styles.btnText}>¿Olvidó su contraseña?</Text>
          </Pressable>
        </View>
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
    // justifyContent: 'center',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
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
    marginBottom: 40,
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
    height: 30,
  },
  btnLogin: {
    // marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: '#7ED321',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
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


export default InicioSesionScreen