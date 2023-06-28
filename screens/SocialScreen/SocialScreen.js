import React, { useEffect, useState,Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {CommunitiesTab} from './CommunitiesTab/CommunitiesTab'
import { firebase } from "../../assets/src/firebase/config";
import {NotificationsTab} from "./NotificationsTab/NotificationsTab"
import styles from './styles';

export default function SocialScreen({ navigation, userData} ) {


  const[currentTab,setCurrentTab] = useState("communitites")
  const[communities,setCommunities] = useState({})
  const[communityNames,setCommunityNames] = useState([])
  const socialRef = firebase.firestore().collection('users').doc(userData.id).collection('social').doc(userData.id)
  const[friends,setFriends] = useState({})
  const getCommunities =async () =>{

    const socialDoc = await socialRef.get();

    const socialInfo = socialDoc.data()

    setCommunities(socialInfo.communities)
    setCommunityNames(Object.keys(communities))

    console.log(communities)


  }


  
  useEffect(() => {
    getCommunities();
  },[]);

  return (
    <View style={styles.container}>

    <View style={styles.navContainer}> 

               

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setCurrentTab("communities")}>
                    <Text style={styles.buttonTitle}>Communities</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setCurrentTab("notifications")}>
                    <Text style={styles.buttonTitle}>Notifications</Text>
                </TouchableOpacity>

    </View>    

    { (currentTab=="communities"? <CommunitiesTab communityNames ={communityNames} communities={communities} userData={userData}/> : <NotificationsTab userData={userData}/>)}


    </View>
  );
}
