import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    input: {
      width: "100%",
      paddingVertical: 20,
       paddingHorizontal: 20,
      fontSize: 18,
      backgroundColor: "#FCFCFC",
    },
    comments: {
      fontSize: 15,
      fontWeight: "200",
      color: "#ffffff",
    },
    sendbtn: {
      width: "100%",
      alignItems: "center",
      backgroundColor: "#F756",
      borderTopRightRadius: 50,
      paddingVertical:20
    },
    postImage: {
      width: "100%",
      marginTop: 12,
      height: 300,
      resizeMode:"contain"
    },
    postAuthor: {
      fontSize: 12,
      fontWeight: "300",
    },
    postContent: {
      fontSize: 14,
      fontWeight: "300",
      color: "#ffffff",
    },
  
    postContent2: {
      fontSize: 16,
      fontWeight: "300",
      color: "#ffffff",
      marginTop: 12,
      alignSelf: "center",
    },
    postTitle2: {
      fontSize: 16,
      fontWeight: "500",
      color: "#ffcc00",
    },
    avatar: {
      width: 46,
      height: 50,

    },
    author_container: {
      paddingVertical: 16,
      marginTop: 20,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderBottomColor: "#ffffff",
      borderTopColor: "#ffffff",
      width: "100%",
      flexDirection: "row",
    },
    postTitle: {
      fontSize: 30,
      fontWeight: "700",
      color: "#ffffff",
    },
    container: {
      flex: 1,
      backgroundColor: "#5D576B",
    },
  });