import React, { Component } from 'react';
import {View, Image, ScrollView, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text , Segment, Left, Body, Title, Right} from 'native-base';
import { Card } from 'react-native-elements';

import { firestoreConnect } from 'react-redux-firebase';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Search extends Component {
    constructor(props){
        super(props)
            this.state={
          type:'Missing',
          text: '',
          Data:[],
          isLoading:false,
          Option1Style:{ borderWidth:1, borderColor:'#92a8d1',height:40 },
          Option2Style:{ borderWidth:1,borderColor:'#92a8d1', height:40},
            }
        }
        Option1=() => {  this.setState({ type: 'Missing' })  }  
        Option2=() => {  this.setState({ type: 'Find_out' })  }
        updateInputVal = (val, prop) => {
            const state = this.state;
            state[prop] = val;
            this.setState(state);
          }
          handleSearch=()=>{
            //   alert('clicked ')
            this.setState({
                isLoading:true
            })
            firestore().collection(this.state.type).where('name', '==', this.state.text)
            .get()
            .then(snap => {
               
                const userArr = [];
                snap.forEach(res => {
                    console.log(res.data());
                    userArr.push({
                        _id : res.id,
                        ...res.data()
                      });
                });
                this.setState({
                    Data: userArr,
                    isLoading: false
                  })
            });
          }
  render() {
    let reports =  this.state.Data.map((mis, i) => {
        // source={{uri: 'data:image/png;base64,' + this.state.fileData}}
        return (
          <View  key={mis._id} style={{ width: '50%' }}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Details',{id:mis._id, type:'Missing'})}>
            <Card button={true} image={{uri: 'data:image/png;base64,' + mis.image}} style={{margin:0}} >
              {/* <CardItem cardBody> 
              
            <Image source={{uri: 'data:image/png;base64,' + mis.image}} style={{width:'100%', height:100, padding: 0, margin: 0}} />
              </CardItem> */}
  
              <Text style={{ fontSize: 18 }}>
                Name:
      <Text style={{}}>{mis.name}</Text>
              </Text>
              <Text style={{ fontSize: 18 }}>
                Gender:
                        <Text style={{}}> {mis.gender} </Text>
              </Text>
              <Text style={{ fontSize: 18 }}>
                Since:
                        <Text style={{ paddingLeft: 20 }}>{mis.date}</Text>
              </Text>
            </Card>
            </TouchableOpacity>
          </View>
        )
      })
      let { Option1Style, Option2Style} = this.state
    return (
      <Container>
          <Header>
        <Left>
            <Button transparent onPress={()=> this.props.navigation.openDrawer()}>
              <Icon name='menu' color='white' size={30} />
            </Button>
          </Left>
        <Body>
       <Title>Search Here</Title>
        </Body>
       <Right>
           {/* <Button transparent>
            <Text>Search</Text>
          </Button> */}
          </Right>
      </Header>
        <Header searchBar rounded>
          <Item style={{width:'80%'}}>
            <Icon name="ios-search" />
            <Input 
            returnKeyType='search' 
            enablesReturnKeyAutomatically={true} 
            placeholder="Search"
            onChangeText={(val) => this.updateInputVal(val, 'text')}
            onSubmitEditing={(e) => this.handleSearch(e)}
            />
            <Icon name="ios-people" />
          </Item>

          
          <Button transparent>
            <Text>Search</Text>
          </Button>
          
          </Header>
         
          <Segment style={{backgroundColor:'none', marginTop:20}}>
              <Button  first onPress={this.Option1} style={{...Option1Style,backgroundColor: (this.state.type === 'Missing')?'#3f51b5':'#92a8d1'}}><Text>Missing</Text></Button>
              <Button last onPress={this.Option2}  style ={ {...Option2Style, backgroundColor: (this.state.type === 'Finf_out')?'#3f51b5':'#92a8d1'}}><Text>Founded</Text></Button>
            </Segment>
            <ScrollView>
{(this.state.isLoading)? 
    <View style={[styles.container, styles.horizontal]}>
    
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
:
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

                {  reports}

              </View>
}
            {/* </Content> */}
            </ScrollView>
       
      </Container>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });
export default Search; 