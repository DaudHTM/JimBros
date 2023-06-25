import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../assets/src/firebase/config";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegistrationScreen({ navigation }) {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [BirthDay, setBirthDay] = useState();
    const [BirthMonth, setBirthMonth] = useState();
    const [BirthYear, setBirthYear] = useState();
    const [BirthDateObj, setBirthDateObj] = useState(new Date())
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [showBirthDatePicker,setShowBirthDatePicker] = useState(false);
    const onFooterLinkPress = () => {
        navigation.navigate("Login");
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

    }

    const onRegisterPress = () => {
        if (isNaN(BirthDay) || isNaN(BirthMonth) || isNaN(BirthYear)) {
            alert("please enter a valid birthday");
            return;
        }
        if (isNaN(height)) {
            alert("Please enter a valid height");
            return;
        }
        if (height > 120 || height < 20) {
            alert("Please enter a valid height");
            return;
        }
        if (isNaN(weight)) {
            alert("please enter a valid weight");
            return;
        }
        if (weight < 40 || weight > 900) {
            alert("please enter a valid weight");
            return;
        }
        if (
            BirthMonth > 12 ||
            BirthMonth < 0 ||
            BirthDay < 0 ||
            BirthDay > 31 ||
            BirthYear > 2023 ||
            BirthYear < 1923
        ) {
            alert("please enter a valid birthday. "+BirthDay+" "+BirthMonth+" "+BirthYear);
            return;
        }

        if ((new Date().getTime()) - BirthDateObj.getTime() < (1000 * 60 * 60 * 24 * 366 * 13)) {
            alert("You are not old enough to use this app");
            return;
        }

        const birthdate = `${BirthMonth}/${BirthDay}/${BirthYear}`;
        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        const currentDate = new Date();
   
        const currentDocumentId = `${currentDate.getMonth() + 1},${currentDate.getFullYear()}`;
console.log(currentDate)

        firebase
            .firestore()
            .collection("users")
            .where("username", "==", username)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    alert("Username is already taken. Please choose a different one.");
                    return;
                } else {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)

                        .then((response) => {
                            const uid = response.user.uid;
                            response.user
                                .sendEmailVerification()

                                .catch((error) => {
                                    alert("Error sending email verification. Please try again.");
                                    console.log(error);
                                });
                            const data = {
                                id: uid,
                                email,
                                fullName,
                                birthdate,
                                weight,
                                height,
                                username,
                                aboutMe: "",
                            };
                            const prData = {
                                id: uid,
                            };
                            const userPublicData = {
                                id: uid,
                                username,
                                fullName,
                                aboutMe:"",

                            };
                            const usersRef = firebase
                                .firestore()
                                .collection("users")
                                .doc(uid);
                            usersRef
                                .set(userPublicData)
                                .then(() => { })
                                .catch((error) => {
                                    alert(error);
                                });
                            usersRef
                                .collection("private")
                                .doc(uid)
                                .set(data)
                                .then(() => {
                                    alert(
                                        "Account creation successful! Please check your email for verification."
                                    );
                                })
                                .catch((error) => {
                                    alert(error);
                                });
                            usersRef
                                .collection("notification")
                                .doc(currentDocumentId)
                                .set(prData)
                                .then(() => { })
                                .catch((error) => {
                                    alert(error);
                                });
                            usersRef
                                .collection("social")
                                .doc(uid)
                                .set(prData)
                                .then(() => { })
                                .catch((error) => {
                                    alert(error);
                                });
                            usersRef
                                .collection("workouts")
                                .doc(currentDocumentId)
                                .set({})
                                .then(() => {
                                    navigation.navigate("Login");
                                })
                                .catch((error) => {
                                    alert(error);
                                    return "break";
                                });
                        })
                        .catch((error) => {
                            alert(error);
                            return;
                        });
                }
            });
    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: "100%" }}
                keyboardShouldPersistTaps="always"
            >
                <Image
                    style={styles.logo}
                    source={require("../../assets/img/icon.png")}
                />
                <Text style={styles.registrationText}>❶ Profile Info</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Display Name"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={styles.registrationText}>❷ Where are you starting?</Text>

                <View style={styles.BirthDate}>
                    <TextInput
                        style={styles.BirthdateInput}
                        placeholder="Height (inches)"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setHeight(text)}
                        value={height}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        type={Number}
                        keyboardType="number-pad"
                    />
                    <TextInput
                        style={styles.BirthdateInput}
                        placeholder="Weight (lbs)"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setWeight(text)}
                        value={weight}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        type={Number}
                        keyboardType="number-pad"
                    />
                </View>

                {/* <View style={styles.BirthDate}>
          <TextInput
            numberOfLines={2}
            style={styles.BirthdateInput}
            placeholder="Birth Month (MM)"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setBirthMonth(text)}
            value={BirthMonth}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            type={Number}
            keyboardType="number-pad"
          />
          <Text>/</Text>
          <TextInput
            numberOfLines={2}
            style={styles.BirthdateInput}
            placeholder="Birth Day (DD)"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setBirthDay(text)}
            value={BirthDay}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            type={Number}
            keyboardType="number-pad"
          />
          <Text>/</Text>
          <TextInput
            numberOfLines={2}
            style={styles.BirthdateInput}
            placeholder="Birth Year (YYYY)"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setBirthYear(text)}
            value={BirthYear}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            type={Number}
            keyboardType="number-pad"
          />
        </View> */}

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "8%",
                    marginRight: "8%",
                    width: "84%",
                    height: 40
                }}>
                    <Text style={{ fontSize: 20 }}>Birthdate: </Text>

                    <View style={styles.datePicker}>
                    {showBirthDatePicker?(    <DateTimePicker
                            testID="dateTimePicker"
                            value={BirthDateObj}
                            mode="date"
                          

                            onChange={onDateChange}
                            style={{ height: 40 }}
                        />):null}
                        <TouchableOpacity onPress={()=>setShowBirthDatePicker(!showBirthDatePicker)}><Text>{BirthMonth+"/"+BirthDay+"/"+BirthYear}</Text></TouchableOpacity>
                    
                    </View>
                </View>




                <Text style={styles.registrationText}>❸ Login Info</Text>

                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
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
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder="Confirm Password"
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}
                >
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        Already got an account?{" "}
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                            Log in
                        </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
