import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { firebase } from "../../assets/src/firebase/config";

import { useNavigation } from "@react-navigation/native";

import { EditBioScreen } from "./EditBioScreen/EditBioScreen";

/*
TO DO:
Add user bio in gray rectangle (log in firebase)
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

  const [toggleModal, setToggleModal] = useState(false);

  const onPencilPress = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <View style={styles.container}>
      {toggleModal ? (
        <EditBioScreen userData={userData} closeModal={onPencilPress} />
      ) : null}
      <TouchableOpacity style={styles.editBioButton} onPress={onPencilPress}>
        <Text style={styles.pencilIcon}>✏️ Edit Bio</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <View style={styles.profilePicture} />
        <View style={styles.usernameContainer}>
          <Text style={styles.userhandleText}>{userData["username"]}</Text>
          <Text style={styles.usernameText}>{userData["fullName"]}</Text>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.bioHeading}>Physical</Text>
          <Text style={styles.bioInfoText}>
            {`${calcAge(userData["birthdate"])} years · ${calcHeight(userData["height"])} · ${userData["weight"]} lbs`}{'\n'}
          </Text>
          <Text style={styles.bioHeading}>About Me</Text>
          <View style={styles.bioButtonContainer}>
            <Text style={styles.aboutMeText}>Click the pencil icon to add an About Me!</Text>
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
        <TouchableOpacity style={styles.button}>
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

