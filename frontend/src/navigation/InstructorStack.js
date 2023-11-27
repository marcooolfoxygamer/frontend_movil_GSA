import React from 'react'
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import HomeScreen from '../screens/Home/HomeScreen';
import AnunciosScreen from '../screens/Home/AnunciosScreen';
// import RecomendacionesScreen from '../screens/Home/RecomendacionesScreen';
// import RegistroScreen from '../screens/Home/RegistroScreen';
// import InicioSesionScreen from '../screens/Home/InicioSesionScreen';
// import LoginStack from './LoginStack';
import CustomDrawer from '../components/CustomDrawer';
// import RecuperacionContra from '../screens/Home/RecuperacionContra';
// import BienvenidaAprendiz from '../screens/Aprendiz/BienvenidaAprendiz';
// import PlanificadorScreen from '../screens/Aprendiz/PlanificadorScreen';
import BienvenidaInstructor from '../screens/Instructor/BienvenidaInstructor';
import AgregarAsistencia from '../screens/Instructor/AgregarAsistencia';
import AsistenciasStack from './AsistenciasStack'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();

const InstructorStack = () => {
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
      <Drawer.Screen name="Inicio" component={BienvenidaInstructor} options={{
        drawerIcon: ({color}) => (
          <Ionicons name='home-outline' size={22} color={color}  style={{paddingLeft: 9}}/>
        )
      }}/>
      <Drawer.Screen name="Anuncios" component={AnunciosScreen} options={{
        drawerIcon: ({color}) => (
          <Ionicons name='megaphone-outline' size={22} color={color} style={{paddingLeft: 9}}/>
        )
      }}/>
      <Drawer.Screen name="Agregar asistencia" component={AgregarAsistencia} options={{
        drawerIcon: ({color}) => (
          <Ionicons name='document-text-sharp' size={22} color={color} style={{paddingLeft: 9}}/>
        )
      }}/>
      <Drawer.Screen name="Listado asistencias" component={AsistenciasStack} options={{
        drawerIcon: ({color}) => (
          <FontAwesome name='archive' size={22} color={color} style={{paddingLeft: 9}}/>
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

export default InstructorStack