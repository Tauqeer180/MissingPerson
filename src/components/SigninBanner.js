
import React, { Component } from 'react';
// import {StyleSheet, Colors} from 'react-native';
 import { Container,Text, Header, Content, Form, Item, Input, Label, Button, Segment, Icon, Drawer } from 'native-base';

//  import SideBar from './yourPathToSideBar';


class SigninBanner extends Component {
  render(){
  return (
    <Container>
       
        <Content padder style={{backgroundColor:'#456', maxHeight:145}}>
         <Icon name='sign-out-alt'></Icon>
        </Content>
        <Segment  style={{backgroundColor:'#456'}}>
          <Button first>
            <Text>Signin</Text>
          </Button>
          
          <Button last active>   
            <Text>Signup</Text>
          </Button>
        </Segment>
      </Container>
  );
}
}


export default SigninBanner;
