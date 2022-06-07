import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  postAuthor: {
    fontSize: 12,
    fontWeight: "300",
  },
  add: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    borderRadius: 50,
  },
  postContent: {
    fontSize: 11,
    fontWeight: "500",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  row: {
    width: "100%",
    backgroundColor: "#FCFCFC",
    flexDirection: "row",
    borderRadius: 8,
    padding: 5,
    marginBottom: 7,
  },
  avatar: {
    width: 46,
    height: 50,
  },
  postImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 3,
  },
  container: {
    flex: 1,
    backgroundColor: "#5D576B",
    padding: 5,
  },
});