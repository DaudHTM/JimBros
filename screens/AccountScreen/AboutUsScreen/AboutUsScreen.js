import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";

export default function AboutUsScreen({closeModal }) {
  // adsjngksadglmga
  return (
    <View style={styles.container}>
        <Text style={styles.title}>About Us</Text>
        <TouchableOpacity style={styles.backButton} onPress={closeModal}>
            <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
    </View>
  );
}

export { AboutUsScreen };
