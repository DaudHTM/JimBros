import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 10,
    backgroundColor: "#transparent",
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#000",
    fontSize: 32,
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: "4%",
    color: "#000",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: "bold",
  },
  bigTextContainer: {
    marginTop: "2%",
    alignItems: "center",
    height: "28%",
    width: "80%",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    textAlign: "left",
  },
  smallTextContainer: {
    marginTop: "2%",
    alignItems: "center",
    height: "15%",
    width: "80%",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    textAlign: "left",
  },
  text: {
    fontSize: 14,
    fontFamily: "Helvetica",
    textAlign: "center",
    color: "black",
  },
});
