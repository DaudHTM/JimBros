import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -380,
    backgroundColor: '#e3e3e3',
    width: 1000,
    height: 200,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#988eec',
    marginTop: 33,
  },
  usernameContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  userhandleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
  usernameText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#6495ED',
    height: 48,
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    color: '#222',
    fontSize: 16,
    textAlign: 'right',
  },
});
