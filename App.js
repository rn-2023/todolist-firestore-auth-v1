import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Login from "./screens/Login";
import Register from "./screens/Register";

const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    primary: 'black',
    background: 'white'
  }
}

export default function App() {
  return(
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}