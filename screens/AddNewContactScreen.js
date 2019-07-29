import React from 'react';
import { StyleSheet, Text, View, Keyboard, AsyncStorage, Alert, TouchableWithoutFeedback,ScrollView } from 'react-native';

import { Form, Item, Input, Label, Button } from 'native-base';
export default class AddNewContactScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: ""
    };
  }
  static navigationOptions = {
    title : "Contact Manager"
  };

  saveContact = async () => {
    if(
      this.state.fname !== "" &&
      this.state.lname !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.address !== "" 
    )
    {
      //create contact object
      var contact = {
        fname: this.state.fname,
      lname: this.state.lname,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address
      }
    await AsyncStorage.setItem( Date.now().toString(), JSON.stringify(contact) )
    .then(() => {
      this.props.navigation.goBack();
    })
    .catch(error => {
      console.log(error)
    })
    
    } 
    else {
      Alert.alert("All fields are required !")
    }

  }
  render() {
    return (
      
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss }} >
        <ScrollView style={styles.container}>
          <Form>
            <Item style={styles.InputItem}>
              <Label>First Name</Label>
              <Input 
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={ fname => this.setState({fname})}
              />

            </Item>
            <Item style={styles.InputItem}>
              <Label>Last Name</Label>
              <Input 
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={ lname => this.setState({lname})}
              />
              </Item>
              <Item style={styles.InputItem}>
              <Label>Phone</Label>
              <Input 
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={ phone => this.setState({phone})}
              />
              </Item>
              <Item style={styles.InputItem}>
              <Label>Email</Label>
              <Input 
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={ email => this.setState({email})}
              />
              </Item>
              <Item style={styles.InputItem}>
              <Label>Address</Label>
              <Input 
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={ address => this.setState({address})}
              />
              </Item>
          </Form>
          <Button
          style={styles.button}
          full
          rounded
          onPress={ () => {
            this.saveContact();
          }}>
            <Text style={styles.buttonText}>Save</Text>
          </Button>
          <Text style={styles.empty}></Text>

        
      </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    height: 500
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 400,
    backgroundColor: "#FFF"
  }
});
