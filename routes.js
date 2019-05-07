
import React from "react";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';

import colors from "./utils/colors";

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from "./screens/Favorites";
import User from "./screens/User";
import Options from "./screens/Options";

const getTabBarIcon = icon => ({ tintColor }) => (
    <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const getDrawerIcon = icon => ({ tintColor }) => (
    <MaterialIcons name={icon} size={22} style={{ color: tintColor }} />
);


const ContactScreens = createStackNavigator({
  Contacts: Contacts,
  Profile: Profile,
},{
  initialRouteName: 'Contacts',
  navigationOptions: {
    // tabBarIcon: getTabBarIcon('list'),
    drawerIcon: getDrawerIcon("list"),
    headerStyle: {
      backgroundColor: colors.blue
    }
  },
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.blue
    }
  }
},);

const FavoritesScreens = createStackNavigator({
  Favorites: Favorites,
  Profile: Profile
}, {
  initialRouteName: "Favorites",
  navigationOptions: {
    // tabBarIcon: getTabBarIcon('star'),
    drawerIcon: getDrawerIcon("star"),
  },
  defaultNavigationOptions:{
    headerStyle: {
      backgroundColor: colors.blue
    }
  }
});

const UserScreens = createStackNavigator({
  User: User,
  Options: Options
},{
  initialRouteName: "User",
  navigationOptions: {
    // tabBarIcon: getTabBarIcon("person")
    drawerIcon: getDrawerIcon("person"),
  }
});

/* const stackNavigator =  createStackNavigator({
  Contacts: {
    screen: Contacts,
  },
  Profile: {
    screen: Profile,
  }
}, {
  initialRouteName: "Contacts",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.blue,
    },
  },
}); */

/* const TabNavigator = createBottomTabNavigator({
  Contacts: {
    screen: ContactScreens,
  },
  Favorites: {
    screen: FavoritesScreens,
  },
  User: {
    screen: UserScreens,
  },
}, {
  initialRouteName: 'Contacts',
  tabBarOptions: {
    style: {
      backgroundColor: colors.greyLight,
    },
    showLabel: false,
    showIcon: true,
    activeTintColor: colors.blue,
    inactiveTintColor: colors.greyDark,
  }
}); */

const DrawerNavigator = createDrawerNavigator({
  Contacts: ContactScreens,
  Favorites: FavoritesScreens,
  User: UserScreens,
},{
  initialRouteName: "Contacts"
});

export default createAppContainer(DrawerNavigator);
