import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListadoAsistencias from '../screens/Instructor/ListadoAsistencias';
import EdicionAsistencia from '../screens/Instructor/EdicionAsistencia';



const Stack = createNativeStackNavigator();

const AsistenciasStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Listado de asistencias"
          component={ListadoAsistencias}
        />
        <Stack.Screen
          name="Edicion asistencia"
          component={EdicionAsistencia}
        />
    </Stack.Navigator>
  )
}

export default AsistenciasStack