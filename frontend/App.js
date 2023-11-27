import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

// import AuthStack from './src/navigation/AuthStack';
import HomeStack from './src/navigation/HomeStack';
import { AuthProvider } from './src/conext/AuthContext';
import AppNav from './src/navigation/AppNav';

// const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
      <AuthProvider>
        <AppNav />
        {/* <NavigationContainer>
          <HomeStack />
        </NavigationContainer> */}
      </AuthProvider>
    </SafeAreaView>

    // <SafeAreaView style={styles.container}>
    //   <ScrollView>

    //     <Text>Open up App.js to start working on your app!</Text>
    //     <StatusBar style="auto" />
    //   </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
