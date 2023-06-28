import React, { useEffect, useState,Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default function CommunitiesTab({ navigation, userData,communities,communityNames} ) {

  const [activeCommunity,setActiveCommunity] = useState('')

  const CommunititesIcon = (name) =>{

    const toggleCommunity = () =>{
      setActiveCommunity(communities.name)
    
    }


    return(
      <TouchableOpacity onPress={()=>toggleCommunity()} style={{height:80,width:'100%',backgroundColor:'grey',paddingLeft:20,marginBottom:10,flexDirection:'row',justifyContent:'center',
      alignItems:'center',}}>
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>

<Text>Communitites</Text>

<View style={styles.container}>
  {communityNames.map(name =>CommunititesIcon(name))}
</View>

    

    </View>
  );
}

export {CommunitiesTab}