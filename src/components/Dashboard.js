import {PermissionsAndroid, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import {v1 as uuidv1} from 'uuid';
import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import {StyleSheet,View,Image ,Colors} from 'react-native';
 import { Container,Text,DatePicker, Header,Fab, Content,Left,Body,Title,Right, Form, Item, Input, Label, Button, Segment, Icon, Drawer } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import SideBar from './SideBar';
import Header1 from  './Header';
import auth from '@react-native-firebase/auth';
//  import SideBar from './yourPathToSideBar';


class Dashboard extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
          active:false,
          iconName:'edit',
          profile: '',
          mis_pend: 0,
          mis_reso: 0,
          fou_pend: 0,
          fou_reso: 0,

          
          
      }
      // console.log( this.props.route.params.user );
    }
    componentDidMount(){
      const { currentUser } = auth()
      this.setState({
        profile: currentUser
      })
      console.log(auth().currentUser)
      firestore().collection('Missing').where('byUid', '==', currentUser.uid).where('status', '==', 'Pending')
      .get()
      .then(res => {
        // console.log(res.size)
        this.setState({
          mis_pend: res.size
        })
      })
      firestore().collection('Missing').where('byUid', '==', currentUser.uid).where('status', '==', 'Resolved')
      .get()
      .then(res => {
        // console.log(res.size)
        this.setState({
          mis_reso: res.size
        })
      })
      firestore().collection('Find_out').where('byUid', '==', currentUser.uid).where('status', '==', 'Pending')
      .get()
      .then(res => {
        this.setState({
          fou_pend: res.size
        })
      })
      firestore().collection('Find_out').where('byUid', '==', currentUser.uid).where('status', '==', 'Resolved')
      .get()
      .then(res => {
        this.setState({
          fou_reso: res.size
        })
      })
   
    }
    render(){
      // const jsonValue =  AsyncStorage.getItem('MISSING_TOKEN')
      // let value = (jsonValue) ? JSON.parse(jsonValue) : null;
      // let value = JSON.parse(jsonValue)
      // console.log(value)
      // console.log(jsonValue)
    // const {id} = this.props.route.params;
    let {mis_pend, mis_reso, fou_pend, fou_reso} = this.state
  return (
      
    <Container>
       
       <Header>
        <Left>
            <Button transparent onPress={()=> this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
        <Body>
  <Title>Dashboard</Title>
        </Body>
       <Right><Text></Text></Right>
      </Header>
      <ScrollView>
      
        {/* <Content> */}
           <Text style={{fontSize:30, marginLeft:'auto', marginRight:'auto'}}>Welcome</Text>
           {/* <Text>{id}</Text> */}
           <Text style={{fontSize:30, marginLeft:'auto', marginRight:'auto'}}> {this.state.profile.displayName} </Text>
       <View style={{padding:10,flexDirection:'row',flexWrap:'wrap'}}>
         <View style={{backgroundColor:'#1c8adb',margin:5, padding:15, width:'98%', borderRadius:10 }}>
              <Title style={{fontSize:30}}>Your Complaints</Title>
              <Title style={{fontSize:35}}>{mis_pend + mis_reso + fou_pend + fou_reso} </Title>
         </View>
         <View style={{backgroundColor:'#1c8adb',margin:5, padding:15, width:'47%', borderRadius:10 }}>
         <Title style={{fontSize:30}}>Resolved</Title>
              <Title style={{fontSize:35}}>{mis_reso + fou_reso} </Title>
         </View>
         <View style={{backgroundColor:'#1c8adb',margin:5, padding:15, width:'47%', borderRadius:10 }}>
         <Title style={{fontSize:30}}>Pending</Title>
              <Title style={{fontSize:35}}>{mis_pend + fou_pend} </Title>
         </View>
       </View>
       {/* </Content> */}
       </ScrollView>

       <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active, iconName:'cross' })}>
            <Icon type='Entypo' name={this.state.active? 'cross':'edit'} />
            <Button style={{ backgroundColor: '#34A34F' }} onPress={()=>this.props.navigation.navigate('CreatePost')}>
              <Icon type='FontAwesome' name="edit" />
            </Button>
           
          </Fab>
      </Container>
      
  );
}
}


export default Dashboard;
