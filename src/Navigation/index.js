import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Detail, HomePage, Page1, Page2, Page3, Page4} from 'pages';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={MainNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="detail"
        component={Detail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#FEA300',
        inactiveTintColor: '#FFFFFF',
        style: {
          backgroundColor: '#8A0014',
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let text;
          let icon;
          if (route.name === 'homeStack') {
            text = 'HOME';
            icon = 'home';
          } else if (route.name === 'page1') {
            text = 'CART';
            icon = 'shopping-cart';
          } else if (route.name === 'page2') {
            icon = 'camera';
          } else if (route.name === 'page3') {
            text = 'PROFILE';
            icon = 'user';
          } else if (route.name === 'page4') {
            text = 'SEARCH';
            icon = 'search';
          }
          return (
            <View style={{marginVertical: 10}}>
              <Icon
                name={icon}
                size={24}
                color={color}
                style={{alignSelf: 'center'}}
              />
              <Text style={styles.textTab}>{text}</Text>
            </View>
          );
        },
      })}>
      <Tab.Screen name="homeStack" component={HomeStack} />
      <Tab.Screen name="page1" component={Page1} />
      <Tab.Screen name="page2" component={Page2} />
      <Tab.Screen name="page3" component={Page3} />
      <Tab.Screen name="page4" component={Page4} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  textTab: {
    marginVertical: 1,
    fontWeight: 'normal',
    color: '#FFFFFF',
    fontSize: 10,
  },
});
