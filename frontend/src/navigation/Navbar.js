import React from 'react'
import { SafeAreaView, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const Navbar = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#eeeeee9c',
              paddingTop: 40,
              padding: 20,
            }}
          >
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
              <Icon
                name="menu"
                size={40}
              />
            </TouchableOpacity>
            <ImageBackground
              source={require('../assets/images/LogoGsA.png')}
              style={{width:35, height:40}}
            />
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Navbar