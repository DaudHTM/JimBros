import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { firebase } from '../../assets/src/firebase/config'
import {AddExerciseModal} from "./addExerciseModal/addExerciseModal"
import {ViewWorkoutHistory} from "./viewWorkoutHistory/viewWorkoutHistory"

export default function PrScreen({ navigation, userData }) {
  const uid = userData.id
  const prRef = firebase.firestore().collection('users').doc(uid).collection('pr')
  const [toggleModal, setToggleModal] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState(false);

  const [log1, setLog1] = useState("Log 1");
  const [log2, setLog2] = useState("Log 2");
  const [log3, setLog3] = useState("Log 3");

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await prRef.orderBy("timestamp", "desc").limit(3).get();
      const documents = snapshot.docs;
      if (documents.length > 0) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        setLog1("You worked out on " + documents[0].data().timestamp.toDate().toLocaleDateString(undefined, options));
      } else {
        setLog1("Add more workouts to see your progress!");
        setLog2("Add more workouts to see your progress!");
        setLog3("Add more workouts to see your progress!");
      }
  
      if (documents.length > 1) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        setLog2("You worked out on " + documents[1].data().timestamp.toDate().toLocaleDateString(undefined, options));
      } else {
        setLog2("Add more workouts to see your progress!");
        setLog3("Add more workouts to see your progress!");
      }

      if (documents.length > 2) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        setLog3("You worked out on " + documents[2].data().timestamp.toDate().toLocaleDateString(undefined, options));
      } else {
        setLog3("Add more workouts to see your progress!");
      }
    };
    fetchData();
  }, []);
  

  const toggleModalFunction = () => {
    setToggleModal(!toggleModal);
  }

  const showWorkouts = () => {
    setWorkoutHistory(!workoutHistory);
  }

  return (
    <View style={styles.screenContainer}>
    {toggleModal ? <AddExerciseModal userData={userData} closeModal={toggleModalFunction}/> : null}
    {workoutHistory ? <ViewWorkoutHistory userData={userData} closeModal={showWorkouts} prData={prRef}/> : null}
    <TouchableOpacity style={styles.logButton} onPress={toggleModalFunction}>
      <Text style={styles.logButtonText}>📝 Log Workout</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.modalContainer} onPress={showWorkouts}>
      <Text style={styles.modalTitle}>Workout Log</Text>
      <Text style={styles.modalText}>
        {log1}{'\n'}{log2}{'\n'}{log3}{'\n'}
        Click to read more...
      </Text>
    </TouchableOpacity>

    <View style={styles.graphContainer}>{/* Add your square graph component here */}</View>
    </View>
  )
}


