
import React, { Component } from 'react';
// import {StyleSheet, Colors} from 'react-native';
 import { Container,Text, Header, Content, Form, Item, Input, Label, Button, Segment, Icon, Drawer } from 'native-base';
//  import SideBar from './yourPathToSideBar';
class Signup extends Component {
  render(){
  return (
    <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Full Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>E-Mail</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Mobile No.</Label>
              <Input />
            </Item>
            <Item floatingLabel last >
              <Label>Password</Label>
              <Input />
            </Item>
            <Button  success block marginTop={50}>
              <Text>Sign up</Text>
            </Button >
          </Form>
        </Content>
      </Container>
  );
}}
export default Signup;
