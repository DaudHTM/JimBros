import React, { useState, useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { firebase } from "../../assets/src/firebase/config";
import { AddExerciseModal } from "./addExerciseModal/addExerciseModal";
import { ViewWorkoutHistory } from "./viewWorkoutHistory/viewWorkoutHistory";

export default function PrScreen({ navigation, userData }) {
  const uid = userData.id;
  const prRef = firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("pr");
  const [toggleModal, setToggleModal] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState(false);
  const [workoutData, setWorkoutData] = useState({});
  const [log1, setLog1] = useState("Log 1");
  const [log2, setLog2] = useState("Log 2");
  const [log3, setLog3] = useState("Log 3");

  const fetchData = async () => {
    const currentDate = new Date();

    const currentDocId = `${
      currentDate.getMonth() + 1
    },${currentDate.getFullYear()}`;

    const workoutsRef = firebase
      .firestore()
      .collection("users")
      .doc(userData.id)
      .collection("workouts");

    const workoutsSnapshots = await workoutsRef.doc(currentDocId).get();

    if (workoutsSnapshots.exists) {
      setWorkoutData(workoutsSnapshots.data());
    } else {
      workoutsRef.doc(currentDocId).set({});
      setWorkoutData({});
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [workoutData]);

  const updateWorkout = (newData) => {
    setWorkoutData(newData);
  };

  const toggleModalFunction = () => {
    setToggleModal(!toggleModal);
  };

  const showWorkouts = () => {
    setWorkoutHistory(!workoutHistory);
  };

  return (
    <View style={styles.screenContainer}>
      {toggleModal ? (
        <AddExerciseModal
          userData={userData}
          closeModal={toggleModalFunction}
          workoutData={workoutData}
          updateWorkout={updateWorkout}
        />
      ) : null}
      {workoutHistory ? (
        <ViewWorkoutHistory
          userData={userData}
          closeModal={showWorkouts}
          prData={workoutData}
        />
      ) : null}
      <TouchableOpacity style={styles.logButton} onPress={toggleModalFunction}>
        <Text style={styles.logButtonText}>📝 Log Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.modalContainer} onPress={showWorkouts}>
        <Text style={styles.modalTitle}>Workout Log</Text>
        <Text style={styles.modalText}>
          {log1}
          {"\n"}
          {log2}
          {"\n"}
          {log3}
          {"\n"}
          Click to read more...
        </Text>
      </TouchableOpacity>

      <View style={styles.graphContainer}>
        {/* Add your square graph component here */}
      </View>
    </View>
  );
}
