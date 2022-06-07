import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  postAuthor: {
    fontSize: 12,
    fontWeight: "300",
  },
  scrollView:{
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom:3,
    marginTop:5
  //backgroundColor: "red"
  },

  avatar: {
    width: 46,
    height: 50,
  },
  postImage: {
    aspectRatio: 1, 
    flex: 1, 
    maxWidth: 300, 
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,

  },
  item: {
    backgroundColor: "white",
    width: 330,
    height: "100%",
    margin: 10,
    flexDirection: "row",
    shadowColor:"#5D576B",
    shadowOpacity: 0.5,
    borderBottomWidth:3.5,
    borderBottomColor:"black",

  },
  btnAdd:{
    alignSelf: "center",
    width: "80%",
    alignItems: "center",
    padding: 7,
    borderTopLeftRadius: 20,
    borderBottomEndRadius: 20,
    marginBottom: 12,
    backgroundColor: "white", //"#89f",
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  category:{
    fontSize: 15,
    color: "#5D576B",
    fontWeight: "bold",
    shadowColor: "black",
    shadowOpacity: 0.3,
    marginLeft: 12,
  }
});
