import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NativeModules } from "react-native";
import styles from "./styles";
import { firebase } from "../../assets/src/firebase/config";
import { EditBioScreen } from "./EditBioScreen/EditBioScreen";
import { AboutUsScreen } from "./AboutUsScreen/AboutUsScreen";

/*
TO DO:
Allow user to add profile picture in circle (log in firebase)
*/

export default function AccountScreen({ navigation, userData, signOut }) {
  const calcAge = (birthdate) => {
    const todayDate = new Date();
    if (parseInt(todayDate.getMonth()) > parseInt(birthdate.substring(0, 2))) {
      return todayDate.getFullYear() - birthdate.substring(6);
    } else if (
      parseInt(todayDate.getMonth()) < parseInt(birthdate.substring(0, 2))
    ) {
      return todayDate.getFullYear() - birthdate.substring(6) - 1;
    } else {
      if (
        parseInt(todayDate.getDate()) >= parseInt(birthdate.substring(3, 5))
      ) {
        return todayDate.getFullYear() - birthdate.substring(6);
      } else {
        return todayDate.getFullYear() - birthdate.substring(6) - 1;
      }
    }
  };

  const calcHeight = (height) => {
    var feet = Math.floor(height / 12);
    var inches = height % 12;
    return `${feet} ft ${inches} in`;
  };

  const [toggleBioScreen, setToggleBioScreen] = useState(false);

  const onPencilPress = () => {
    setToggleBioScreen(!toggleBioScreen);
  };

  const [toggleAboutUsScreen, setToggleAboutUsScreen] = useState(false);

  const onAboutUsPress = () => {
    setToggleAboutUsScreen(!toggleAboutUsScreen);
  };

  const usersRef = firebase.firestore().collection("users");

  useEffect(() => {
    return usersRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.id === userData.id) {
          userData = data;
        }
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      {toggleBioScreen ? (
        <EditBioScreen userData={userData} closeModal={onPencilPress} />
      ) : null}
      {toggleAboutUsScreen ? (
        <AboutUsScreen closeModal={onAboutUsPress} />
      ) : null}
      <TouchableOpacity style={styles.editBioButton} onPress={onPencilPress}>
        <Text style={styles.pencilIcon}>✏️ Edit Bio</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <View style={styles.profilePicture} />
        <View style={styles.usernameContainer}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.userhandleText}
          >
            {userData["username"]}
          </Text>
          <Text style={styles.usernameText}>{userData["fullName"]}</Text>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.bioHeading}>Physical</Text>
          <Text style={styles.bioInfoText}>
            {`${calcAge(userData["birthdate"])} years · ${calcHeight(
              userData["height"]
            )} · ${userData["weight"]} lbs`}
            {"\n"}
          </Text>
          <Text style={styles.bioHeading}>About Me</Text>
          <View style={styles.bioButtonContainer}>
            <Text style={styles.aboutMeText}>
              {userData["aboutMe"] == ""
                ? "Click the pencil icon to add an About Me!"
                : userData["aboutMe"]}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Terms of Service</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onAboutUsPress}>
          <Text style={styles.buttonText}>About Us</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
