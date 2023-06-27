import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";

export default function AboutUsScreen({ closeModal }) {
  // adsjngksadglmga
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <TouchableOpacity style={styles.backButton} onPress={closeModal}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>❶ Who Are We?</Text>
      <View style={styles.bigTextContainer}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue eu
          consequat ac felis donec et odio pellentesque diam. Elementum integer
          enim neque volutpat. Suspendisse ultrices gravida dictum fusce ut
          placerat orci. Iaculis nunc sed augue lacus viverra vitae congue eu
          consequat. Mauris sit amet massa vitae tortor condimentum. Nisi vitae
          suscipit tellus mauris. Venenatis lectus magna fringilla urna. Nisl
          pretium fusce id velit ut.
        </Text>
      </View>
      <Text style={styles.subtitle}>❷ Our Mission</Text>
      <View style={styles.bigTextContainer}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue eu
          consequat ac felis donec et odio pellentesque diam. Elementum integer
          enim neque volutpat. Suspendisse ultrices gravida dictum fusce ut
          placerat orci. Iaculis nunc sed augue lacus viverra vitae congue eu
          consequat. Mauris sit amet massa vitae tortor condimentum. Nisi vitae
          suscipit tellus mauris. Venenatis lectus magna fringilla urna. Nisl
          pretium fusce id velit ut.
        </Text>
      </View>
      <Text style={styles.subtitle}>❸ Contact</Text>
      <View style={styles.smallTextContainer}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue eu
          consequat ac felis donec et odio pellentesque diam.
        </Text>
      </View>
    </View>
  );
}

export { AboutUsScreen };
