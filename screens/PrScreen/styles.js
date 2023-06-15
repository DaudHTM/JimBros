import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logButton: {
    width: '90%',
    borderRadius: 10,
    height: 60,
    backgroundColor: '#788eec',
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalContainer: {
    backgroundColor: '#777',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    position: 'relative',
    alignItems: "left",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#1f1f1f",
  },
  modalText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: "#000",
  },
  graphContainer: {
  },
});
