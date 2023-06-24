import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import styles from "./style";
import { firebase } from '../../../../assets/src/firebase/config';
import ExerciseInfo from './exerciseInfo/ExerciseInfo';

export default function TimestampWorkoutHistory({ userData, closeModal, timestamp, prData }) {
  const [workoutData, setWorkoutData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {

   


   
           const workouts=prData[timestamp];
          
        

        if (workouts.length > 0) {
          setWorkoutData(workouts);
        }
      } catch (error) {
        console.log("Error fetching workout data:", error);
      }
    };

    fetchWorkoutData();
  }, [timestamp, prData]);

  const handleExerciseItemPress = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleCloseExerciseInfo = () => {
    setSelectedExercise(null);
  };

  const handleBackButtonPress = () => {
    if (selectedExercise) {
      handleCloseExerciseInfo();
    } else {
      closeModal();
    }
  };

  return (
    <View style={styles.container}>
      {selectedExercise && (
        <ExerciseInfo
          userData={userData}
          closeModal={handleCloseExerciseInfo}
          exerciseData={selectedExercise}
        />
      )}
      <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Exercises</Text>
      <View style={styles.exerciseList}>
        {workoutData.map((workout, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.exerciseItem,
              index % 2 === 0 ? styles.exerciseItemEven : styles.exerciseItemOdd
            ]}
            onPress={() => handleExerciseItemPress(workout)}
          >
            <Text style={styles.exerciseItemText}>{workout.exercise}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export { TimestampWorkoutHistory };
