import React from 'react'
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import BienvenidaAdministrador from '../screens/Administrador/BienvenidaAdministrador';

import AnunciosStack from './AnunciosStack';
import UsuariosStack from './UsuariosStack';

const Drawer = createDrawerNavigator();

const AdministradorStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown:false,
        drawerActiveBackgroundColor: '#7ED321',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#64a81b',
        drawerLabelStyle: {
          marginLeft: -18,
          fontFamily:'sans-serif',
          fontSize: 17,
          marginVertical: 10,
          padding: 10,
        }}}
    >
      <Drawer.Screen name="Inicio" component={BienvenidaAdministrador} options={{
        drawerIcon: ({color}) => (
          <Ionicons name='home-outline' size={22} color={color}  style={{paddingLeft: 9}}/>
        )
      }}/>
      {/* <Drawer.Screen name="Anuncios" component={AnunciosScreen} options={{
        drawerIcon: ({color}) => (
          <Ionicons name='megaphone-outline' size={22} color={color} style={{paddingLeft: 9}}/>
        )
      }}/> */}
      <Drawer.Screen name="Listado anuncios" component={AnunciosStack} options={{
        drawerIcon: ({color}) => (
          <Ionicons name='megaphone-outline' size={22} color={color} style={{paddingLeft: 9}}/>
        )
      }}/>
      <Drawer.Screen name="Listado usuarios" component={UsuariosStack} options={{
        drawerIcon: ({color}) => (
          <Feather name='users' size={22} color={color} style={{paddingLeft: 9}}/>
        )
      }}/>
      {/* <Drawer.Screen name="Cerrar Sesión" options={{
        drawerIcon: ({color}) => (
          <MaterialCommunityIcons name='login' size={22} color={color} style={{paddingLeft: 12}}/>
        )
      }}
      /> */}
    </Drawer.Navigator>
  )
}

export default AdministradorStack