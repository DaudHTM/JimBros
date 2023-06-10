import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { firebase } from '../../assets/src/firebase/config';

import { useNavigation } from '@react-navigation/native';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function AccountScreen({ navigation, userData,signOut }) {
  

  return (
    <View>
      <CustomButton title="Sign Out" onPress={signOut} />
    </View>
  );
}