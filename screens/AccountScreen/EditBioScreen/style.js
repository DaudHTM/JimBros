import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  headingContainer: {
    alignItems: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: "4%",
    color: "#000",
    textAlign: "left"
  },
  input: {
    marginTop: "5%",
    alignItems: "center",
    height: "6%",
    width: "80%",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    textAlign: "left",
  },
  aboutMeInput: {
    marginTop: "5%",
    width: "80%",
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    textAlign: "left",
  },
  button: {
    backgroundColor: "#6495ED",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: "5%",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 10,
    backgroundColor: "#transparent",
    padding: 10,
    borderRadius: 5
  },
  backButtonText: {
    color: "#000",
    fontSize: 32,
    fontWeight: "bold"
  },
});
