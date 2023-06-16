import React from "react";
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

  const onPencilPress = () => {
    navigation.navigate("Edit Bio");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profilePicture} />
        <View style={styles.usernameContainer}>
          <Text style={styles.userhandleText}>{userData["username"]}</Text>
          <Text style={styles.usernameText}>{userData["fullName"]}</Text>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.bioHeading}>Bio</Text>
          <Text style={styles.bioText}>{`Age: ${calcAge(
            userData["birthdate"]
          )}`}</Text>
          <Text style={styles.bioText}>{`Height: ${calcHeight(
            userData["height"]
          )}`}</Text>
          <Text
            style={styles.bioText}
          >{`Weight: ${userData["weight"]} lbs`}</Text>
          <TouchableOpacity style={styles.bioButton} onPress={onPencilPress}>
            <Text style={styles.bioButtonText}>✏️</Text>
          </TouchableOpacity>
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
