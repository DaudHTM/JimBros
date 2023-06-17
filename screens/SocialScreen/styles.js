import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection:'column',

    
  },
  navContainer:{
    marginTop:27,
display:'flex',
flexDirection:'row',
justifyContent:'center',
alignItems:'center',
gap:20,
zIndex:4,
  },
  button: {
    backgroundColor: '#788eec',
    width:110,
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    
},
buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
},
 
});
