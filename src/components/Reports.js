import React, { Component, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import {View, Image, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
// import { View } from 'react-native';
// import img1 from '../assets/images/sample.jpg';
import { Card } from 'react-native-elements';
import Header1 from './Header';
import SideBar from './SideBar';
import { connect } from 'react-redux';
// import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
// import firebase from '../config/fbConfig';
// import firebase from 'firebase';
import { Container, Header, Title, Drawer, Tabs,
   Tab, Content, CardItem, Thumbnail, Text, 
   Button, Icon, Left, Body, Right } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';


class Reports extends Component {

  constructor() {
    super();
    this.missingRef =firestore().collection('Missing');
    this.foundedRef = firestore().collection('Find_out');
    this.state = {
      isLoading: true,
      userArr: [], 
      missingData: [],
      foundedData: []
    };
  }

  
  getMissing = (querySnapshot) => {
    // this.setState({isLoading: true})
    const userArr = [];
    querySnapshot.forEach((res) => {
      userArr.push({
        _id: res.id,
        ...res.data()
      });
    })
    console.log(userArr);
    this.setState({
      missingData: userArr
   });
  }

  getFounded = (querySnapshot) =>{
    this.setState({isLoading: true})
    const userArr = [];
    querySnapshot.forEach((res)=>{
      userArr.push({
        _id : res.id,
        ...res.data()
      });
    })
        this.setState({
          foundedData: userArr,
          isLoading: false
        })
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open();

  };
  componentDidMount() {
    
    this.unsubscribe = this.missingRef.onSnapshot(this.getMissing);
    this.unsubscribe = this.foundedRef.onSnapshot(this.getFounded);
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
    fouRefresh=()=>{this.unsubscribe = this.foundedRef.onSnapshot(this.getFounded)};
    misRefresh=()=>{this.unsubscribe = this.missingRef.onSnapshot(this.getMissing)};
  render() {
    //      const mydb = await firestore().collection('Missing').doc('B3dxgLQhCVS9NLMtFkiXIU').get();
    // console.log(mydb);
    // this.getMissing();
    // console.log(this.state.missingData)
    let missing =  this.state.missingData.map((mis, i) => {
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
    let founded = this.state.foundedData.map((fou) => {
      // if (this.state.isLoading == true)
      // return(
      //   <View key = '2' >

      //   <ActivityIndicator size='large' color='red' />
      //   </View>
      // )
      return (
        <View key={fou._id} style={{ width: '50%' }}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Details',{id:fou._id, type:'Find_out'})}>

          <Card  image={{uri: 'data:image/png;base64,' + fou.image}} onPress={()=>this.props.navigation.navigate('Details', {id:fou.id})}>
            <Text style={{ fontSize: 18 }}>
              Name:
    <Text style={{}}>{fou.name}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
              Gender:
                      <Text style={{}}> {fou.gender} </Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
              Since:
                      <Text style={{ paddingLeft: 20 }}>{fou.date}</Text>
            </Text>
          </Card>
          </TouchableOpacity>
        </View>
      )
    })

  
    
    return (
      <Container >
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' color='white' size={30} />
            </Button>
          </Left>
          <Body>
            <Title>Missing Reports</Title>
          </Body>
          <Right><Text></Text></Right>
        </Header>
        <Tabs>
          {/* Sign in tab */}
          <Tab heading="Missing" >
            {/* <Content > */}
            <ScrollView refreshControl={<RefreshControl refreshing={this.state.isLoading} onRefresh={this.misRefresh} />}>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

                {  missing}

              </View>
            {/* </Content> */}
            </ScrollView>

          </Tab>
          <Tab heading="Founded" >
            {/* <Content> */}
            <ScrollView refreshControl = { <RefreshControl refreshing={this.state.isLoading} onRefresh={()=>this.fouRefresh} /> }>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {founded}
{/* <Text>nothing</Text> */}


              </View>
              </ScrollView>
            {/* </Content> */}
          </Tab></Tabs>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  // console.log(state);
  return ({
    // missingReports: state.firestore.ordered.Missing,
    missingReports: state.report.mReports,
    foundedReports: state.report.fReports,
    
  })
  // console.log(state)
}

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([
//     'Missing'
//   ]
//   ),
// )(Reports);

export default connect(mapStateToProps)(Reports);
// export default Reports;