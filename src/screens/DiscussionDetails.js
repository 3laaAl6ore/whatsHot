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
  Modal,
  FlatList,
} from "react-native";
import moment from "moment";
import { baseURL } from "../utility/consts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DiscussionDetails = (props) => {
  const item = props.route.params.discussion;
  const comments = props.route.params.discussion.comments;

  const [comment, setComments] = useState("");
  const [poster, setPoster] = useState(props.route.params.username);
  const [like, setLike] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  console.log("--------------------------------------------------");

  console.log(props);
  console.log("--------------------------------------------------");

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
              <View>
                <Modal
                  animationType="content"
                  visible={modalVisible}
                  transparent={true}
                  style={{ flex: 1 }}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "flex-end",
                      opacity: 0.93,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",

                        shadowOffset: { width: 0, height: -102 },
                        shadowOpacity: 0.25,
                        shadowRadius: 20,
                        shadowColor: "black",
                        height: "50%",
                        backgroundColor: "white",
                        borderTopLeftRadius: 6,
                        borderTopRightRadius: 25,
                      }}
                    >
                      <FlatList
                        data={comments}
                        keyExtractor={(Item) => Item._id}
                        renderItem={(itemRow) => (
                          <View
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              marginBottom: 8,
                              marginTop: 8,
                              padding: 5,
                            }}
                          >
                            <View style={{ padding: 2 }}>
                              <Image
                                source={{ uri: itemRow.item.avatar }}
                                style={{
                                  width: 46,
                                  height: 46,
                                }}
                              />
                            </View>
                            <View style={{ width: "90%" }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: "black",
                                  fontWeight: "bold",
                                  shadowColor: "#88a",
                                  shadowOpacity: 0.69,
                                }}
                              >
                                {itemRow.item.commentAuthor}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: "#88a",
                                  fontWeight: "400",
                                }}
                              >
                                {itemRow.item.comment}
                              </Text>
                            </View>
                          </View>
                        )}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                        style={{
                          alignItems: "center",
                          width: "80%",
                          padding: 20,
                          borderRadius: 10,
                          backgroundColor: "#89cd",
                          marginBottom: 20,
                          alignSelf: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 17,
                          }}
                        >
                          OK !
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
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
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
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
