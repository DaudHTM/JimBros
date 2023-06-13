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


  useEffect(() => {
 
    prRef

      .onSnapshot(
        querySnapshot => {
          const newEntities = []
          querySnapshot.forEach(doc => {
            newEntities.push(doc.data())
            alert(doc.data().id)
          })
          setPrArr(newEntities)
        },
        error => {
          console.log(error)
        }
      )
  }, [])

  return (
    <View style={styles.screenContainer}>
    {toggleModal ? <AddExerciseModal userData={userData}/> : null}
    <TouchableOpacity style={styles.logButton} onPress={toggleModalFunction}>
      <Text style={styles.logButtonText}>📝 Log Workout</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.addPrButton}>
      <Text style={styles.addPrButtonText}>🏅 Add PR!</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.modalContainer} onPress={() => alert('To be added')}>
      <Text style={styles.modalTitle}>Workout Log</Text>
      <Text style={styles.modalText}>
        You hit 5x10 deadlifts of 225
        {'\n'}
        You did 3x10 squats of 135
        {'\n'}
        You hit a new PR! 🔥
        {'\n'}
        Click to read more...
      </Text>
    </TouchableOpacity>

    <View style={styles.graphContainer}>{/* Add your square graph component here */}</View>
    </View>
  )
}


