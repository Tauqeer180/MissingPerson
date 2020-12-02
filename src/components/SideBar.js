import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["Dashboard", "Reports", 'Logout'];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: "https://c4.wallpaperflare.com/wallpaper/246/739/689/digital-digital-art-artwork-illustration-abstract-hd-wallpaper-thumb.jpg"
            }}
            style={{
              height: 180,
            width:'100%',
            objectFit:'contain', 
            // height:'100%',
            //   alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}/>
            
          
          <List
            dataArray={routes}
            renderRow={data => {
                console.log(this.props)
                console.log(data)
              return (
                <ListItem
                  
                  onPress={() => this.props.navigation.navigate('Reports')}>
                    
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
         
        </Content>
        <ListItem onPress={() => this.props.navigation.navigate('Reports')}>
            <Text>My Report</Text>
          </ListItem>
      </Container>
    );
  }
}
