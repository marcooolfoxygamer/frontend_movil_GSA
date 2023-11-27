import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListadoUsuarios from '../screens/Administrador/ListadoUsuarios';
import EdicionUsuario from '../screens/Administrador/EdicionUsuario';
// import InicioSesionScreen from '../screens/Home/InicioSesionScreen';
// import RecuperacionContra from '../screens/Home/RecuperacionContra';


const Stack = createNativeStackNavigator();

const UsuariosStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Listado de usuarios"
          component={ListadoUsuarios}
        />
        <Stack.Screen
          name="Edicion usuario"
          component={EdicionUsuario}
        />
    </Stack.Navigator>
  )
}

export default UsuariosStack