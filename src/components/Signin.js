



import React, { Component } from 'react';
// import {StyleSheet, Colors} from 'react-native';
 import { Container,Text, Header, Content, Form, Item, Input, Label, Button, Segment, Icon, Drawer } from 'native-base';

//  import SideBar from './yourPathToSideBar';


class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
  }
}
  render(){
  return (
    <Container>
       
        
        
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last margin={30} padding={30}>
              <Label padding={10} margin={10}>Password</Label>
              <Input />
            </Item>
            <Button  success block marginTop={50} onPress={()=> navigation.replace('Reports')}>
              <Text>Sign in</Text>
            </Button >
          </Form>
        </Content>
      </Container>
  );
}
}


export default Signin;
