import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListadoAnuncios from '../screens/Administrador/ListadoAnuncios';
import AgregarAnuncios from '../screens/Administrador/AgregarAnuncios';
import EdicionAnuncio from '../screens/Administrador/EdicionAnuncio';



const Stack = createNativeStackNavigator();

const AnunciosStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Listado de anuncios"
          component={ListadoAnuncios}
        />
        <Stack.Screen
          name="Agregar anuncio"
          component={AgregarAnuncios}
        />
        <Stack.Screen
          name="Edicion anuncio"
          component={EdicionAnuncio}
        />
    </Stack.Navigator>
  )
}

export default AnunciosStack