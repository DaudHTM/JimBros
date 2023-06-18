import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#FFF"
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: "4%",
    color: "#000",
    textAlign: "left"
  },
  exerciseList: {
    width: "100%",
    marginTop: "5%",
    textAlign: "center",
  },
  exerciseItem: {
    width: "100%",
    height: 60,
    justifyContent: "center",
  },
  exerciseItemText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  exerciseItemOdd: {
    backgroundColor: "#dddddd"
  },
  exerciseItemEven: {
    backgroundColor: "#cccccc"
  },
});
