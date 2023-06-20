import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  notification: {
    width: '100%',
    height: '15%',
    marginTop: '5%',
    backgroundColor: '#9C2A00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  getStartedText: {
    color: 'lightgray',
    fontSize: 16,
  },
  suggestionText: {
    color: '#FFD580',
    fontWeight: 'bold',
  },
  calendarContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 15,
    marginTop: 20,
    backgroundColor: '#E6E6E6',
    paddingHorizontal: 20,
  },
  calendarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  streakContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  streakText: {
    fontSize: 16,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default styles;
