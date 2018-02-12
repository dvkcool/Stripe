import React, { Component } from 'react'
import { View, Text,  Alert, Button, TextInput, TouchableOpacity, Platform, Dimensions,
  Image, StyleSheet, KeyboardAvoidingView, ScrollView,  } from 'react-native';
import {Card, CardItem, Thumbnail, H3, Header, Tab, Tabs, TabHeading, Icon, H1, StyleProvider } from 'native-base';
import getTheme from './../native-base-theme/components';
import material from './../native-base-theme/variables/material';
const cluster = require('./../cluster.json');
import Cardpay from './Cardpay';
import Bank from './Bank';
export default class Home extends Component{
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
        Alert.alert("Success", "Token created "+this.state.token);
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
       <StyleProvider style={getTheme(material)}>
      <View style={styles.maincontainer}>
      <HomeText screen = {this.state.screen} navigation={this.props.navigation}/>
      <Tabs  onChangeTab={({ i, ref, from }) => this.setState({ screen: i })} >
        <Tab heading={ <TabHeading><Icon name="ios-card" /><Text> Card Payments</Text></TabHeading>}>
        <Cardpay />
        </Tab>
        <Tab heading={ <TabHeading><Icon name="ios-home"/><Text> Bank Payments </Text></TabHeading>}  >
        <Bank/>
        </Tab>
        </Tabs>
      </View>
      </StyleProvider>


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
class HomeText extends Component{
    render(){
      if(this.props.screen===0){
        return(
          <Header hasTabs>
          <H1> Card Payments</H1>
          </Header>
        );
      }
      if(this.props.screen===1){
        return(
          <Header hasTabs>
            <H1> Bank Payments</H1>
           </Header>
        );
      }
      return(
        <Header hasTabs>
        <H1> Card Payments </H1>
        </Header>
      );
    }
  }
