import React, { Component } from 'react'
import { View, Text,  Alert, Button, TextInput, TouchableOpacity, Platform, Dimensions,
   Image, StyleSheet,} from 'react-native';
import {Card, CardItem, Thumbnail, H1, Container} from 'native-base';
import { StackNavigator } from 'react-navigation';
import Cardpay from './Cardpay';
import Bank from './Bank';
import Listch from './Listch';
export default class Home extends Component{
  render(){
    return <Navigator screenProps={this.props} />;
  }
}
class HomeScreen extends Component {
  static navigationOptions={
    title: 'Stripe Pay',
  }
  render() {
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
        <H1 style ={{justifyContent: 'center',  alignItems: 'center', paddingLeft: 10}}>Welcome to Stripe-pay </H1>
        </View>
        <View>
        <Image source={require('./images/stripe.png')} style={{ width: Dimensions.get('window').width-10, flex: 0}}/>
        </View>
        <View style={{flex: 2}}>
      <Card style={{width: (Dimensions.get('window').width-50), flex:0, }}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Cardpay')}>
      <View style={{height: 50, backgroundColor: 'purple',justifyContent: 'center',
      alignItems: 'center',}}>
      <Text style={{
        fontSize: 20,
        color: '#FFFFFF',
      }}> Pay via  card</Text></View>
      </TouchableOpacity>
      </Card>

      <Card style={{width: (Dimensions.get('window').width-50), flex:0, }}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Bankpay')}>
      <View style={{height: 50, backgroundColor: 'purple',justifyContent: 'center',
      alignItems: 'center',}}>
      <Text style={{
        fontSize: 20,
        color: '#FFFFFF',
      }}>Pay via Bank </Text></View>
      </TouchableOpacity>
      </Card>
      <Card style={{width: (Dimensions.get('window').width-50), flex:0, }}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Listch')}>
      <View style={{height: 50, backgroundColor: 'purple',justifyContent: 'center',
      alignItems: 'center',}}>
      <Text style={{
        fontSize: 20,
        color: '#FFFFFF',
      }}>Last 10 Transactions  </Text></View>
      </TouchableOpacity>
      </Card>
      </View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
      }}>
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
const Navigator = StackNavigator({
Main: { screen: HomeScreen },
Cardpay: {screen: Cardpay},
Bankpay: {screen: Bank},
Listch: {screen: Listch},
});
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
