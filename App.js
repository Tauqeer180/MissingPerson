
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen'
// import {StyleSheet, Colors} from 'react-native';
 import { Container,Text,Image, Header, Content, Form,Body, Item, Input, Label, Button, Segment, Icon,  Left, Right, Title } from 'native-base';
import Signin from './src/components/Signin';
import Signup from './src/components/Signup';
import SigninBanner from './src/components/SigninBanner';
import SigninTabs from './src/components/SigninTabs';
import Reports from './src/components/Reports';
import LayoutExample from './src/components/Test2';
import Details from './src/components/View';
//  import SideBar from './yourPathToSideBar';
import Header1 from './src/components/Header';
import CreatePost from './src/components/Create';
import Dashboard from './src/components/Dashboard';
// import 'react-native-gesture-handler';
// import {createStackNavigator} from 'react-navigation-stack';
// import {createAppContainer} from 'react-navigation';
import AppRoutes from './src/components/Routes';
import SideBar from './src/components/SideBar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import store from './src/store';
const Drawer = createDrawerNavigator();
const stack = createStackNavigator();
function HomeRoute() {
  return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Dashboard} />
        <Drawer.Screen name="View Reports" component={Reports} options={{title: "My Reports"}} />
        <Drawer.Screen name="CreatePost" component={CreatePost} />
        <Drawer.Screen name="Details" component={Details} />
        <Drawer.Screen name="Logout" component={SigninTabs} />
      </Drawer.Navigator>
  );
}
class App extends Component {
constructor(props) {
    super(props)
    this.state = {
  }
}
componentDidMount() {
  SplashScreen.hide();
}
  render(){
    return (
     <Provider store={store}>
     {/* <NavigationContainer >
       <stack.Navigator headerMode='none'  initialRouteName="SigninTabs">
        <stack.Screen name="SigninTabs" component={SigninTabs} />
        <stack.Screen name="Home" component={HomeRoute} />
       
       </stack.Navigator>
     </NavigationContainer> */}
    <AppRoutes/>
        </Provider>
    // <AppNavigator/>
  );
}}
export default App;
