import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MainScreen from '../screens/MainScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolictyScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

export type RootStackParamList = {
  Main: undefined;
  Policy: undefined;
  Statistics: undefined;

  Settings: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Main"
        options={{headerShown: false}}
        component={MainScreen}
      />
      <RootStack.Screen
        name="Policy"
        options={{headerShown: true}}
        component={PrivacyPolicyScreen}
      />
      <RootStack.Screen
        name="Settings"
        options={{headerShown: false}}
        component={SettingsScreen}
      />
      <RootStack.Screen
        name="Statistics"
        options={{headerShown: false}}
        component={StatisticsScreen}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
