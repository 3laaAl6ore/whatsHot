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
      fontWeight: "700",
      color: "#ca1",
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
      color: "#ca1",
    },
  
    postContent2: {
      fontSize: 14,
      fontWeight: "900",
      color: "#89a",
      marginTop: 12,
      alignSelf: "center",
    },
    postTitle2: {
      fontSize: 16,
      fontWeight: "500",
      color: "#18ac",
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
      borderBottomColor: "#aa48",
      borderTopColor: "#48aa",
      width: "100%",
      flexDirection: "row",
    },
    postTitle: {
      fontSize: 30,
      fontWeight: "700",
      color: "black",
    },
    container: {
      flex: 1,
      backgroundColor: "white",
    },
  });