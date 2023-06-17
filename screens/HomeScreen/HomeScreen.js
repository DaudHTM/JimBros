import React,{useState,useEffect,Component} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';

export default function HomeScreen({ navigation, userData }) {


  const Notification = () =>{
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.notification}>
        <Text style={styles.notificationText}> 💪 Welcome back, {userData["fullName"]} </Text>
        <Text style={styles.getStartedText}>Suggestion of the Day: <Text style={styles.suggestionText}>hit a new PR!</Text></Text>
      </View>
    </View>
  );
}
