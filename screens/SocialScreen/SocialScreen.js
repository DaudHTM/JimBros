import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {CommunitiesTab} from './CommunitiesTab/CommunitiesTab'
import {FriendsTab} from './FriendsTab/FriendsTab'
import {NotificationsTab} from "./NotificationsTab/NotificationsTab"
import styles from './styles';

export default function SocialScreen({ navigation, userData} ) {


  const[currentTab,setCurrentTab] = useState("friends")

  return (
    <View style={styles.container}>

    <View style={styles.navContainer}> 

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setCurrentTab("friends")}>
                    <Text style={styles.buttonTitle}>Friends</Text>
                </TouchableOpacity>

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

    {currentTab=="friends"? <FriendsTab userData={userData} /> : (currentTab=="communities"? <CommunitiesTab userData={userData}/> : <NotificationsTab userData={userData}/>)}


    </View>
  );
}
