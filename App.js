import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'
import { LoginScreen, HomeScreen, RegistrationScreen, PrScreen, SocialScreen, AccountScreen} from './screens'
import {decode, encode} from 'base-64'
import { MaterialCommunityIcons } from '@expo/vector-icons';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
import { firebase } from './assets/src/firebase/config'

const Tab = createBottomTabNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)


  const signOut=()=>{


    setUser(undefined);

    firebase.auth().signOut()
      .then(() => {
        alert("Successfully signed out!");
      })
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log("Sign out error:", error);
      });

  };

  const checkUserState=()=>{
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        usersRef
          .doc(user.uid).collection('info').doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  };

  useEffect(() => {


  checkUserState();

  }, []);

 

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        { user? (
          <>
          {/* <Tab.Screen name="Home">
            {props => <HomeScreen {...props} userData={user} />}
          </Tab.Screen>
          <Tab.Screen name="Pr">
            {props => <PrScreen {...props} userData={user} />}
          </Tab.Screen> */}


          <Tab.Screen
            name="Home"
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}>
           {props => <HomeScreen {...props} userData={user} />}
            
            </Tab.Screen>

          <Tab.Screen
            name="PRs"
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
              ),
            }}>
          {props => <PrScreen {...props} userData={user} />}

            </Tab.Screen>

          <Tab.Screen
            name="Social"
         
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="account-group" color={color} size={size} />
              ),
            }}>
               {props => <SocialScreen {...props} userData={user} />}
            </Tab.Screen>

          <Tab.Screen
            name="Account"
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="account-circle" color={color} size={size} />
              ),
            }}>
        {props => <AccountScreen {...props} userData={user} signOut={signOut} />}
            
            </Tab.Screen>
            
          </>
        ) : (
          <>
          
          <Tab.Screen
            name="Login"
            >
        {props => <LoginScreen {...props} checkUserState={checkUserState} />}
            
            </Tab.Screen>
            <Tab.Screen name="Registration" component={RegistrationScreen} />
        
   
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
