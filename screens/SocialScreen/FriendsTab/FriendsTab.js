import React, { useEffect, useState, Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../../assets/src/firebase/config'
export default function FriendsTab({ navigation, userData} ) {

const[toggleAddFriendModal,setAddFriendModal] = useState(false);
const[allFriends,setAllFriends] = useState([])


const getFriends = () => {
    const userRef = firebase.firestore().collection('users');
    const myId = userData.id;
    const friendUsernames = [];
    userRef
      .doc(myId)
      .collection('social')
      .where('status', '==', 'approved')
      .get()
      .then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.fromId === myId) {
            friendUsernames.push(data.toUser);
          } else {
            friendUsernames.push(data.fromUser);
          }
        });
     
        setAllFriends(friendUsernames)
        // You can set the retrieved friend usernames to the component state or use them as needed
      })
      .catch((error) => {
        alert(error);
      });

  
  };

useEffect(() => {


    getFriends();
  
    }, []);

const AddFriendModal=()=>{
const[friendUsername,setFriendUsername] =useState('')

const addFriend=()=>{

    const userRef = firebase.firestore().collection('users')
    const myId=userData.id
    userRef
    .doc(myId)
    .collection('social')
    .where('fromUser', '==', friendUsername)
    .where('status', '==', 'pending')
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {

        const friendRequestDoc = querySnapshot.docs[0];
        const friendRequestId = friendRequestDoc.id;

        userRef
          .doc(myId)
          .collection('social')
          .doc(friendRequestId)
          .update({ status: 'approved' })
          .then(() => {
            alert('Friend request approved');
          })
          .catch((error) => {
            alert(error);
          });


      
        userRef
          .doc(friendRequestId)
          .collection('social')
          .doc(myId)
          .update({ status: 'approved' })
          .then(() => {

          })
          .catch((error) => {
            alert(error);
          });
      } else {
   
        userRef
          .where('username', '==', friendUsername)
          .get()
          .then((querySnapshot) => {
            
  
                if (!querySnapshot.empty && userData.username!=friendUsername ) {
                    const friendId = querySnapshot.docs[0].id;
                    const myId =userData.id;

                    const myRequestData={
                        fromId:myId,
                        toId:friendId,
                        fromUser:userData.username,
                        toUser:friendUsername,
                        status:"pending"
                    }
                    

                    userRef.doc(myId).collection('social').doc(friendId).set(myRequestData).then(()=>{})                    
                    .catch((error) => {
                        alert(error)
        
                    });

                    userRef.doc(friendId).collection('social').doc(myId).set(myRequestData).then(()=>{alert("request sent")})                    
                    .catch((error) => {
                        alert(error)
        
                    });

                    

                }
                    
                else{


                    alert('Username does not exist');
                    return;}

                });
            }
          });
      
        setAddFriendModal(false);
        
      };

      


    return(
        <View style={styles.addFriendModal}>
<Text style={styles.addFriendHeader}>Add Friend</Text>

<TextInput
    style={styles.input}
    placeholder='Username'
    placeholderTextColor="#aaaaaa"
    onChangeText={(text) => setFriendUsername(text)}
    value={friendUsername}
    underlineColorAndroid="transparent"
    autoCapitalize="none"
/>


<TouchableOpacity
                    style={[styles.button,styles.addFriend]}
                    onPress={() => addFriend()}>
                    <Text style={styles.buttonTitle}>Add Friend!</Text>
                </TouchableOpacity>


        </View>

    );
}


  return (
    <View style={styles.container}>


{toggleAddFriendModal?<AddFriendModal/>:null}
    
    <TouchableOpacity onPress={()=>setAddFriendModal(!toggleAddFriendModal)} style={styles.addFriendBtn}><MaterialCommunityIcons name="account-plus" color={'black'} size={45} /></TouchableOpacity>
  


    <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="always">



    <Text>Friends</Text>

    {allFriends.map((friend, index) => (
          <Text key={index}>{friend}</Text>
        ))}
    



</KeyboardAwareScrollView>
    </View>
  );
}

export {FriendsTab}