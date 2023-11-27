import React, {useContext} from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../conext/AuthContext';

const CustomDrawer = (props) => {

  const {logout} = useContext(AuthContext);

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#d5d5d59c', paddingTop: '16%', paddingBottom: '20%'}}>
      <TouchableOpacity onPress={()=>props.navigation.closeDrawer()}>
        <Ionicons
            name='chevron-back-circle-outline'
            color='#64a81b'
            size={35}
            style={{
              marginRight:20,
              alignSelf: 'flex-end',
            }}
        />
      </TouchableOpacity>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          flex:2,
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
      >
        <DrawerItemList
          {...props}
          // style={{padding: 20}}
        />
        <DrawerItem
          label='Cerrar Sesión'
          labelStyle={{
            marginLeft: -18,
            fontFamily:'sans-serif',
            fontSize: 17,
            marginVertical: 10,
            padding: 10,
            color: '#64a81b'
          }}
          icon={({size=22}) => <MaterialCommunityIcons name='logout' size={size} color='#64a81b' style={{paddingLeft: 9}}/>}
          onPress={() => 
            setTimeout(() => {
              logout();
            }, 100)
          }
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  )
}

export default CustomDrawer