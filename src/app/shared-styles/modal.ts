import {
  StyleSheet,
} from "react-native";

const modal_styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "space-between",
    borderWidth: 2,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 14,
    paddingLeft: 10,
    margin: 10,
    color: "#000000",
  },
  label: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 10,
  },
  description: {
    textAlign: "left",
    margin: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  buttonBar: {
    flexDirection: "row",
    alignItems: "center", // Centers buttons vertically in the row

    // Spacing
    paddingHorizontal: 10,
    gap: 12, // Modern way to add spacin
    borderTopColor: "#708abb",
    borderTopWidth: 2,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    //backgroundColor: "#a0000000",
  },
  buttonText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default modal_styles;