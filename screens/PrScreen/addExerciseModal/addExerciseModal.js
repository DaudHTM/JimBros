import React, { useState, useEffect,Component } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './style'
import { firebase } from '../../../assets/src/firebase/config'
import { SelectList } from 'react-native-dropdown-select-list'

export default function AddExerciseModal({  userData }) {
    
  const [prArr, setPrArr] = useState([])
  const [selectedExercise,setSelectedExercise] = useState('')
  const [currentSet,setCurrentSet] =useState(1)
  const [exerciseInfo,setExerciseInfo] = useState([]);
  const uid = userData.id


  const[newSetArr,setNewSetArr]=useState([])

const exerciseListData = [
    {key:'1', value:'Bench Press'},
    {key:'2', value:'Squat'},
    {key:'3', value:'Deadlift'},
    {key:'4', value:'Push-ups'},
    {key:'5', value:'Pull-ups'},
    {key:'6', value:'Shoulder Press'},
    {key:'7', value:'Lateral Raise'},
    {key:'8', value:'Biceps Curl'},


]

const ExerciseRow =(props)=>{
 

    const[currentWeight,setCurrentWeight] = useState(exerciseInfo[props.set-1].weight)
    const[currentReps,setCurrentReps] = useState(exerciseInfo[props.set-1].reps)
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
    <View style={styles.exerciseHeader}><Text>{props.set}</Text>

            <TextInput
numberOfLines={2}
    style={styles.setInfoInput}
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
    style={styles.setInfoInput}
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
    setCurrentSet(currentSet+1)
setNewSetArr([...newSetArr,currentSet])
setExerciseInfo([...exerciseInfo,{reps:'',weight:''}])

}

const updateFirebase=()=>{

    if(selectedExercise==""){
        alert("Please select an exercise")
        return
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
        created:firebase.database.ServerValue.TIMESTAMP,
        

    }

    usersRef.collection('pr').add(exerciseData).then(() => { alert("Exercise added") })
    .catch((error) => {
        alert(error)
        return "break"
    });
}
  return (
    <View style={styles.modalContainer}>
     <SelectList data={exerciseListData} save="value" setSelected={(val) => setSelectedExercise(val)}  />

    <View style={styles.exerciseHeader}> 
    <Text style={styles.entityText}>Set</Text>
    <Text style={styles.entityText}>Weight</Text>
    <Text style={styles.entityText}>Reps</Text>
    </View>
    
    {newSetArr.map((cur) => (
        <ExerciseRow key={cur} set={cur}/>
      ))}

    <TouchableOpacity onPress={()=> newRow()} style={styles.button}><Text style={styles.buttonText}>Add set</Text></TouchableOpacity> 
    <TouchableOpacity onPress={()=> updateFirebase()} style={styles.button}><Text style={styles.buttonText}>Done!</Text></TouchableOpacity> 

    </View>
  )
}


export { AddExerciseModal }