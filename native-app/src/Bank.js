import React, { Component } from 'react'
import { View, Text,  Alert, Button, TextInput, TouchableOpacity, Platform, Dimensions, Image, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import {Card, CardItem, Thumbnail, H3 } from 'native-base';
const cluster = require('./../cluster.json');

export default class Home extends Component{
  state = {
    user: this.props.user,
    auth_token: this.props.auth_tok,
    country: 'US',
    account_holder_name: 'Noah Martinez',
    account_holder_type: 'individual',
    routing_number: '110000000',
    account_number: '000123456789',
    amount: '500',
    cur: 'usd',
    token: '',
  }
  Paynow = async () =>{
    fetch('https://api.stripe.com/v1/tokens?bank_account[country]='+this.state.country+'&bank_account[currency]='+this.state.cur+'&bank_account[account_holder_name]='+this.state.account_holder_name+'&bank_account[account_holder_type]='+this.state.account_holder_type+'&bank_account[routing_number]='+this.state.routing_number+'&bank_account[account_number]='+this.state.account_number, {
  method: 'POST',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer "+cluster.publishable_key
  }
})
  .then(resp => resp.json())
    .then(data => {
      if(typeof(data.error) != "undefined"){
        Alert.alert("Error", "Error: "+ data.error.message);

      }
      else{
        this.setState({ token: data.id });
        Alert.alert("Token Success", "Token created "+this.state.token);
        fetch('https://api.'+cluster.name+'.hasura-app.io/charge', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                src: this.state.token,
                amount: this.state.amount,
                currency: this.state.cur

                })
              }).then((response) => response.json())
              .then((res) => {
                      // Showing response message coming from server updating records.
                      if(res.status==200 || res.status=="succeeded"){
                        Alert.alert("Payment successfull", "Transaction id:"+res.id);
                      }
                      else{
                        Alert.alert("Payment Failure", ""+res.message)
                      }
                      this.setState({ loading: false});
                      console.log(res);

                    }).catch((error) => {
                      console.error(error);
                    });
      }

          }).catch((error) => {
            console.error(error);
          });
  }
  render(){
    return(
      <KeyboardAvoidingView style={styles.maincontainer} behavior="padding">
      <Image source={require('./images/bank.png')} style={{flex: 0}}/>
      <View style={styles.container} >
      <H3> Please enter following details to complete payment process </H3>
      <Card style={{width: (Dimensions.get('window').width-50), flex:0 }}>
      <TextInput
       placeholder="country: US"
       onChangeText={ TextInputValue => this.setState({ country : TextInputValue }) }
       underlineColorAndroid='transparent'
       style={styles.inputbox}
     />
     </Card>
     <Card style={{width: (Dimensions.get('window').width-50), flex:0 }}>
     <TextInput
      placeholder="currency: usd"
      onChangeText={ TextInputValue => this.setState({ cur : TextInputValue }) }
      underlineColorAndroid='transparent'
      style={styles.inputbox}
    />
    </Card>
    <Card style={{width: (Dimensions.get('window').width-50), flex:0 }}>
    <TextInput
     placeholder="account_holder_name:James Moore"
     onChangeText={ TextInputValue => this.setState({ account_holder_name : TextInputValue }) }
     underlineColorAndroid='transparent'
     style={styles.inputbox}
   />
   </Card>
   <Card style={{width: (Dimensions.get('window').width-50), flex:0 }}>
   <TextInput
    placeholder="account_holder_type:individual"
    onChangeText={ TextInputValue => this.setState({ account_holder_type : TextInputValue }) }
    underlineColorAndroid='transparent'
    style={styles.inputbox}
  />
  </Card>
  <Card style={{width: (Dimensions.get('window').width-50), flex:0 }}>
  <TextInput
   placeholder="routing_number:110000000"
   onChangeText={ TextInputValue => this.setState({ routing_number : TextInputValue }) }
   underlineColorAndroid='transparent'
   style={styles.inputbox}
 />
 </Card>
 <Card style={{width: (Dimensions.get('window').width-50), flex:0 }}>
 <TextInput
  placeholder="account_number:000123456789"
  onChangeText={ TextInputValue => this.setState({ account_number : TextInputValue }) }
  underlineColorAndroid='transparent'
  style={styles.inputbox}
/>
</Card>
  <Card style={{width: (Dimensions.get('window').width-50), flex:0, }}>
  <TouchableOpacity onPress={this.Paynow.bind(this)}>
  <View style={{height: 50, backgroundColor: 'purple',justifyContent: 'center',
  alignItems: 'center',}}>
  <Text style={{
    fontSize: 20,
    color: '#FFFFFF',
  }}> Pay now </Text></View>
  </TouchableOpacity>
  </Card>

      </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  inputbox: {
    textAlign: 'center',
    width: '90%',
    marginBottom: 7,
    height: 40,
    borderRadius: 5 ,
  },
  maincontainer:{
    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 5,
  },
  tcard:{
    flexDirection: 'row',
  },
  inputdou: {
    textAlign: 'center',
    width: '50%',
    marginBottom: 7,
    height: 40,
    borderRadius: 5 ,
  },
});
