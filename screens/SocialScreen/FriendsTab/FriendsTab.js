import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../../assets/src/firebase/config';

export default function FriendsTab({ navigation, userData }) {
  const [toggleAddFriendModal, setAddFriendModal] = useState(false);
  const [allFriends, setAllFriends] = useState([]);

  const getFriends = async () => {
    try {
      const userRef = firebase.firestore().collection('users');
      const myId = userData.id;
      const friendUsernames = [];

      const querySnapshot = await userRef
        .doc(myId)
        .collection('social')
        .where('status', '==', 'approved')
        .get();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.fromId === myId) {
          friendUsernames.push(data.toUser);
        } else {
          friendUsernames.push(data.fromUser);
        }
      });

      setAllFriends(friendUsernames);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  const addFriend = async (friendUsername) => {
    try {
      const userRef = firebase.firestore().collection('users');
      const myId = userData.id;
  
      const querySnapshot = await userRef
        .doc(myId)
        .collection('social')
        .where('fromUser', '==', friendUsername)
        .where('status', '==', 'pending')
        .get();
  
      if (!querySnapshot.empty) {
        const friendRequestDoc = querySnapshot.docs[0];
        const friendRequestId = friendRequestDoc.id;
  
        const batch = firebase.firestore().batch();
        const myRequestRef = userRef.doc(myId).collection('social').doc(friendRequestId);
        const friendRequestRef = userRef.doc(friendRequestId).collection('social').doc(myId);
  
        batch.update(myRequestRef, { status: 'approved' });
        batch.update(friendRequestRef, { status: 'approved' });
  
        await batch.commit();
        alert('Friend request approved');
      } else {
        const friendQuerySnapshot = await userRef
          .doc(myId)
          .collection('social')
          .where('toUser', '==', friendUsername)
          .where('status', '==', 'pending')
          .get();
  
        if (!friendQuerySnapshot.empty && userData.username !== friendUsername) {
          const friendRequestDoc = friendQuerySnapshot.docs[0];
          const friendRequestId = friendRequestDoc.id;
  
          const batch = firebase.firestore().batch();
          const myRequestRef = userRef.doc(myId).collection('social').doc(friendRequestId);
          const friendRequestRef = userRef.doc(friendRequestId).collection('social').doc(myId);
  
          batch.update(myRequestRef, { status: 'approved' });
          batch.update(friendRequestRef, { status: 'approved' });
  
          await batch.commit();
          alert('Friend request approved');
        } else {
          const querySnapshot = await userRef.where('username', '==', friendUsername).get();
  
          if (!querySnapshot.empty && userData.username !== friendUsername) {
            const friendId = querySnapshot.docs[0].id;
  
            const myRequestData = {
              fromId: myId,
              toId: friendId,
              fromUser: userData.username,
              toUser: friendUsername,
              status: 'pending',
            };
  
            const friendRequestData = {
              fromId: friendId,
              toId: myId,
              fromUser: friendUsername,
              toUser: userData.username,
              status: 'pending',
            };
  
            const batch = firebase.firestore().batch();
            const myRequestRef = userRef.doc(myId).collection('social').doc(friendId);
            const friendRequestRef = userRef.doc(friendId).collection('social').doc(myId);
  
            batch.set(myRequestRef, myRequestData);
            batch.set(friendRequestRef, friendRequestData);
  
            await batch.commit();
            alert('Friend request sent');
          } else {
            alert('Username does not exist');
          }
        }
      }
  
      setAddFriendModal(false);
    } catch (error) {
      alert(error);
    }
  };
  

  const AddFriendModal = () => {
    const [friendUsername, setFriendUsername] = useState('');

    return (
      <View style={styles.addFriendModal}>
        <Text style={styles.addFriendHeader}>Add Friend</Text>

        <TextInput
          style={styles.input}
          placeholder='Username'
          placeholderTextColor='#aaaaaa'
          onChangeText={(text) => setFriendUsername(text)}
          value={friendUsername}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />

        <TouchableOpacity
          style={[styles.button, styles.addFriend]}
          onPress={() => addFriend(friendUsername)}
        >
          <Text style={styles.buttonTitle}>Add Friend!</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {toggleAddFriendModal ? <AddFriendModal /> : null}

      <TouchableOpacity
        onPress={() => setAddFriendModal(!toggleAddFriendModal)}
        style={styles.addFriendBtn}
      >
        <MaterialCommunityIcons name='account-plus' color='black' size={45} />
      </TouchableOpacity>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps='always'
      >
        <Text>Friends</Text>

        {allFriends.map((friend, index) => (
          <Text key={index}>{friend}</Text>
        ))}
      </KeyboardAwareScrollView>
    </View>
  );
}

export { FriendsTab };
