import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioSesionScreen from '../screens/Home/InicioSesionScreen';
import RecuperacionContra from '../screens/Home/RecuperacionContra';


const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Inicio Sesion"
          component={InicioSesionScreen}
        />
        <Stack.Screen
          name="Recuperacion Contraseña"
          component={RecuperacionContra}
        />
    </Stack.Navigator>
  )
}

export default LoginStack