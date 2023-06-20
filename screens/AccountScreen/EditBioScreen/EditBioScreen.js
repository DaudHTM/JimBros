import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { firebase } from "../../../assets/src/firebase/config";
import { getDatabase, ref, set } from "firebase/database";

export default function EditBioScreen({ userData, closeModal }) {
  const [fullName, setFullName] = useState(userData["fullName"]);
  const [username, setUsername] = useState(userData["username"]);
  const [email, setEmail] = useState(userData["email"]);
  const [birthMonth, setBirthMonth] = useState(
    userData["birthdate"].substring(0, 2)
  );
  const [birthDay, setBirthDay] = useState(
    userData["birthdate"].substring(3, 5)
  );
  const [birthYear, setBirthYear] = useState(
    userData["birthdate"].substring(6)
  );
  const [height, setHeight] = useState(userData["height"]);
  const [weight, setWeight] = useState(userData["weight"]);
  const [aboutMe, setAboutMe] = useState(userData["aboutMe"]);

  const updateFirebase = () => {
    const uid = userData.id;
    const usersRef = firebase.firestore().collection("users").doc(uid);
    const birthdate = birthMonth + "/" + birthDay + "/" + birthYear;
    const identification = {
      id: uid,
      username: username,
    };
    const bioInfo = {
      id: uid,
      fullName: fullName,
      username: username,
      email: email,
      birthdate: birthdate,
      height: height,
      weight: weight,
      aboutMe: aboutMe,
    };

    usersRef.set(identification);

    usersRef
      .collection("info")
      .doc(uid)
      .set(bioInfo)
      .then(() => {
        alert("Bio Updated");
      })
      .catch((error) => {
        alert(error);
        return "break";
      });
    closeModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={closeModal}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Edit Your Info</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder={"Full name: " + fullName}
        onChangeText={(text) => {
          text != "" ? setFullName(text) : setFullName(userData["fullName"]);
        }}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder={"Username: " + username}
        onChangeText={(text) => {
          text != "" ? setUsername(text) : setUsername(userData["username"]);
        }}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder={"Email: " + email}
        onChangeText={(text) => {
          text != "" ? setEmail(text) : setEmail(userData["email"]);
        }}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder={"Birth month: " + birthMonth}
        onChangeText={(text) => {
          text != ""
            ? setBirthMonth(text)
            : setBirthMonth(userData["birthdate"].substring(0, 2));
        }}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        type={Number}
        keyboardType="number-pad"
      />
      <TextInput
        numberOfLines={2}
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder={"Birth day: " + birthDay}
        onChangeText={(text) => {
          text != ""
            ? setBirthDay(text)
            : setBirthDay(userData["birthdate"].substring(3, 5));
        }}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        type={Number}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder={"Birth year: " + birthYear}
        onChangeText={(text) => {
          text != ""
            ? setBirthYear(text)
            : setBirthYear(userData["birthdate"].substring(6));
        }}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        type={Number}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder={"Height: " + height}
        onChangeText={(text) => {
          text != "" ? setHeight(text) : setHeight(userData["height"]);
        }}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder={"Weight: " + weight}
        onChangeText={(text) => {
          text != "" ? setWeight(text) : setWeight(userData["weight"]);
        }}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.aboutMeInput}
        placeholderTextColor="#aaaaaa"
        placeholder={
          userData["aboutMe"] == ""
            ? "Add an about me! (80 character limit)"
            : "About Me: " + userData["aboutMe"]
        }
        onChangeText={(text) => {
          text != "" ? setAboutMe(text) : setAboutMe(userData["aboutMe"]);
        }}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        maxLength={80}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            updateFirebase();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Update Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export { EditBioScreen };
