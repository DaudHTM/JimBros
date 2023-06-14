import React, { useState, useEffect,Component } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './style'
import { firebase } from '../../../assets/src/firebase/config'
import { SelectList } from 'react-native-dropdown-select-list'

export default function AddExerciseModal({  closeModal,userData }) {
    
  const [prArr, setPrArr] = useState([])
  const [selectedExercise,setSelectedExercise] = useState('')
  const [currentSet,setCurrentSet] =useState(1)
  const [exerciseInfo,setExerciseInfo] = useState([]);
  const uid = userData.id
 

  const[newSetArr,setNewSetArr]=useState([])

const exerciseListData = [
    {key:'1', value:'Bench press'},
    {key:'2', value:'Squat'},
    {key:'3', value:'Deadlift'},
    {key:'4', value:'Pushps'},
    {key:'5', value:'Pullups'},
    {key:'6', value:'Shoulder press'},
    {key:'7', value:'Lateral raise'},
    {key:'8', value:'Biceps curl'},


]

const ExerciseRow =(props)=>{
 

    const[currentWeight,setCurrentWeight] = useState(exerciseInfo[props.set-1].weight)
    const[currentReps,setCurrentReps] = useState(exerciseInfo[props.set-1].reps)

    const[weightErr,setWeightErr] = useState(true);
    const[repsErr,setRepsErr] = useState(true);


    useEffect(() => {
        setWeightErr(!currentWeight.trim());
      }, [currentWeight]);
      
      useEffect(() => {
        setRepsErr(!currentReps.trim());
      }, [currentReps]);
  

    var newArrInfo = exerciseInfo
    const changeWeight=(text)=>{
        setCurrentWeight(text)
        newArrInfo[props.set-1].weight=text
        setExerciseInfo(newArrInfo)


        
    }
    const changeReps=(text)=>{
        setCurrentReps(text)
        newArrInfo[props.set-1].reps=text
        setExerciseInfo(newArrInfo)

    

    
    }
    

    return(
    <View style={styles.rowStyle}>
    <Text style={styles.setInfoInput}>{props.set}</Text>

   

            <TextInput
numberOfLines={2}
    style={[styles.setInfoInput,weightErr ? styles.errorBorder:null]}
    placeholder='Weight'
    placeholderTextColor="#aaaaaa"
    onChangeText={(text) =>changeWeight(text) }
    value={currentWeight}
    underlineColorAndroid="transparent"
    autoCapitalize="none"
    type={Number}
    keyboardType='number-pad'
/>

<TextInput
numberOfLines={2}
    style={[styles.setInfoInput, repsErr ? styles.errorBorder:null]}
    placeholder='Reps'
    placeholderTextColor="#aaaaaa"
    onChangeText={(text) => changeReps(text)}
    value={currentReps}
    underlineColorAndroid="transparent"
    autoCapitalize="none"
    type={Number}
    keyboardType='number-pad'
/></View>

    );
}



const newRow=()=>{
    if(currentSet>4){
        alert('Upgrade to premium to add more sets')
        return
    }
    setCurrentSet(currentSet+1)
setNewSetArr([...newSetArr,currentSet])
setExerciseInfo([...exerciseInfo,{reps:'',weight:''}])

}
useEffect(() => {
    if(currentSet<2){
  newRow(); }
}, []);

const deleteRow=()=>{

    if(currentSet>2){
    setCurrentSet(currentSet-1)
    const newarr = newSetArr.slice(0,-1);
    setNewSetArr(newarr);
    const newexer = exerciseInfo.slice(0,-1);
    setExerciseInfo(newexer)
    }
  
}

const updateFirebase=()=>{



    if(selectedExercise==""){
        alert("Please select an exercise")
        return
    }
    const emptySetIndex = exerciseInfo.findIndex(
        (exercise) => exercise.reps === "" || exercise.weight === ""
      );
    
      if (emptySetIndex !== -1) {
        alert("Please fill in all sets");
        return;
      }

    const uid = userData.id;
    const usersRef = firebase.firestore().collection('users').doc(uid);
    var formattedExerciseInfo= {}
    var counter = 0;
    exerciseInfo.map((currentExercise)=>{
        counter+=1;
        const exerciseKey = "set"+counter;
   
        formattedExerciseInfo[exerciseKey]=currentExercise;
    });
    const exerciseData = {
        id:uid,
        exercise:selectedExercise,
        sets:formattedExerciseInfo,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        

    }

    usersRef.collection('pr').add(exerciseData).then(() => { alert("Exercise added") })
    .catch((error) => {
        alert(error)
        return "break"
    });
    closeModal()
}
  return (
    <View style={styles.modalContainer}>
     <SelectList data={exerciseListData} save="value" style={[styles.dropdownstyle, {zIndex:999}]} setSelected={(val) => setSelectedExercise(val)}  />

    <View style={styles.exerciseHeader}> 
    <Text style={styles.entityText}>Set</Text>
    <Text style={[styles.entityText]}>Weight</Text>
    <Text style={[styles.entityText]}>Reps</Text>
    </View>
    
    {newSetArr.map((cur) => (
        <ExerciseRow key={cur} set={cur}/>
      ))}

    <View style={styles.changeSetBtn}>
    <TouchableOpacity onPress={()=> newRow()} style={styles.button}><Text style={styles.buttonText}>Add set</Text></TouchableOpacity> 
     <TouchableOpacity onPress={()=> deleteRow()} style={[styles.button]}><Text style={styles.buttonText}>Delete set</Text></TouchableOpacity> 
     </View>
    <TouchableOpacity onPress={()=> updateFirebase()} style={[styles.button,styles.doneBtn]}><Text style={styles.buttonText}>Done!</Text></TouchableOpacity> 

    </View>
  )
}


export { AddExerciseModal }