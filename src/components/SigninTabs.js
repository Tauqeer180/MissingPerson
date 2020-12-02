import React, { Component } from 'react';
import  AsyncStorage  from '@react-native-community/async-storage';
import { Container, Header, Content, Tab, Tabs,Form, Item, Label, Input, Button, Text, Title } from 'native-base';
import {View, ScrollView, Alert, Image} from 'react-native';
// import firebase from '../config/fbConfig';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import {firebase, firestore } from 'firebase';
import Signin from './Signin';
import Signup from './Signup';
import {connect} from 'react-redux';
// import Tab3 from './tabThree';
class SigninTabs extends Component {
  
  constructor() {
    super();
    this.state = { 
      inEmail: '', 
      inPassword: '',
      isLoading: false,
      upEmail:'',
      upPassword:'',
      upName:'',
      upNumber:'',
    }
  }
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      // this.props.navigation.navigate(user ? 'Home' : 'Auth')
      // alert(user? 'true': 'false')
      // alert(user)
      console.log(user)
     
    })
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  signup=()=>{
    console.log(this.state.upName + this.state.upEmail + this.state.upPassword + this.state.upNumber)
    if(this.state.upEmail === '' || this.state.upPassword === '' || this.state.upName === '' || this.state.upNumber === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
    auth()
  .createUserWithEmailAndPassword(this.state.upEmail, this.state.upPassword)
  .then((res) => {
    auth().currentUser.updateProfile({
      displayName: this.state.upName,
      phoneNumber: this.state.upNumber
    }).catch(err => {
      alert(err)
    })
    // alert(res.user.uid)
    const uid = res.user.uid;
    // console.log(res)
    const data = {
      id : uid,
      name: this.state.upName,
      email: this.state.upEmail,
      number: this.state.upNumber
    }
    firestore().collection('User').doc(uid).set(data)
    .then((res)=>{
      // AsyncStorage.setItem(LOGIN_TOKEN, res);
      // this.props.navigation.navigate('Home')
    }).catch((error) => {
      alert(error)})
    console.log('User account created & signed in!');
  })
  .catch(err => {
    alert(err)
    if (err.code === 'auth/email-already-in-use') {
      Alert.alert('E-mail already in use')
    }

    if (err.code === 'auth/invalid-email') {
      Alert.alert('Invalid E-mail')
    }
    if (err.code === 'auth/weak-password'){
      Alert.alert('Week Password')
    }
    this.setState({
      isLoading:false
    })
  });
  }
  }
  signin = () => {
    if(this.state.inEmail === '' || this.state.inPassword === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      auth()
      .signInWithEmailAndPassword(this.state.inEmail, this.state.inPassword)
      .then((res) => {
        console.log(res)
        // const jsonValue = JSON.stringify(res)
        // AsyncStorage.setItem('MISSING_TOKEN', jsonValue)
        // console.log(res.user.email);
        // this.props.navigation.navigate('Home');
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          inEmail: '', 
          inPassword: ''
        })
      })
      .catch(err => {
        alert(err)
        if(err.code === 'auth/wrong-password') {
          Alert.alert('Wrong Password')
        }
        if(err.code === 'auth/user-not-found') {
          Alert.alert('User not found')
        }
        if(err.code === 'auth/invalid-email') {
          Alert.alert('Invalid Email')
        }
        this.setState({
          isLoading: false
        })
      })
      // .catch(error => this.setState({ errorMessage: error.message }))
    }
  }


  render() {
    // console.log(this.props)
    return (
      <Container>
        {/* <Header  /> */}
        <View style={{height:200, backgroundColor:'#1c8adb', justifyContent:'center', alignItems:'center'}}>
          <Image source={require('../assets/images/Logo.png')} style={{width:200, height:200}}  />
        </View>
        <Tabs >
          {/* Sign in tab */}
          <Tab  tabStyle={{backgroundColor:'#1c8adb'}} activeTabStyle={{backgroundColor: '#5cb85c'}} heading="Signin" >
          {/* <Content> */}
          <ScrollView>
           
          <Form>
            <Item floatingLabel>
              <Label>E-MAIL</Label>
              <Input keyboardType='email-address' returnKeyType='next' value={this.state.inEmail} onChangeText={(val) => this.updateInputVal(val, 'inEmail')} />
            </Item>
            <Item floatingLabel >
              <Label padding={10} margin={10}>Password</Label>
              <Input secureTextEntry={true} returnKeyType="go" value={this.state.inPassword} onChangeText={(val) => this.updateInputVal(val, 'inPassword')} />
            </Item>
            <Button  success block marginTop={50}  onPress={() => this.signin()}>
              <Title>LOGIN</Title>
            </Button >
            <View style={{alignItems:'center', height:200, justifyContent:'center'}}>
            <Button onPress={()=>this.props.navigation.navigate('ForgotPassword')} style={{backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'#039BE5'}}>Forgot Password?</Text>
                    {/* <Title>Forgot Password? </Title> */}
            </Button>
            </View>
          </Form>
         
        {/* </Content> */}
        </ScrollView>
          </Tab>
          {/* Sign up tab */}
          <Tab heading="Signup" tabStyle={{backgroundColor:'#1c8adb'}}  activeTabStyle={{backgroundColor: '#5cb85c'}}>
        
          
          <ScrollView>
          <Form>
            <Item floatingLabel>
              <Label>Full Name</Label>
              <Input value={this.state.upName} onChangeText={(val)=> this.updateInputVal(val, 'upName') } />
            </Item>
            <Item floatingLabel>
              <Label>E-Mail</Label>
              <Input value={this.state.upEmail} onChangeText={(val) => this.updateInputVal(val, 'upEmail')} />
            </Item>
            <Item floatingLabel>
              <Label>Mobile No.</Label>
              <Input value={this.state.upNumber} onChangeText={(val) => this.updateInputVal(val, 'upNumber')} />
            </Item>
            <Item floatingLabel last >
              <Label>Password</Label>
              <Input secureTextEntry={true} value={this.state.upPassword} onChangeText={(val) => this.updateInputVal(val, 'upPassword')} />
            </Item>
            <Button onPress={()=>this.signup()}  success block marginTop={50}>
              <Text>Sign up</Text>
            </Button >
          </Form>
          </ScrollView>
       
          </Tab>
          
        </Tabs>
        {(this.state.isLoading)?
        <View style={{position:'absolute', width:'100%', height:'100%', backgroundColor:'#a9a9a9dd', justifyContent:'center', alignItems:'center'}}>
        <Image source={require('../assets/images/Loading-1.png')} style={{width:100, height:100,}} />
        </View>
        :null}

      </Container>
    );
  }
}
function mapStateToProps(state){
  return({
    myname : state.report.mReports
  })
  
}
export default connect(mapStateToProps)(SigninTabs);
