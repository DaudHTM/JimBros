import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./style";
import { firebase } from "../../../assets/src/firebase/config";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getDatabase, ref, set } from "firebase/database";

export default function EditBioScreen({ userData, closeModal }) {
  const [fullName, setFullName] = useState(userData["fullName"]);
  const [username, setUsername] = useState(userData["username"]);
  const [email, setEmail] = useState(userData["email"]);
  const [birthMonth, setBirthMonth] = useState(
    userData["birthdate"].split("/")[0]
  );
  const [birthDay, setBirthDay] = useState(userData["birthdate"].split("/")[1]);
  const [birthYear, setBirthYear] = useState(
    userData["birthdate"].split("/")[2]
  );
  const [BirthDateObj, setBirthDateObj] = useState(new Date());
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
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

  const onDateChange = (e, selectedDate) => {
    const date = selectedDate;
    setBirthDateObj(date);
    if (date instanceof Date) {
      setBirthDay(date.getDate());
      setBirthMonth(date.getMonth());
      setBirthYear(date.getFullYear());
    }
    setShowBirthDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TouchableOpacity style={styles.backButton} onPress={closeModal}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Edit Your Info</Text>
        <Text style={styles.subheading}>❶ Profile/Login Info</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder={"Display name: " + fullName}
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
        <Text style={styles.subheading}>❷ Physical</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "8%",
            marginRight: "8%",
            width: "84%",
            height: 40,
          }}
        >
          <Text style={{ fontSize: 15 }}>Birthdate: </Text>

          <View>
            {showBirthDatePicker ? (
              <DateTimePicker
                testID="dateTimePicker2"
                value={BirthDateObj}
                mode="date"
                onChange={onDateChange}
                style={{ height: 40 }}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => setShowBirthDatePicker(!showBirthDatePicker)}
            >
              <Text>{birthMonth + "/" + birthDay + "/" + birthYear}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*
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
        */}
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder={"Height: " + height}
          onChangeText={(text) => {
            text != "" ? setHeight(text) : setHeight(userData["height"]);
          }}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          type={Number}
          keyboardType="number-pad"
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
          type={Number}
          keyboardType="number-pad"
        />
        <Text style={styles.subheading}>❸ About Me</Text>
        <TextInput
          style={styles.aboutMeInput}
          placeholderTextColor="#aaaaaa"
          placeholder={
            userData["aboutMe"] == ""
              ? "Add an about me! (80 character limit)"
              : userData["aboutMe"]
          }
          onChangeText={(text) => {
            text != "" ? setAboutMe(text) : setAboutMe(userData["aboutMe"]);
          }}
          underlineColorAndroid="transparent"
          numberOfLines={2}
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
      </KeyboardAwareScrollView>
    </View>
  );
}

export { EditBioScreen };
