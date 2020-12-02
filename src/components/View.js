import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
// import firebase from '../config/fbConfig';
import { StyleSheet, Text, View, Image, ScrollView,RefreshControl } from 'react-native'
import {Header,Left, Right, Button,Body,Title,Container,Content, Card, CardItem, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo' ;
import MyIcon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

// import Icon from 'react-native-vector-icons/FontAwesome';
let text = '';
class Details extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.route.params);
        this.data = '';
        // this.dbRef =firebase.firestore().collection('Missing').doc('A1nXRLkGPuzu4ldH3mxT')
        this.state = {
          // status: '',
          id: '',
          data: '',
          isLoading: true,
      }
    };
   

    componentDidMount() {
      
      this.unsubscribe = this.getData();
      // alert(this.props.route.params.id);
      console.log('did mount')
     }
     componentDidUpdate(){
      (this.state.id === this.props.route.params.id)? '':(
      this.unsubscribe = this.getData())
      console.log('did update')
    }
    componentWillUpdate(){
      console.log('will update')
    }
    componentWillUnmount(){
      this.unsubscribe();
      // this.getData();
    }
    refresh(){
      this.unsubscribe = this.getData();
    }
    getData() { firestore().collection(this.props.route.params.type)
      .doc(this.props.route.params.id)
      .get().then((res) => {
        console.log('fetching data from view')
      this.setState({
         isLoading: true,
        id: this.props.route.params.id
      });
      if (res.exists) {
        text = res.data().name;
        const data = res.data();
        console.log(data)
        this.data = data;
        this.setState({
           data,
            isLoading: false });
      } else {
        console.log("Document does not exist!");
      }
    }).catch((err) => {
      console.error("Error found: ", err);
      alert(this.state.id)
      
    })
   console.log('com0p mounted')

  }
    
    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open();
    };
    render(){
      let data = this.data;
      // let {status, id} = this.props.route.params;    
    return (
        <View style={{flex:1}}>
            <Header>
        <Left>
            <Button transparent onPress={()=> this.props.navigation.openDrawer()}>
              <Icon name='menu' color='white' size={30} />
            </Button>
          </Left>
        <Body>
  <Title>View Details</Title>
        </Body>
       {/* <Right><Text></Text></Right> */}
      </Header>
             {/* {(this.state.isLoading)? <Image style={{width:100,height:100}} source ={require('../assets/images/loading.gif')} />:'' } */}
                <ScrollView  refreshControl={ <RefreshControl refreshing={this.state.isLoading} onRefresh={this.refresh.bind(this)} /> } >
                {/*  <Content> */}
                <View>

            <View style={{backgroundColor:'#abc', width:'100%', height:100}}></View>
        <View style={{alignItems:'center', marginTop:-70}}>
                <Image style={{width:'80%',height:400, borderRadius:20}} source ={{uri:'data:image/png;base64,' + data.image}}/>
        </View>
        <View style={{alignItems:'center'}}>
            <Title style={{color:'black', fontWeight:'bold'}}>{data.name}</Title>
            <Text>{data.date}</Text>  
            
            <Icon name="rocket" size={30} color="#900" />
          
        </View>

        <View>
        <Card>
        <CardItem>
              <Left>
                <Title style={{color:'black', fontWeight:'bold'}}>S/O</Title>
                <Body>
                  <Text>{data.fName} </Text>
                 
                </Body>
              </Left>
            </CardItem>
            </Card>

            <Card>
        <CardItem>
              <Left> 
               <Icon name='location' style={{ fontSize:25}}/>
                <Body>
                  <Text>{data.address}</Text>
                </Body>
              </Left>
            </CardItem>
            </Card>

            <Card>
        <CardItem>
              <Left>
               <MyIcon name='idcard' style={{fontSize:25}} />
                <Body>
                  <Text>{data.cnic} </Text>
                </Body>
              </Left>
            </CardItem>
            </Card>

            <Card>
        <CardItem>
              <Left>
               <Icon name='phone' style={{fontSize:25}} />
                <Body>
                  <Text>{data.mobile}</Text>
                </Body>
              </Left>
            </CardItem>
            </Card>

            <Card>
        <CardItem>
              <Left>
              
               <Title style={{fontWeight:'bold', color:'black'}}>By</Title>
                <Body>
                  <Text> {data.byName} </Text>
                </Body>
              </Left>
            </CardItem>
            </Card>
        </View>
                </View>
        </ScrollView>
        </View>
        );
}}
function mapStateToProps(state) {
  return({
    missingReports: state.report.mReports,
    foundedReports: state.report.fReports
  })

}
export default connect(mapStateToProps) (Details);