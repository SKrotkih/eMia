import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'native-base';
import {color} from '../../theme/styles';

import {DrawerContent} from './DrawerContent';

import Home from '../Home/Home';
import EditProfile from '../Settings/EditProfile';
import PostPreview from '../Home/PostPreview';
import AddNewPost from '../Home/AddNewPost';
import Options from '../Home/Options';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function toggleDrawer(props) {
  props.navigation.toggleDrawer();
}

function Root(props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: color.brand,
        },
        headerTintColor: color.white,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'normal',
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'eMia-React Native',
          headerLeft: () => (
            <Icon
              style={{color: color.white, marginLeft: 8}}
              name={'ios-menu'}
              onPress={() => {
                toggleDrawer(props);
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="PostPreview"
        component={PostPreview}
        options={{title: ''}}
      />
      <Stack.Screen
        name="AddNewPost"
        component={AddNewPost}
        options={{title: 'New Post'}}
      />
      <Stack.Screen name="Options" component={Options} options={{title: 'Filter'}} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{title: 'My Profile'}}
      />
    </Stack.Navigator>
  );
}

export function homeNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Root" component={Root} />
    </Drawer.Navigator>
  );
}

export default function mainNavigation() {
  return <NavigationContainer>{homeNavigator()}</NavigationContainer>;
}