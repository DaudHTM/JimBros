import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { firebase } from '../../assets/src/firebase/config'

export default function PrScreen({ navigation, userData }) {
  const [prArr, setPrArr] = useState([])
  const uid = userData.id
  const prRef = firebase.firestore().collection('users').doc(uid).collection('pr')

  useEffect(() => {
    prRef

      .onSnapshot(
        querySnapshot => {
          const newEntities = []
          querySnapshot.forEach(doc => {
            newEntities.push(doc.data())
            alert(doc.data().id)
          })
          setPrArr(newEntities)
        },
        error => {
          console.log(error)
        }
      )
  }, [])

  return (
    <View>
      <Text>{prArr.id}</Text>
    </View>
  )
}
