import React from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import styles from "./style";
import { firebase } from '../../../../../assets/src/firebase/config';

export default function ExerciseInfo({ userData, closeModal, exerciseData }) {
  const setsArray = Object.values(exerciseData.sets);

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseTitle}>{exerciseData.exercise}</Text>
      <View style={styles.setsContainer}>
        {setsArray.map((set, index) => (
          <View
            key={index}
            style={[
              styles.setContainer,
              index % 2 === 0 ? styles.setContainerEven : styles.setContainerOdd
            ]}
          >
            <Text style={styles.setText}>Set #{index + 1} | Reps: {set.reps} | Weight: {set.weight} lbs</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export { ExerciseInfo };
