import React, {useContext} from 'react'
import { View, ActivityIndicator } from 'react-native'; 
// import { SafeAreaView, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './HomeStack';
import BienvenidaAprendiz from '../screens/Aprendiz/BienvenidaAprendiz';
import { AuthContext } from '../conext/AuthContext';
import AprendizStack from './AprendizStack';
import InstructorStack from './InstructorStack';
import AdministradorStack from './AdministradorStack';


const AppNav = ({navigation}) => {
  const {isLoading, rolUser} = useContext(AuthContext);

  if ( isLoading ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      { rolUser === null && (
        <HomeStack />
      )}
      { rolUser == 1 && (
        <AdministradorStack />
        // <BienvenidaAprendiz />
      )}
      { rolUser == 2 && (
        // <BienvenidaAprendiz />
        <AprendizStack />
      )}
      { rolUser == 3 && (
        <InstructorStack />
      )}

      {/* { userToken !== null ? <BienvenidaAprendiz /> : <HomeStack />} */}
    </NavigationContainer>
  )
}

export default AppNav