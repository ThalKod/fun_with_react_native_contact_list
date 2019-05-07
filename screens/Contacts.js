import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking
} from "react-native";

import ContactListItem from "../components/ContactListItem";

import { fetchContacts } from "../utils/api";
import { MaterialIcons } from '@expo/vector-icons';
import colors from "../utils/colors";

const keyExtractor = ({ phone }) => phone;

export default class Contacts extends React.Component {

  static navigationOptions = ({ navigation }) =>  ({
    title: 'Contacts',
    headerLeft: (
        <MaterialIcons
          name="menu"
          size={24}
          style={{ color: colors.black, marginLeft: 10 }}
          onPress={() => navigation.toggleDrawer()}
        />
    )
  });

  state = {
    contact: [],
    loading: true,
    error: false
  };

  componentDidMount = async () => {
    try {
      const contacts = await fetchContacts();
      this.setState({
        contacts,
        loading: false,
        error: false
      });

    }catch (e) {
      console.log(e);
      this.setState({
        loading: false,
        error: true
      });
    }

    Linking.addEventListener("url", this.handleOpenUrl);
    const url = await Linking.getInitialURL();
    this.handleOpenUrl({ url });
  };

  conponentDidUnmount = () => {
    Linking.removeEventListener('url', this.handleOpenUrl);
};

  handleOpenUrl = (event) => {
    const { navigation: { navigate }} = this.props;
    const { contact } = this.state;
    const { url } = event;
    const params = getURLParams(url);

    if(params.name){
        const queriedContacts = contact.find(c => {
          return c.name.split(" ")[0].toLowerCase() === params.name.toLowerCase();
        });

        if(queriedContacts){
          navigate("Profile", { id: queriedContacts.id })
        }
    }
  };

  renderContacts = ({ item }) => {
    const { navigation: { navigate } } = this.props;
    const { name, avatar, phone } = item;

    return <ContactListItem
              avatar={avatar}
              phone={phone}
              name={name}
              onPress={() => navigate("Profile", { contact: item })}
            />
  };

  render(){
    const { loading, contacts, error } = this.state;

    let contactSorted = [];
    if(contacts) {
      contactSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));
    }

    return (
        <View style={styles.container}>
          {loading && <ActivityIndicator size="large"/>}
          {error && <Text>Error...</Text>}
          {!loading &&
              !error && (
                  <FlatList
                    data={contactSorted}
                    KeyExtractor={keyExtractor}
                    renderItem={this.renderContacts}
                  />
              )
          }
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: 'center',
    flex:1
  }
});

