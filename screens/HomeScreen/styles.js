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
  }
});

export default styles;
