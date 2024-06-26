import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logButton: {
    width: '90%',
    borderRadius: 10,
    height: 60,
    backgroundColor: '#788eec',
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#BBB',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    position: 'relative',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1F1F1F',
  },
  modalText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#000',
  },
  graphContainer: {},
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomColor: 'transparent',
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10,
  },
  setInfoInput: {
    marginTop: 15,
    width: 80,
    textAlign: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderColor: '#777',
    borderWidth: 1,
    color: '#000',
    paddingVertical: 5,
    borderWidth: 2,
  },
  errorBorder: {
    borderColor: '#993333',
    borderWidth: 1.5,
  },
  changeSetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneBtn: {
    width: '100%',
  },
});
