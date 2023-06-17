import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection:'column',
 
    width:'100%',
 

    
  },
  addFriendBtn:{
    width:60,
    height:60,
    backgroundColor:'#f0f0f0',
    alignItems:'center',
    borderRadius:100,
    justifyContent:'center',
    borderWidth:2,
    borderColor:'black',
    position:'absolute',
    bottom:25,
    right:25,
  },
buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
},
 addFriendModal:{
display:'flex',
position:'absolute',
flexDirection:'column',
alignItems:'center',

backgroundColor:'#f0f0f0',
width:300,
zIndex:7,
height:200,
top:100,
borderRadius:50,
borderWidth:3,
borderColor:'black',

 },
 addFriendHeader:{
marginTop:10,
fontSize:18,
 },
 input: {
  height: 45,
  borderRadius: 5,
  overflow: 'hidden',
  backgroundColor: 'white',
  marginTop: 20,
  marginBottom:20,
  marginBottom: 20,
  marginLeft: 30,
  marginRight: 30,
  paddingLeft: 16,
  width:200,
},
 button: {
  backgroundColor: '#788eec',
  width:110,
  height: 45,
  borderRadius: 5,
  alignItems: "center",
  justifyContent: 'center',
  
},
addFriend:{
  bottom:0,
}
 
});
