import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';


const CustomDrawer = (props) => {
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
      </DrawerContentScrollView>
    </SafeAreaView>
  )
}

export default CustomDrawer