import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import moment from "moment";
import { baseURL } from "../utility/consts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const DiscussionDetails = (props) => {
  const item = props.route.params.discussion;

  const [comment, setComments] = useState("");
  const [poster, setPoster] = useState(props.route.params.username);

  const sendComment = async () => {
    if (comment != "" && poster != "") {
      const data = await fetch(baseURL + "/dis/comment/" + item._id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: comment,
          commentAuthor: poster,
        }),
      });
      const discussions = await data.json();
      console.log(JSON.stringify(discussions));
    } else {
      Alert.alert("Add Comment", "Please enetr comment for this article");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "85%", padding: 20 }}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <View style={styles.author_container}>
          <Image source={{ uri: item.authorAvatar }} style={styles.avatar} />
          <View style={{ width: "60%", marginLeft: 5 }}>
            <Text style={styles.postTitle2}>{item.author}</Text>

            <View style={{ width: "100%", flexDirection: "row" }}>
              <Text style={styles.comments}>
                {moment(item.Date).format("DD/MM/yyyy")} |
              </Text>
              <Text style={{ fontSize: 15, color: "white" }}>
                {" "}
                {item.comments.length}
              </Text>
              <MaterialCommunityIcons
                raised
                name="comment"
                size={25}
                color="white"
                style={{paddingRight: 25}}
                onPress={() => console.log("ss")}
              />
            <Text style={{ fontSize:15, color: "white" }}>
            {item.likes.length}
            </Text>
              <MaterialCommunityIcons
                raised
                name="heart"
                size={25}
                color="red"
                 onPress={() => console.log("ss")}
              />
            </View>
          </View>
        </View>

        <Image source={{ uri: item.postImage }} style={styles.postImage} />
        <Text style={styles.postContent2}>{item.content}</Text>
      </ScrollView>
      <View
        style={{
          height: "15%",
          flexDirection: "row",
          paddingTop: 12,
          padding: 20,
        }}
      >
        <View style={{ width: "80%" }}>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={(text) => setComments(text)}
            placeholder="what did you think about this ?"
          />
        </View>
        <View style={{ width: "20%" }}>
          <TouchableOpacity onPress={sendComment} style={styles.sendbtn}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              ADD
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const screenOption = (navData) => {
  return {
    headerTitle: navData.route.params.discussion.title,
  };
};

const styles = StyleSheet.create({
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
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#F756",
    borderTopRightRadius: 50,
  },
  postImage: {
    width: "100%",
    marginTop: 12,
    height: 300,
    resizeMode: "cover",
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

export default DiscussionDetails;
