import React from 'react'
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import RegistroScreen from '../screens/Home/RegistroScreen';
import InicioSesionScreen from '../screens/Home/InicioSesionScreen';
import RecuperacionContra from '../screens/Home/RecuperacionContra';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// // import Icon from 'react-native-vector-icons/Ionicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import HomeScreen from '../screens/Home/HomeScreen';
// import AnunciosScreen from '../screens/Home/AnunciosScreen';
// import RecomendacionesScreen from '../screens/Home/RecomendacionesScreen';
// import RegistroScreen from '../screens/Home/RegistroScreen';
// // import InicioSesionScreen from '../screens/Home/InicioSesionScreen';
// import LoginStack from './LoginStack';
// import CustomDrawer from '../components/CustomDrawer';
// import RecuperacionContra from '../screens/Home/RecuperacionContra';


const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Registro"
          component={RegistroScreen}
        />
        <Stack.Screen
          name="Inicio sesion"
          component={InicioSesionScreen}
        />
        <Stack.Screen
          name="Recuperacion Contraseña"
          component={RecuperacionContra}
        />
    </Stack.Navigator>
    // <Stack.Navigator
    //   drawerContent={props => <CustomDrawer {...props} />}
    //   screenOptions={{
    //     headerShown:false,
    //     drawerActiveBackgroundColor: '#7ED321',
    //     drawerActiveTintColor: '#fff',
    //     drawerInactiveTintColor: '#64a81b',
    //     drawerLabelStyle: {
    //       marginLeft: -18,
    //       fontFamily:'sans-serif',
    //       fontSize: 17,
    //       marginVertical: 10,
    //       padding: 10,
    //     }}}
    // >
    //   <Drawer.Screen name="Inicio" component={HomeScreen} options={{
    //     drawerIcon: ({color}) => (
    //       <Ionicons name='home-outline' size={22} color={color}  style={{paddingLeft: 12}}/>
    //     )
    //   }}/>
    //   <Drawer.Screen name="Anuncios" component={AnunciosScreen} options={{
    //     drawerIcon: ({color}) => (
    //       <Ionicons name='megaphone-outline' size={22} color={color} style={{paddingLeft: 12}}/>
    //     )
    //   }}/>
    //   <Drawer.Screen name="Recomendaciones" component={RecomendacionesScreen} options={{
    //     drawerIcon: ({color}) => (
    //       <Octicons name='code-of-conduct' size={22} color={color} style={{paddingLeft: 12}}/>
    //     )
    //   }}/>
    //   <Drawer.Screen name="Registrarse" component={RegistroScreen} options={{
    //     drawerIcon: ({color}) => (
    //       <Ionicons name='person-add-outline' size={22} color={color} style={{paddingLeft: 12}}/>
    //     )
    //   }}/>
    //   <Drawer.Screen name="Iniciar Sesión" component={LoginStack} options={{
    //     drawerIcon: ({color}) => (
    //       <MaterialCommunityIcons name='login' size={22} color={color} style={{paddingLeft: 12}}/>
    //     )
    //   }}/>
    //   {/* <Drawer.Screen name="Recuperacion contraseña" component={RecuperacionContra} options={{
    //     drawerIcon: ({color}) => (
    //       <MaterialCommunityIcons name='login' size={22} color={color} style={{paddingLeft: 12}}/>
    //     )
    //   }}/> */}
    // </Stack.Navigator>
  )
}

export default HomeStack