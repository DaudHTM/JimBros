import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export default function HomeScreen({ navigation, userData} ) {
  const onPrBtnClick = () => {
 
    navigation.navigate('PRs');
    
  };




  return (
    <View>
      <Text>{JSON.stringify(userData)}</Text>
      
    </View>
  );
}
