import React, { Component } from 'react'
import { View, Text,  Alert, Button, TextInput, TouchableOpacity, Platform, Dimensions,
   Image, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import {Card, CardItem, Thumbnail, H3, Container} from 'native-base';
const cluster = require('./../cluster.json');
export default class Cardpay extends Component{
  static navigationOptions={
    title: 'Card Payment',
  }
  state = {
    user: this.props.user,
    auth_token: this.props.auth_tok,
    number: '4242424242424242',
    exp_month: '2',
    exp_year: '2019',
    cvc: '242',
    amount: '50',
    cur: 'usd',
    token: '',
    paid: false,
    message: 'Payment successfull',
  }
  Paynow = async () =>{
    fetch('https://api.stripe.com/v1/tokens?card[number]='+this.state.number+'&card[exp_month]='+this.state.exp_month+'&card[exp_year]='+this.state.exp_year+'&card[cvc]='+this.state.cvc+'&amount='+this.state.amount+'&currency='+this.state.cur, {
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
                        this.setState({paid: true,
                        transaction_id: res.id});
                      }
                      else{
                        Alert.alert("Payment Failure", ""+res.message)
                        this.setState({message: res.message});
                      }
                      fetch('https://data.'+cluster.name+'.hasura-app.io/v1/query', {
                              method: 'post',
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                "type": "insert",
                                "args": {
                                  "table": "transactions",
                                  "objects": [
                                      {
                                          "user": this.props.screenProps.user,
                                          "transaction_id": this.state.transaction_id,
                                          "amount": this.state.amount,
                                          "currency": this.state.cur,
                                          "paid": this.state.paid,
                                          "mes": this.state.message
                                      }
                                  ]
                              }
                              })
                            })
                      this.setState({ loading: false});

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

      <KeyboardAvoidingView  behavior="padding">
      <ScrollView>
      <Image source={require('./images/card.png')} style={{ width: Dimensions.get('window').width-10, flex: 0}}/>
      <View style={styles.container} >


      <H3> Please enter following details to complete payment process </H3>
      <Card style={{width: (Dimensions.get('window').width-50), flex:0 }}>

      <TextInput
       placeholder="Enter Card number"
       onChangeText={ TextInputValue => this.setState({ number : TextInputValue }) }
       underlineColorAndroid='transparent'
       style={styles.inputbox}
     />
     </Card>
     <Card style={{width: (Dimensions.get('window').width-50), flex:0 }}>
     <View style={styles.tcard}>

     <TextInput
      placeholder="Exp_month"
      onChangeText={ TextInputValue => this.setState({ exp_month : TextInputValue }) }
      underlineColorAndroid='transparent'
      style={styles.inputdou}
    />
    <TextInput
     placeholder="Exp_year"
     onChangeText={ TextInputValue => this.setState({ exp_year : TextInputValue }) }
     underlineColorAndroid='transparent'
     style={styles.inputdou}
   />
   </View>
    </Card>
    <Card style={{width: (Dimensions.get('window').width-50), flex:0 }}>

    <TextInput
     placeholder="CVC"
     onChangeText={ TextInputValue => this.setState({ cvc : TextInputValue }) }
     underlineColorAndroid='transparent'
     style={styles.inputdou}
   />
   </Card>
   <Card style={{width: (Dimensions.get('window').width-50), flex:0 }}>
  <View style={styles.tcard}>
   <TextInput
    placeholder="Amount"
    onChangeText={ TextInputValue => this.setState({ amount : TextInputValue }) }
    underlineColorAndroid='transparent'
    style={styles.inputdou}
  />
  <TextInput
   placeholder="Currency"
   onChangeText={ TextInputValue => this.setState({ cur : TextInputValue }) }
   underlineColorAndroid='transparent'
   style={styles.inputdou}
 />
  </View>
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
      </ScrollView>
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
