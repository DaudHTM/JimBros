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

  const updateFirebase = () => {
    const uid = userData.id;
    const usersRef = firebase.firestore().collection("users").doc(uid);
    const birthdate = birthMonth + "/" + birthDay + "/" + birthYear;
    const bioInfo = {
      id: uid,
      fullName: fullName,
      username: username,
      email: email,
      birthdate: birthdate,
      height: height,
      weight: weight,
    };

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
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Edit Your Info</Text>
      </View>
      <TextInput
        style={styles.input}
        value={fullName}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setFullName(text)}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={username}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setUsername(text)}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={email}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={birthMonth}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setBirthMonth(text)}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        type={Number}
        keyboardType="number-pad"
      />
      <TextInput
        numberOfLines={2}
        style={styles.input}
        value={birthDay}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setBirthDay(text)}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        type={Number}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        value={birthYear}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setBirthYear(text)}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        type={Number}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        value={height}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setHeight(text)}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={weight}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setWeight(text)}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => updateFirebase()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export { EditBioScreen };
