import React, { useState, useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from "./style";
import TimestampWorkoutHistory from "./timestampWorkoutHistory/TimestampWorkoutHistory";
import { firebase } from '../../../assets/src/firebase/config';

export default function ViewWorkoutHistory({ userData, closeModal, prData }) {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const timestamps = Object.keys(prData);
        setWorkoutHistory(timestamps);
      } catch (error) {
        console.log("Error fetching workout history:", error);
      }
    };

    fetchData();
  }, []);

  const handleWorkoutItemPress = (timestamp) => {
    setSelectedTimestamp(timestamp);
  };

  const handleCloseTimestampWorkoutHistory = () => {
    setSelectedTimestamp(null);
  };

  return (
    <View style={styles.container}>
      {selectedTimestamp && (
        <TimestampWorkoutHistory
          userData={userData}
          closeModal={handleCloseTimestampWorkoutHistory}
          timestamp={selectedTimestamp}
          prData={prData}
        />
      )}
      <TouchableOpacity style={styles.backButton} onPress={closeModal}>
        <Text style={styles.backButtonText}>🏠</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Workout Days</Text>
      <View style={styles.workoutList}>
        {workoutHistory.map((timestamp, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.workoutItem,
              index % 2 === 0 ? styles.workoutItemEven : styles.workoutItemOdd
            ]}
            onPress={() => handleWorkoutItemPress(timestamp)}>
            <Text style={styles.workoutItemText}>{timestamp}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export { ViewWorkoutHistory };
