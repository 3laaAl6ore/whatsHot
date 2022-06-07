import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { baseURL } from "../utility/consts";
import { styles } from "../utility/DiscussionsStyle.js";
const Discussions = (props) => {
  console.log("-------------in des screen --------------------");
  console.log(props);
  console.log("-------------out des screen --------------------");
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(props.route.params.username);

  useEffect(() => {
    loadAllDiscussions();
  }, []);

  const loadAllDiscussions = async () => {
    setLoading(true);
    const data = await fetch(baseURL + "/dis/getAllDisccusions", {
      method: "get",
    });
    const discussions = await data.json();
    discussions.Disccusions.reverse();
    setAllData(discussions);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="#F7567C" size="large" />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={allData.Disccusions}
            keyExtractor={(item) => item._id}
            
            renderItem={(itemRow) => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("DiscussionDetails", {
                    discussion: itemRow.item,
                    username: username,
                  });
                }}
                style={styles.row}
              >
                {itemRow.item.postImage ? (
                  <Image
                    source={{ uri: itemRow.item.postImage }}
                    style={styles.postImage}
                  />
                ) : (
                  <Image
                    source={{ uri: itemRow.item.authorAvatar }}
                    style={styles.avatar}
                  />
                )}
                <View style={{ width: "50%", marginLeft: 10 }}>
                  <Text style={styles.postTitle}>
                    {itemRow.item.title.length > 15
                      ? itemRow.item.title.substring(0, 15) + "..."
                      : itemRow.item.title}{" "}
                    | {itemRow.item.author}
                  </Text>
                  <Text style={styles.postContent}>
                    {itemRow.item.content.length > 15
                      ? itemRow.item.content.substring(0, 15) + "..."
                      : itemRow.item.content}{" "}
                    | {moment(itemRow.item.Date).format("DD/MM/yyyy")}
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    marginLeft: 12,
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={styles.postContent}>
                    <MaterialCommunityIcons
                      raised
                      name="comment"
                      size={18}
                      color="skyblue"
                      // onPress={() => console.log("ss")}
                    />{" "}
                    {itemRow.item.comments.length}
                  </Text>

                  <Text style={styles.postContent}>
                    <MaterialCommunityIcons
                      raised
                      name="heart"
                      size={18}
                      color="red"
                      // onPress={() => console.log("ss")}
                    />{" "}
                    {itemRow.item.likes.length}
                  </Text>

                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <View style={{ backgroundColor: "#5D576B" }}>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            width: "80%",
            alignItems: "center",
            padding: 22,
            opacity: 0.8,
            borderTopLeftRadius: 20,
            borderBottomEndRadius: 20,
            marginBottom: 12,
            backgroundColor: "#89f",
            marginTop: 12,
          }}
          onPress={() =>
            props.navigation.navigate("AddNew", { author: username })
          }
        >
          <Text style={styles.add}>Add New Discussion</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export const screenOption = (navData) => {
  return {
    headerTitle: "Hello " + navData.route.params.username,
  };
};

export default Discussions;
