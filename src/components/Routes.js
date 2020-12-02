import React, { Component } from 'react';
import SigninTabs from './SigninTabs';
import Reports from './Reports';
import Details from './View';
import CreatePost from './Create';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';
import Search from './Search';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContentScrollView, DrawerItem,  DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

import { DrawerNavigator } from "react-navigation";
const Drawer = createDrawerNavigator();
const stack = createStackNavigator();

function HomeRoute(props) {
 
  return (
    
      <Drawer.Navigator initialRouteName="Home"  drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => {
              // auth().getUser(uid)
              // .then(userRecord){
              //   console.log(userRecord)
              // }
              auth().signOut().then(() => {
                // AsyncStorage.removeItem('MISSING_TOKEN')
                // props.navigation.navigate('Auth')
              })
              .catch(error => alert(error))
            }} />
          </DrawerContentScrollView>
        )
      }}>
        
        <Drawer.Screen name="Home" component={Dashboard} />
        <Drawer.Screen name="View Reports" component={Reports} />
        <Drawer.Screen name="CreatePost" component={CreatePost} />
        <Drawer.Screen name="Details" component={Details} />
        <Drawer.Screen name='Search' component={Search} />
        {/* <Drawer.Screen name="Logout" component={SigninTabs} /> */}
      </Drawer.Navigator>
  );
}
class AppRoutes extends Component {
  constructor(props) {
      super(props)
      this.state = {
        token: false
    }
  }
  componentDidMount(){
    auth().onAuthStateChanged(token => {
      
      this.setState({
token
      })
      // alert(token)
    })
    // this.setState({
    //   token
    // })

  }
  render(){
    // const auth_token = AsyncStorage.getItem('MISSING_TOKEN')
    // console.log(auth_token.email)
//     var auth_token = ''
// auth().onAuthStateChanged(user => {
//  auth_token = ((user.uid !== null)? 'true' : 'false')
//  console.log(user)
// })
// alert(this.state.token)
      return (
        
      <NavigationContainer >

          {
            (this.state.token)?
          <stack.Navigator headerMode='none'  initialRouteName="Auth">
            <stack.Screen  name="Home" component={HomeRoute} />
        </stack.Navigator>

            :
            <stack.Navigator headerMode='none'  initialRouteName="Auth">
            <stack.Screen name="Auth" component={SigninTabs} />
            <stack.Screen name='ForgotPassword' component={ForgotPassword} />
            </stack.Navigator>

            
          }
           {/* : */}
           {/* <stack.Screen name="Home" component={HomeRoute} /> */}
          {/* }  */}
          {/* <stack.Screen name="CreatePost" component={CreatePost} /> */}
          {/* <stack.Screen name="Details" component={Details} /> */}


          {/* <stack.Screen name="View Reports" component={Reports} options={{title: "My Reports"}} /> */}

      </NavigationContainer>
         
    );
  }}
  export default AppRoutes;
