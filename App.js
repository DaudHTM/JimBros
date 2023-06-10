import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'
import { LoginScreen, HomeScreen, RegistrationScreen, PrScreen} from './screens'
import {decode, encode} from 'base-64'
import { MaterialCommunityIcons } from '@expo/vector-icons';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
import { firebase } from './assets/src/firebase/config'
import AiScreen from './screens/AiScreen/AiScreen';

const Tab = createBottomTabNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)



  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
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
            name="AI"
         
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="robot" color={color} size={size} />
              ),
            }}>
               {props => <AiScreen {...props} userData={user} />}
            </Tab.Screen>

          <Tab.Screen
            name="Account"
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="account-circle" color={color} size={size} />
              ),
            }}>
        {props => <PrScreen {...props} userData={user} />}
            
            </Tab.Screen>
          </>
        ) : (
          <>
          
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Registration" component={RegistrationScreen} />
        
   
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}