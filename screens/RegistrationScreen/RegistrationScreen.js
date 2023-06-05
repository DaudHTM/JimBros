import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../assets/src/firebase/config'

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const[BirthDay,setBirthDay] = useState()
    const[BirthMonth,setBirthMonth] = useState()
    const[BirthYear,setBirthYear] = useState()
    const[birthdate,setBirthDayFinal] = useState()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [weight,setWeight] =useState()
const[height,setHeight] = useState()

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
      
        if(isNaN(BirthDay) || isNaN(BirthMonth) || isNaN(BirthYear) ){
            alert("please enter a valid birthday")
            return

        }
        if(isNaN(height)){
            alert("Please enter a valid height")
            return
        }
        if(height>120 || height<20){
            alert("Please enter a valid height")
            return
        }
        if(isNaN(weight)){
            alert("please enter a valid weight")
            return
        }
        if(weight<40 || weight>900){
            alert("please enter a valid weight")
            return
        }
        if( BirthMonth>12 || BirthMonth<0 || BirthDay<0 || BirthDay>31 || BirthYear>2023 || BirthYear<1923){
            alert("please enter a valid birthday")
            return
        }
       setBirthDayFinal(BirthMonth+"/"+BirthDay+"/"+BirthYear)
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                    birthdate,
                    weight,
                    height,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef.doc(uid).set(data).then(() => {  alert("Account creation successful!"),navigation.navigate('Home', {user: data})})
                    .catch((error) => {
                        alert(error)
                        return "break"
                    });
            })
            .catch((error) => {
                alert(error)
                return
        });

      
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../assets/img/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

<View style={styles.BirthDate}>
                
                <TextInput
    style={styles.BirthdateInput}
    placeholder='Birth Day (DD)'
    placeholderTextColor="#aaaaaa"
    onChangeText={(text) => setBirthDay(text)}
    value={BirthDay}
    underlineColorAndroid="transparent"
    autoCapitalize="none" 
    type={Number}
/>
<Text>/</Text>
<TextInput
    style={styles.BirthdateInput}
    placeholder='Birth Month (MM)'
    placeholderTextColor="#aaaaaa"
    onChangeText={(text) => setBirthMonth(text)}
    value={BirthMonth}
    underlineColorAndroid="transparent"
    autoCapitalize="none"
    type={Number}
/>
<Text>/</Text>
<TextInput
    style={styles.BirthdateInput}
    placeholder='Birth Year (YYYY)'
    placeholderTextColor="#aaaaaa"
    onChangeText={(text) => setBirthYear(text)}
    value={BirthYear}
    underlineColorAndroid="transparent"
    autoCapitalize="none"
    type={Number}
/>

</View>
<View style={styles.BirthDate}>
<TextInput
    style={styles.BirthdateInput}
    placeholder='Height (inches)'
    placeholderTextColor="#aaaaaa"
    onChangeText={(text) => setHeight(text)}
    value={height}
    underlineColorAndroid="transparent"
    autoCapitalize="none"
    type={Number}
/>
<TextInput
    style={styles.BirthdateInput}
    placeholder='Weight (lbs)'
    placeholderTextColor="#aaaaaa"
    onChangeText={(text) => setWeight(text)}
    value={weight}
    underlineColorAndroid="transparent"
    autoCapitalize="none"
    type={Number}
/>
</View>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

               
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}