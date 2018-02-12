import React, { Component } from 'react'
import { View, Text,  Alert, Button, TextInput, TouchableOpacity, Platform, Dimensions } from 'react-native';
import {Card, CardItem, Thumbnail, H1 } from 'native-base';
const cluster = require('./../cluster.json');

import Home from './Home'

export default class Login extends Component{
  state = {
    auth_token: '',
    otpcheck: false,
    mobile: '',
    otp: '',
  }

  Loginclick = async () => {
    Alert.alert("Login start");
    fetch('https://auth.'+cluster.name+'.hasura-app.io/v1/providers/mobile/send-otp', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "mobile": this.state.mobile,
            "country_code": "91"
          })
        })
        .then((response) => {
               Alert.alert("OTP sent", "An OTP is sent to your mobile number: "+ this.state.mobile);
               this.setState({ otpcheck: true });
              }).catch((error) => {
                console.error(error);
              });
  }

  Checkotp = async() =>{
    Alert.alert("OTP check start");
    fetch('https://auth.'+cluster.name+'.hasura-app.io/v1/login', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "provider" : "mobile",
              "data" : {
                 "mobile": this.state.mobile,
                 "country_code": "91",
                 "otp": this.state.otp
              }
          })
        }).then((response) => response.json())
        .then((responsejson) => {
          if(responsejson.code=="no-user"){
            fetch('https://auth.'+cluster.name+'.hasura-app.io/v1/signup', {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    "provider" : "mobile",
                      "data" : {
                         "mobile": this.state.mobile,
                         "country_code": "91",
                         "otp": this.state.otp
                      }
                  })
                }).then((res) => res.json())
                .then((resjson) => {
                 if (resjson.code=="invalid-mobile") {
                    Alert.alert("Invalid credentials", "Mobile number is invalid or otp is already used/expired");
                  }
                  else{
                    this.setState({ auth_token: responsejson.auth_token });
                  }
                      }).catch((error) => {
                        console.error(error);
                      });
          }
          else if (responsejson.code=="invalid-mobile") {
            Alert.alert("Invalid credentials", "Mobile number is invalid or otp is already used/expired");
          }
          else{
            this.setState({ auth_token: responsejson.auth_token });
          }
              }).catch((error) => {
                console.error(error);
              });
  }
  render(){
    if(this.state.auth_token==''){
      if(this.state.otpcheck){
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
          <H1 style ={{justifyContent: 'center',  alignItems: 'center', paddingLeft: 10}}> Please enter OTP sent to {this.state.mobile}</H1>
          </View>
          <View style={{flex: 2}}>

         <Card style={{width: (Dimensions.get('window').width-50), flex:0, }}>
         <TextInput
          placeholder="Enter OTP sent"
          onChangeText={ TextInputValue => this.setState({ otp : TextInputValue }) }
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
        <TouchableOpacity onPress={this.Checkotp.bind(this)}>
        <View style={{height: 50, backgroundColor: 'purple',justifyContent: 'center',
        alignItems: 'center',}}>
        <Text style={{
          fontSize: 20,
          color: '#FFFFFF',
        }}> Check OTP </Text></View>
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
      }else{
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
          <H1 style ={{justifyContent: 'center',  alignItems: 'center', paddingLeft: 10}}> Please enter your mobile number</H1>
          </View>
          <View style={{flex: 2}}>

         <Card style={{width: (Dimensions.get('window').width-50), flex:0, }}>
         <TextInput
          placeholder=" e.g. 9874511245"
          onChangeText={ TextInputValue => this.setState({ mobile : TextInputValue }) }
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
        <TouchableOpacity onPress={this.Loginclick.bind(this)}>
        <View style={{height: 50, backgroundColor: 'purple',justifyContent: 'center',
        alignItems: 'center',}}>
        <Text style={{
          fontSize: 20,
          color: '#FFFFFF',
        }}> GET  OTP </Text></View>
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
    }
      else{
        return(
          <Home auth_tok={this.state.auth_token} user={this.state.mobile}/>
        );
    }

  }
}
