import {PermissionsAndroid, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import firebase from '../config/fbConfig';
import React, { Component } from 'react';
import  auth  from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {add_m} from '../store/action';
import {add_f} from '../store/action';
// import uuid from 'uuid';
import {StyleSheet,View,Image ,Colors, TextInput} from 'react-native';
import { Container,Text,Left,Body,Title,Right,DatePicker, Header, Content, Form, Item, Input, Label, Button, Segment, Icon, Drawer } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { StackGestureContext } from 'react-navigation-stack';
class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.missingRef = firestore().collection('Missing');
        this.foundedRef = firestore().collection('Find_out');
        this.state = {
          Option1Style:{ borderWidth:1, borderColor:'#92a8d1',height:40 },
          Option2Style:{ borderWidth:1,borderColor:'#92a8d1', height:40},
          Option3Style:{ borderWidth:1, borderColor:'#92a8d1',height:40 },
          Option4Style:{ borderWidth:1,borderColor:'#92a8d1', height:40},
          Option5Style:{ borderWidth:1,borderColor:'#92a8d1', height:40},
          filepath: { data: '', uri: ''},
          fileData: '',
          id:'',
          fileUri: '',
          name:'',
          status:'pending',
          type: '',
          fName: '',
          age: '',
          address: '',
          number:'',
          cnic: '',
          date: '',
          gender:'',
          byUid: '',
          byName: '',
          formValidation:false,
          // nameValid:'', fNameValid:'',ageValid:'',dateValid:'',genderValid:'', addressValid:'', statusValid:''
        };
        // this.handleChange = this.handleChange.bind(this);
      }
      componentDidMount(){
        const { currentUser } = auth()
        this.setState({
          byUid : currentUser.uid,
          byName : currentUser.displayName
        })
      }
      Option1=() => {  this.setState({ type: 'missing' })  }  
      Option2=() => {  this.setState({ type: 'founded' })  }
      Option3=() => {  this.setState({ gender: 'male'    })  }
      Option4=() => {  this.setState({ gender: 'female'  })  }
      Option5=() => {  this.setState({ gender: 'other'   })  }

    handleName(e)   {this.setState({name: e})};
    handleFName(e)  {this.setState({fName: e})};
    handleAge(e)    {this.setState({age: e})};
    handleAddress(e){this.setState({address: e})};
    handleNumber(e) {this.setState({number: e})};
    handleCnic(e)   {this.setState({cnic: e})};
    setDate(e)      {this.setState({date: e.toString().substr(4,12)})};
    
    handleSubmit(){ 
      this.setState({formValidation: true}); 
      if(!this.state.type){
        alert('Please select type Missing or Founded')
                        };

      if(this.state.type == 'missing'){
          if(!this.state.name || !this.state.fileData || !this.state.fName || !this.state.age || !this.state.gender || !this.state.date || !this.state.address){
            alert('Please fill required fields!')
            }
          else{
      this.setState({id:( Math.random()*1000)})
            const newR = {id: this.state.id , image:this.state.fileData ,name: this.state.name,
               fName: this.state.fName, age: this.state.age, address: this.state.address,
                cnic: this.state.cnic, date: this.state.date, gender: this.state.gender,
                 mobile: this.state.number, byUid: this.state.byUid, byName: this.state.byName, status: 'Pending' };
            this.missingRef
            .add( newR)
            .then((res)=>{  this.setState({ 
              fileData: '',id:'',fileUri: '',name:'',type:'',fName: '',
              age: '',address: '', number:'',cnic: '',date: '',gender:''
            })
              this.props.navigation.navigate('Details', {id:res.id, type: 'Missing'})
            }).catch((err)=>{
              console.error('error found :' + err)
              alert(err)
            })
            // this.props.add_missing(newR);
            }
        }
       if(this.state.type == 'founded')
       { if(!this.state.age || !this.state.fileData || !this.state.gender || !this.state.date || !this.state.address )
         { alert('Please fill required fields') }
         else {
      this.setState({id: Math.random()})
            const newR = {id:this.state.id , image:this.state.fileData ,name: this.state.name,
               fName: this.state.fName, age: this.state.age, address: this.state.address,
                cnic: this.state.cnic, date: this.state.date, gender: this.state.gender,
                 mobile: this.state.number, byUid: this.state.byUid,  byName: this.state.byName, status: 'Pending'};
           this.foundedRef.add(newR)
           .then((res)=>{
            this.setState({ fileData: '',id:'',fileUri: '',name:'',type:'',fName: '',
            age: '',address: '', number:'',cnic: '',date: '',gender:''},
            ()=>{
              this.props.navigation.navigate('Details',{id:res.id, type:'Find_out'})
            })
           }).catch((err)=>{
             alert(err);
           })
          
          }
            
       } 
    } 

    handleChoosePhoto = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
              { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images', 
            },
          };
 ImagePicker.launchImageLibrary(options, (response) =>{
    console.log('response' ,response)
    if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
           filePath: response,
            fileData: response.data,
            fileUri: response.uri
          });
         }
    });
    };
    renderFileUri=()=>{
        if(this.state.fileUri){
            return<Image source={{uri: 'data:image/png;base64,' + this.state.fileData}} style={{width:'80%',height:400, borderRadius:20}} />
        }
        else{
            return <Image source={require('../assets/images/dummy-man.png')} style={{width:'80%',height:400, borderRadius:20}} />
        }
    }
    render(){
      let {name, fName,age,date,gender, address,number ,cnic, type,formValidation,Option1Style,Option2Style, Option3Style, Option4Style, Option5Style} = this.state;
      let  numberValid=false, nameValid=false ,cnicValid=false, fNameValid=false,ageValid=false,dateValid=false,genderValid=false, addressValid=false, typeValid=false 

      // let  nameValid, fNameValid = 0 ;
      // console.log( nameValid)
      if(formValidation == true){
          if(type == 'missing'){
            // console.log('console from status  missing = ' + nameValid)
            numberValid = true, nameValid = true, fNameValid = true,ageValid = true,dateValid = true,genderValid = true, addressValid = true, typeValid = true;
      // console.log('console from validation  ' + nameValid)
    }
          else if (type == 'founded'){
            console.log('console from type  founded = ' + type)
            numberValid = true,  dateValid= true, genderValid= true, addressValid = true;
          }
         
        }
        // console.log(name);

  return (
    <Container>
       <Header>
        <Left>
            <Button transparent onPress={()=> this.props.navigation.openDrawer()}>
              <Icon name='menu' color='white' size={30} />
            </Button>
          </Left>
        <Body>
  <Title>Create Report</Title>
        </Body>
       <Right><Text></Text></Right>
      </Header>
        {/* <Content> */}
<ScrollView>
          <View style={{backgroundColor:'#abc', width:'100%', height:100}}></View>
            <View style={{alignContent:'center', alignItems:'center', marginTop:-70}}>
               {this.renderFileUri()}
            </View>
            <Button block  marginTop={50} style={{width:200, marginLeft:'auto' , marginRight:'auto'}} onPress={this.handleChoosePhoto} >
              <Text>Select an Image</Text>
            </Button >

        <Form>
          {/* <Text>{nameValid} </Text> */}
            <Segment style={{backgroundColor:'none', marginTop:20}}>
              <Button  first onPress={this.Option1} style={{...Option1Style,backgroundColor: (this.state.type === 'missing')?'#3f51b5':'#92a8d1'}}><Text>Missing</Text></Button>
              <Button last onPress={this.Option2}  style ={ {...Option2Style, backgroundColor: (this.state.type === 'founded')?'#3f51b5':'#92a8d1'}}><Text>Founded</Text></Button>
            </Segment>
            
           {/* <Text>{nameValid} </Text> */}
           {/* <Text>{fName} </Text> */}
            <Item floatingLabel style={!name?(nameValid?{ borderBottomColor:'red'}:null):null}>
              <Label style={!name?(nameValid? { color: 'red'}:null):null}>Full Name</Label>
              {/* <Label style={!fName?(fNameValid?{ color:'red'}:null):null}>Father Name</Label> */}

              <Input type='text'  name='name' defaultValue={name}  onChangeText = {this.handleName.bind(this)}   />
            </Item>
            <Item floatingLabel style={!fName?(fNameValid?{ borderBottomColor:'red'}:null):null}> 
              <Label style={!fName?(fNameValid?{ color:'red'}:null):null}>Father Name</Label>
              <Input type="text" name="fName" defaultValue={fName} onChangeText={this.handleFName.bind(this)} />
            </Item>
            <Item floatingLabel style={!age?(ageValid?{ borderBottomColor:'red'}:null):null}>
              <Label style={!age?(ageValid?{ color:'red'}:null):null}>Age</Label>
              <Input  type="text" name="age" defaultValue={age} onChangeText={this.handleAge.bind(this)}/>
            </Item>
            <Item floatingLabel style={!address?(addressValid?{ borderBottomColor:'red'}:null):null}>
              <Label style={!address?(addressValid?{ color:'red'}:null):null}>Address of </Label>
              <Input type="text" name="address" defaultValue={address} onChangeText={this.handleAddress.bind(this)}/>
            </Item>
            <Item floatingLabel style={!number?(numberValid?{ borderBottomColor:'red'}:null):null}>
              <Label style={!number?(numberValid?{ color:'red'}:null):null}>Mobile Number </Label>
              <Input type="number" name="number" defaultValue={number} onChangeText={this.handleNumber.bind(this)}/>
            </Item>
            <Item floatingLabel style={!cnic?(cnicValid?{ borderBottomColor:'red'}:null):null}>
              <Label style={!cnic?(cnicValid?{color:'red'}:null):null}>CNIC</Label>
              <Input  type="text" name="cnic" defaultValue={cnic} onChangeText={this.handleCnic.bind(this)} />
            </Item>
            
            <Item style={{marginTop:30}} style={!date?(type?{ borderBottomColor:'red'}:null):null}>
              <Label style={{marginTop:30}} style={!date?(type?{ color:'red'}:null):null}>{type} Date:</Label>
              <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date()}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"calendar"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate.bind(this)}
            //  onChangeText={ this.handleDate.bind(this) } 
            disabled={false} /> 
            </Item>
            <Segment style={{backgroundColor:'none', marginTop:20}}>
              <Button  first onPress={this.Option3} style={{...Option3Style, backgroundColor: (gender === 'male')?'#3f51b5':'#92a8d1'}}><Text>Male</Text></Button>
              <Button last onPress={this.Option4}  style={{...Option4Style,  backgroundColor: (gender === 'female')?'#3f51b5':'#92a8d1'}}><Text>Female</Text></Button>
              <Button last onPress={this.Option5}  style={{...Option5Style,  backgroundColor: (gender === 'other')?'#3f51b5':'#92a8d1'}}><Text>Other</Text></Button>
            </Segment> 
            <Button  success block marginTop={50} onPress={this.handleSubmit.bind(this)}>
              <Text>Submit</Text>
            </Button >
          </Form>
        {/* </Content> */}
        </ScrollView>
      </Container>
  );
}}
function mapStateToProps(state){
  return({
    
  })
}
function mapDispatchToProps(dispatch){
  return({
            add_missing: (newR)=>{
              dispatch(add_m(newR) );
            },
            add_founded: (newR)=>{
              dispatch(add_f(newR));
            }
  })
}
export default connect(mapStateToProps,mapDispatchToProps)(CreatePost);
