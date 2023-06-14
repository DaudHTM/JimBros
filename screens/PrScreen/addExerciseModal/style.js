import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  modalContainer:{
    position:'absolute',
    zIndex:999,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    backgroundColor:'#F4F5F6',
    width:300,
    paddingBottom:35,
    paddingTop:35,
    borderRadius:25,
    borderWidth:1,
    borderColor:'grey',
    top:75,
  },
  dropdownstyle:{
    position:'relative',
    zIndex:3,
    marginTop:25,
  },

  exerciseHeader:{
    marginTop:30,
    marginBottom:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
   textAlign:'center',
   paddingHorizontal:10,

    width:250,
  },
  rowStyle:{
        flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:10,
    borderBottomColor:'white',
    width:250,
    borderBottomWidth:3,
    marginBottom:10,
    paddingBottom:10,
  },
  entityText:{
width:65,
fontSize:20,
textAlign:'center',
  },
  setInfoInput:{
    
    width:60,
    textAlign:'center',
    backgroundColor:'white',
    borderRadius:5,
    borderColor:'grey',
    
    borderWidth:1,
  },
  changeSetBtn:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    width:170,
    marginBottom:16,
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: "bold"
},
  button:{
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: "center",
    justifyContent: 'center'
  },
  doneBtn:{
    width:170,
  },
  errorBorder:{
    borderColor:'red',
      },
});
