import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../assets/src/firebase/config'

export default function LoginScreen({navigation,checkUserState}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }
    const handleResendVerification = () => {
        const user = firebase.auth().currentUser;
        if (user) {
          user
            .sendEmailVerification()
            .then(() => {
              Alert.alert('Verification Email Sent', 'A verification email has been sent. Please check your inbox and follow the instructions.');
            })
            .catch((error) => {
              Alert.alert('Error', `Failed to send verification email: ${error.message}`);
            });
        } else {
          Alert.alert('Error', 'No user found. Please try again later.');
        }
      };
    

    const onLoginPress = () => {
        
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
         

                if (response.user.emailVerified){
                   
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .collection('info')
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        checkUserState();
                        //navigation.navigate('Home',{user});
                        alert("Login successful!")
                    })
                    .catch(error => {
                        alert(error)
                    });
    }
    else{
        Alert.alert(
            'Email Verification Required',
            'Please verify your email address before logging in. Check your email for verification.',
            [
              {
                text: 'Resend Verification',
                onPress: handleResendVerification,
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]
          );
    }
})
            .catch(error => {
                alert(error)
            })
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}