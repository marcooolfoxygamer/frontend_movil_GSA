import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>

      {/* Barra de navegación */}
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
          <Icon
            name="menu"
            size={40}
          />
        </TouchableOpacity>
        <ImageBackground
          source={require('../../assets/images/LogoGsA.png')}
          style={{width:37, height:40}}
        />
      </View>

      {/* Vista */}
      <Image
        source={require('../../assets/images/Isologo_GsA-removebg-preview.png')}
        style={styles.img}
      />
      <Text style={styles.subt}>Su gimnasio Sena al alcance de sus manos</Text>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#dddddd9c',
    paddingTop: 40,
    padding: 20,
  },
  img: {
    alignSelf: 'center',
    marginTop: deviceHeight/6,
    width: 210,
    height: 250,
    resizeMode: 'stretch'
  },
  subt: {
    fontWeight: '900',
    margin: 20,
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 38,
    paddingHorizontal: 35,
  }
});

export default HomeScreen