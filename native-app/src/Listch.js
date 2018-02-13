import React, { Component } from 'react';
import {Container, Header, Left, Right, Content, Body, Thumbnail, Title,
        Icon, Button, Card, CardItem  } from 'native-base';
import { Image, Dimensions, TouchableHighlight, View, ActivityIndicator, ListView, Text} from 'react-native';
import {AppLoading } from 'expo';
const cluster = require('./../cluster.json');
export default class Cardpay extends Component{
  static navigationOptions={
    title: 'Last 10 Payments',
  }
  state = {
     isLoading: true,
   };
   componentDidMount() {

   return fetch('https://data.'+cluster.name+'.hasura-app.io/v1/query', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       "type": "select",
       "args": {
           "table": "transactions",
           "columns": [
               "*"
           ],
           "where": {
               "user": {
                   "$like": this.props.screenProps.user
               }
           }
       }
     })

   })
   .then((response) => response.json())
   .then((responseJson) => {
     console.log(responseJson);
   let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   this.setState({
     isLoading: false,
     dataSource: ds.cloneWithRows(responseJson),
   }, function() {});
   })
   .catch((error) => {
     console.error(error);
   });
 }
  render(){
    if (this.state.isLoading) {
  return (
    <View style={{flex: 1, paddingTop: 20}}>
    <ActivityIndicator />
    </View>
  );
}
else{
  return (
    <Container>
      <ListView
      dataSource={this.state.dataSource}
      style={{paddingRight: 10,}}
      renderRow={(rowData) =>
          <Card style={{flex: 1}}>
            <CardItem>
              <Left>
              <Text>Transaction id: </Text>
              <Text note>{rowData.transaction_id}</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
              <Text>Amount: </Text>
              <Text note>{rowData.amount} {rowData.currency}</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
              <Text>Message : </Text>
              <Text note>{rowData.mes} </Text>
              </Left>
            </CardItem>
          </Card>
      }
      />
    </Container>);

}
  }
}
