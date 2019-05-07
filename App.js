import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import AppNavigator from "./routes";

export default class App extends React.Component {
  render() {
    /*return (
      <View style={styles.container}>
        <Text>Hello Thal !</Text>
      </View>
    );*/

    // return <Contacts />;
    // return <Profile/>;

    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
