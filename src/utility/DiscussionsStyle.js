import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  postAuthor: {
    fontSize: 12,
    fontWeight: "300",
  },
  input: {
    padding: 20,
    backgroundColor: "white",
    width: "100%",
    shadowColor: "#8aa18a",
    shadowOpacity: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8aa",
    borderRadius: 50,
  },
  postContent: {
    fontSize: 11,
    fontWeight: "500",
  },
  postTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 3,
    marginTop: 5,
  },

  avatar: {
    width: 46,
    height: 50,
  },
  postImage: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },
  item: {
    backgroundColor: "white",
    width: 356,
    height: "100%",
    margin: 5,
    shadowColor: "#D222",
    shadowOpacity: 0.2,
    shadowOffset:{ width: 12, height: -12},
    paddingVertical: 10,
  },
  btnAdd: {
    width: "80%",
    alignItems: "center",
    padding: 7,
    borderTopLeftRadius: 20,
    borderBottomEndRadius: 20,
    marginBottom: 12,
    backgroundColor: "white", //"#89f",
    flexDirection: "row",
    justifyContent: "center",
  },
  category: {
    fontSize: 15,
    color: "#5D576B",
    fontWeight: "bold",
    shadowColor: "black",
    shadowOpacity: 0.3,
    marginLeft: 12,
    alignSelf: "flex-start",
  },
  txt:{
    fontSize: 17,
    color: "#18a",
    fontWeight: "bold",
    marginBottom: 10,
   }
});
