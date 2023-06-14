import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { firebase } from '../../assets/src/firebase/config'
import {AddExerciseModal} from "./addExerciseModal/addExerciseModal"

export default function PrScreen({ navigation, userData }) {
  const [prArr, setPrArr] = useState([])
  const uid = userData.id
  const prRef = firebase.firestore().collection('users').doc(uid).collection('pr')
  const [toggleModal,setToggleModal] = useState(false);


  const toggleModalFunction = () => {
    setToggleModal(!toggleModal);
  }


 

  return (
    <View style={styles.screenContainer}>
      

{toggleModal ? <AddExerciseModal userData={userData}/> : null}
      

   
      <TouchableOpacity style={styles.addExerciseButton} onPress={toggleModalFunction}><Text>Add Exercise</Text></TouchableOpacity>

    <View style={styles.graphContainer}>{/* Add your square graph component here */}</View>
    </View>
  )
}


