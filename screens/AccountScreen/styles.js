import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'flex-start', 
    marginTop: "12%",
    backgroundColor: '#e3e3e3',
    width: "100%",
    height: "22%",
  },
  profilePicture: {
    width: "32%",
    height: "85%",
    borderRadius: 100, 
    backgroundColor: '#d3d3d3',
    marginTop: -10, 
    marginLeft: "5%",
  },
  usernameContainer: {
    marginTop: "2%",
    marginLeft: "6%",
    alignItems: 'flex-start', 
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
    marginTop: "5%",
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
