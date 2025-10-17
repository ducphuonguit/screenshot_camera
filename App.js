// React Native Finish Current Screen while Navigating to Next Screen
// https://aboutreact.com/react-native-finish-current-screen-while-navigating-to-next-screen/


import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './pages/CameraScreen';
import HomeScreen from './pages/HomeScreen';
import ScreenshotScreen from './pages/ScreenshotScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Screenshot" component={ScreenshotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;