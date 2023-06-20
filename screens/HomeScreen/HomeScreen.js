import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styles from './styles';
import { firebase } from '../../assets/src/firebase/config';

export default function HomeScreen({ navigation, userData }) {
  const prRef = firebase.firestore().collection('users').doc(userData.id).collection('pr');
  const [markedDates, setMarkedDates] = useState({});
  const [gymStreak, setGymStreak] = useState(0);

  useEffect(() => {
    const fetchWorkoutDates = async () => {
      try {
        const prSnapshots = await prRef.get();
        const workoutDates = prSnapshots.docs.map((doc) => {
          const timestamp = doc.data().timestamp;
          return timestamp.toDate().toISOString().split('T')[0];
        });
        const uniqueWorkoutDates = [...new Set(workoutDates)];
        const sortedWorkoutDates = uniqueWorkoutDates.sort();
  
        let streakCounter = 0;
        let currentStreak = 0;
  
        sortedWorkoutDates.forEach((date, index) => {
          if (index === 0) {
            streakCounter = 1;
            currentStreak = 1;
          } else {
            const currentDate = new Date(date);
            const previousDate = new Date(sortedWorkoutDates[index - 1]);
  
            currentDate.setDate(currentDate.getDate() - 1);
  
            if (currentDate.toISOString().split('T')[0] === previousDate.toISOString().split('T')[0]) {
              streakCounter++;
            } else {
              streakCounter = 1;
            }
  
            if (streakCounter > currentStreak) {
              currentStreak = streakCounter;
            }
          }
        });
  
        const updatedMarkedDates = {};
        uniqueWorkoutDates.forEach((date) => {
          updatedMarkedDates[date] = { marked: true, dots: [{ key: 'orange', color: '#DB4914' }] };
        });
  
        setMarkedDates(updatedMarkedDates);
        setGymStreak(currentStreak);
      } catch (error) {
        console.log('Error fetching workout dates:', error);
      }
    };  

    fetchWorkoutDates();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.notification}>
        <Text style={styles.notificationText}> 💪 Welcome back, {userData['fullName']} </Text>
        <Text style={styles.getStartedText}>
          Suggestion of the Day: <Text style={styles.suggestionText}>hit a new PR!</Text>
        </Text>
      </View>
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarTitle}>Gym Streak</Text>
        <Calendar
          markedDates={markedDates}
          markingType={'multi-dot'}
          theme={{
            calendarBackground: '#D8D8D8',
            textSectionTitleColor: '#333',
            selectedDayBackgroundColor: '#ECECEC',
            selectedDayTextColor: '#333',
            todayTextColor: '#333',
            dayTextColor: '#333',
            textDisabledColor: '#999',
            selectedDotColor: '#333',
            arrowColor: '#333',
            monthTextColor: '#333',
            indicatorColor: '#333',
            textDayFontWeight: '400',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textDayFontSize: 12,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 12,
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            },
            'stylesheet.calendar.main': {
              week: {
                marginTop: 10,
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            },
          }}
        />
        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>
            Your Streak: <Text style={styles.boldText}>🔥 {gymStreak}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
