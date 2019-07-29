import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Linking, Platform, Alert, AsyncStorage } from 'react-native';
import { Card, CardItem } from 'native-base';
import{ Entypo } from "@expo/vector-icons";


export default class ViewContactScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      fname: " ",
      lname: " ",
      phone: " ",
      email: " ",
      address: " ",
      key: " "
    };
  }
  static navigationOptions = {
    title : "Contact Manager"
  };

  componentDidMount(){
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      var key = this.props.navigation.getParam("key", "");
      //call a method to use key
      this.getContact(key);
    });
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
    .then(contactjsonString => {
      var contact = JSON.parse(contactjsonString);
      contact["key"] = key;
      this.setState(contact);
    })
    .catch(error => {
      console.log(error);
    });

  };

  

  editContact = (key) => {
    this.props.navigation.navigate("Edit", {key: key});
  };

  deleteContact = key => {
    Alert.alert(
    "Delete Contact ?",
    `${this.state.fname} ${this.state.lname}`,
    [
       {
         text: "Cancel", onPress: () => console.log("cancel tapped")
       },
       {
         text: "OK", 
         onPress: async () => {
           await AsyncStorage.removeItem(key)  //HERE WE PASS KEY TO DELETE 
           .then( () => {
             this.props.navigation.goBack();
           })
           .catch( error => {
             console.log(error)
           })
         }
       }
    
    ]

    )
  }


  callAction = phone => {
    let phoneNumber = phone;
    if(Platform.OS !== "android")
    {
      phoneNumber = `telprompt:${phone}`;

    }
    else{
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if(!supported)
      {
        Alert.alert("Phone number is not available");
      }
      else{
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  smsAction = phone => {
    let phoneNumber = phone;
    phoneNumber = `sms:${phone}`;
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if(!supported)
      {
        Alert.alert("Phone number is not available");bbb
      }
      else{
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.topContainer}>
        <View style={styles.contactIconContainer}>
          <Text style={styles.contactIcon}>
            {
             this.state.fname[0].toUpperCase()
            }
          </Text>
          </View>

          <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {this.state.fname} {this.state.lname}
          </Text>
          </View>

          <View style={styles.actContainer}>
          <View style={styles.smsIcon}>       
          <TouchableOpacity 
          onPress= { () => {
            this.smsAction(this.state.phone);
          }}>

            <Entypo name="message" size={40} color= "#fff"  />

          </TouchableOpacity>
          </View>

          <View style={styles.phoneIcon}>

      
          <TouchableOpacity 
          onPress= { () => {
            this.callAction(this.state.phone);
          }}>

            <Entypo name="phone" size={40} color= "#fff" />

          </TouchableOpacity>
          </View>
          
               </View>
        
        
        </View>


      <View style={styles.infoContainer}>
        <Card>
          <CardItem bordered>
            <Text style={styles.infoText}>Phone</Text>
            </CardItem>
            <CardItem bordered>
              <Text  style={styles.infoText}>{this.state.phone} </Text>
            </CardItem>
        </Card>
        <Card>
          <CardItem bordered>
            <Text style={styles.infoText}>Email</Text>
            </CardItem>
            <CardItem bordered>
              <Text  style={styles.infoText}>{this.state.email} </Text>
            </CardItem>
        </Card>
        <Card>
          <CardItem bordered>
            <Text style={styles.infoText}>Address</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.address}</Text>
            </CardItem>
        </Card>
      
      </View>
  
<View style={styles.bottomContainer}>
      <View style={styles.editButtonContainer}>
          
          <TouchableOpacity  style={styles.floatButton}
          onPress= { () => {
            this.editContact(this.state.key);
          }}>

            <Entypo name="edit" size={30} color= "#fff"  />

          </TouchableOpacity>
          
          </View>
          <View style={styles.deleteButtonContainer}>
          
          <TouchableOpacity  style={styles.floatButton}
          onPress= { () => {
            this.deleteContact(this.state.key);
          }}>

            <Entypo name="trash" size={30} color= "#fff"  />

          </TouchableOpacity>
          
          </View>
</View>

        
      
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  topContainer:{
    flexDirection: "row",
    paddingLeft: 30,
    backgroundColor: "#B83227",
    height:180,
    paddingTop: 25

  },
  contactIconContainer: {
    width:95,
    height: 95,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 15,
  },
  contactIcon: {
    fontSize: 75,
    fontWeight: "500",
    color: "#B83227",
    //paddingLeft : 10
    paddingBottom:8
    
  },
  nameContainer: {
   width: "100%",
   // height: 70,
   // padding: 10,
    //backgroundColor: "rgba(255,255,255,0.5)",
    //justifyContent: "center",
    //position: "absolute",
    bottom: 0,
    flexDirection: "column",
    paddingLeft: 30,
    paddingTop: 17,
  },
  name: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  infoContainer: {
    flexDirection: "column"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  },
  actContainer: {
    flexDirection: "row",
    paddingLeft: 140,
    position: "absolute",
    margin: 30,
    paddingTop: 60
   },
   smsIcon: {
     paddingRight: 55
   },
   phoneIcon: {
    paddingRight: 5
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 80,
    backgroundColor: "#B83227",
    borderRadius: 100
  },
  editButtonContainer:{
    bottom:0,
    right:240,
    flexDirection: "row",
    position:"absolute",
    
  },
  deleteButtonContainer:{
    bottom:0,
    right:55,
    flexDirection: "row",
    position:"absolute",
    
  },
  bottomContainer:{
    flexDirection: "row",
    paddingLeft: 30,
    backgroundColor: "#fff",
    height:80,
    paddingTop: 80,
    marginTop: 30,
    
  }
  
  
  

});