import React, { Component } from 'react'
import { View, Text,  Alert, Button, TextInput, TouchableOpacity, Platform, Dimensions } from 'react-native';
import {Card, CardItem, Thumbnail, H1 } from 'native-base';
import Home from './Home';
const cluster = require('./../cluster.json');
export default class App extends Component{
  state = {
    username: '',
    password: '',
    auth_token: ''
  }

  Signup = async () => {
    fetch('https://auth.'+cluster.name+'.hasura-app.io/v1/signup', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "provider": "username",
            "data": {
                "username": this.state.username,
                "password": this.state.password
            }
          })
        }).then((response) => response.json())
        .then((res) => {
          if(typeof(res.message) != "undefined"){
            Alert.alert("Error signing up", "Error: "+ res.message);

          }
          else{
            this.setState({ auth_token: res.auth_token });
            Alert.alert("Success", "You have succesfully signed up.");
          }
              }).catch((error) => {
                console.error(error);
              });
  }
  Login = async () => {
    fetch('https://auth.'+cluster.name+'.hasura-app.io/v1/login', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "provider": "username",
            "data": {
                "username": this.state.username,
                "password": this.state.password
            }
          })
        }).then((response) => response.json())
        .then((res) => {
          if(typeof(res.message) != "undefined"){
            Alert.alert("Error signing up", "Error: "+ res.message);

          }
          else{
            this.setState({ auth_token: res.auth_token });
            Alert.alert("Welcome", " You have succesfully logged in");
          }
              }).catch((error) => {
                console.error(error);
              });
  }
  render(){
    if(this.state.auth_token==''){
        return(

          <View style={{
             paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
             justifyContent: 'center',
             alignItems: 'center',
             justifyContent: 'space-between',
             flex: 1,
          }}>
          <View style={{flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',}}>
          <H1 style ={{justifyContent: 'center',  alignItems: 'center', paddingLeft: 10}}> Please login or signup to use</H1><H1> Krishi-suvidha </H1>
          </View>
          <View style={{flex: 2}}>
          <Card style={{width: (Dimensions.get('window').width-50), flex:0 }}>

          <TextInput
           placeholder="Enter User name"
           onChangeText={ TextInputValue => this.setState({ username : TextInputValue }) }
           underlineColorAndroid='transparent'
           style={
           {
               textAlign: 'center',
               width: '90%',
               marginBottom: 7,
               height: 40,
               borderRadius: 5 ,
               fontSize: 20,
           }
         }
         />
         </Card>
         <Card style={{width: (Dimensions.get('window').width-50), flex:0, }}>
         <TextInput
          placeholder="Enter password"
          onChangeText={ TextInputValue => this.setState({ password : TextInputValue }) }
          underlineColorAndroid='transparent'
          style={
          {
              textAlign: 'center',
              width: '90%',
              marginBottom: 7,
              height: 40,
              borderRadius: 5 ,
              fontSize: 20,
          }

        }
        secureTextEntry={true}

        />
        </Card>

        <Card style={{width: (Dimensions.get('window').width-50), flex:0, }}>
        <TouchableOpacity onPress={this.Signup.bind(this)}>
        <View style={{height: 50, backgroundColor: 'purple',justifyContent: 'center',
        alignItems: 'center',}}>
        <Text style={{
          fontSize: 20,
          color: '#FFFFFF',
        }}> Signup</Text></View>
        </TouchableOpacity>
        </Card>

        <Card style={{width: (Dimensions.get('window').width-50), flex:0, }}>
        <TouchableOpacity onPress={this.Login.bind(this)}>
        <View style={{height: 50, backgroundColor: 'purple',justifyContent: 'center',
        alignItems: 'center',}}>
        <Text style={{
          fontSize: 20,
          color: '#FFFFFF',
        }}> Login </Text></View>
        </TouchableOpacity>
        </Card>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',}}>
        <Text style={{
          fontSize: 15
        }}> Powered by </Text>
        <Thumbnail  source={require('./images/hasura.png')}/>
        <Text style={{
          fontSize: 15,
        }}> Hasura</Text>
        </View>
          </View>
        );
      }
      else{
        return(
          <Home />
        );
    }

  }
}
