
import React, { Component } from 'react';
import {StyleSheet, Colors, Text, View} from 'react-native';
 import { Container, Header, Content, Form,Body, Item, Input, Label, Button, Segment, Icon, Drawer, Left, Right, Title } from 'native-base';

import SideBar from './SideBar';


class Header1 extends Component {
  closeDrawer= () => {
    this.drawer._root.close()
  };
// openDrawer =() => { this.drawer._root.open();

// };
  render(){
  return (
    // <Drawer ref={(ref) => { this.drawer = ref; }} content={<SideBar navigator={this.navigator} />} onClose={() => this.closeDrawer()} >
    
    

      <Header>
        <Left>
            <Button transparent onPress={()=> this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
        <Body>
  <Title>{this.props.name}</Title>
        </Body>
       <Right><Text></Text></Right>
      </Header>
     
     
        
     
      // </Drawer>
  );
}
}


export default Header1;
