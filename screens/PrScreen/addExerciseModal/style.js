import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'

    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        paddingBottom: 16
        
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    modalContainer:{
        position:'absolute',
        width:320,
        height:500,
        bottom:140,
        backgroundColor:"#dddddd",
        border:'2px solid black',
        borderRadius:25,
        borderWidth:3,
        borderColor:'grey',

        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    overflow:'hidden',


    },
    exerciseInputHeader:{
        marginTop:10,
        flexDirection:'row',
        gap:20,
        justifyContent:'center',
        alignItems:'center',
  
    },
    exerciseHeader:{
        marginTop:30,
        flexDirection:'row',
        gap:50,
        justifyContent:'center',
        alignItems:'center',
  
        
    },
    setInfoInput:{
       
   backgroundColor:'white',
flex:1,
   height:30,
   width:53,
   paddingLeft:10,
   borderRadius:5,
      
    },


})