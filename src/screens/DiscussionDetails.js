import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import moment from "moment";
import { baseURL } from "../utility/consts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ShowAllComments from "../components/ShowAllComments.js";
import { styles } from "../utility/DiscussionDetailsStyle.js";

const DiscussionDetails = (props) => {
  const item = props.route.params.discussion;
  const comments = props.route.params.discussion.comments;

  const disccusionId = props.route.params.discussion._id;
  
  const [comment, setComments] = useState("");
  const [poster, setPoster] = useState(props.route.params.username);
  const [like, setLike] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  console.log("-------------in des detalis screen --------------------");
  console.log(props);
  console.log("-------------out des detalis screen --------------------");
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

  const SendLikeToPost = async () => {
    if (like) return Alert.alert("you can send one like only ..");
    const data = await fetch(baseURL + "/dis/likePost/" + item._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const liked = await data.json();
    setLike(true);
    console.log(JSON.stringify(liked));
  };
  return (
    <View style={styles.container}>
      <View style={{ height: "100%", padding: 1 }}>
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
                style={{ paddingRight: 25 }}
                onPress={() => setModalVisible(!modalVisible)}
              />
              <Text style={{ fontSize: 15, color: "white" }}>
                {item.likes.length}
              </Text>
              <ShowAllComments
                comments={comments}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                disccusionId = {disccusionId}
              />
              <MaterialCommunityIcons
                raised
                name="heart"
                size={25}
                color="red"
                onPress={() => SendLikeToPost()}
              />
            </View>
          </View>
        </View>
        <ScrollView>
          <Image source={{ uri: item.postImage }} style={styles.postImage} />
          <Text style={styles.postContent2}>{item.content}</Text>
          <View
            style={{
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
                placeholder="Let's Make It Hoter !!."
              />
            </View>
            <View style={{ width: "20%" }}>
              <TouchableOpacity onPress={sendComment} style={styles.sendbtn}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    alignSelf: "center",
                  }}
                >
                  ADD
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export const screenOption = (navData) => {
  return {
    headerTitle: navData.route.params.discussion.title,
  };
};

export default DiscussionDetails;
