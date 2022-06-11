import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../utility/DiscussionsStyle.js";
import { useSelector } from "react-redux";

const Hoter = (props) => {
  console.log("---------in Hoter-------");
  const allDisccusions = useSelector((state) => state.allData);

  const data = allDisccusions?.allData?.Disccusions;

  const orderBy = props.by;
  const author = props.author;

  const sorted = () => {
    switch (orderBy) {
      case "H":
        return data?.sort((x, y) => {
          return (
            x.likes.length + x.comments.length <
            y.likes.length + y.comments.length
          );
        });
      case "O":
        return data?.sort((x, y) => {
          return x.Date > y.Date;
        });
      case "R":
        return data?.sort((x, y) => {
          return x.Date < y.Date;
        });
      case "A":
        const authorDis = data?.filter((x) => {
          return x.author.toUpperCase() === author.toUpperCase();
        });
        if (authorDis.length > 0) return authorDis;
        else {
          return data?.sort((x, y) => {
            return (
              x.likes.length + x.comments.length <
              y.likes.length + y.comments.length
            );
          });
        }

      default:
        break;
    }
  };

  const sortedData = sorted();

  useEffect(() => {
    sorted();
  }, [sorted]);
  //console.log("as");
  //console.log(sortedData);
  //console.log(author);
  const username = props.username;
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item._id}
        horizontal
        refreshing
        showsHorizontalScrollIndicator={false}
        onEndReached={() => Alert.alert("you get to the end")}
        renderItem={(itemRow) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("DiscussionDetails", {
                discussion: itemRow.item,
                username: username,
              });
            }}
            style={styles.item}
          >
            <View>
              <View style={{ width: "100%", height: 150 }}>
                {itemRow.item.postImage ? (
                  <Image
                    source={{ uri: itemRow.item.postImage }}
                    style={styles.postImage}
                  />
                ) : (
                  <Image
                    source={{ uri: itemRow.item.authorAvatar }}
                    style={styles.postImage}
                  />
                )}
              </View>

              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  raised
                  name="comment-outline"
                  size={18}
                  //color="black"
                />
                <Text style={styles.postContent}>
                  {itemRow.item.comments.length} |
                </Text>

                <MaterialCommunityIcons
                  raised
                  name="heart"
                  size={18}
                  color="red"
                  // onPress={() => console.log("ss")}
                />
                <Text style={styles.postContent}>
                  {itemRow.item.likes.length}
                </Text>
              </View>
            </View>

            <View style={{ width: "100%", marginLeft: 3 }}>
              <Text style={styles.postTitle}>
                {itemRow.item.title.length > 35
                  ? itemRow.item.title.substring(0, 34) + "..."
                  : itemRow.item.title}{" "}
                | {itemRow.item.author}
              </Text>
              <Text style={styles.postContent}>
                {itemRow.item.content.length > 210
                  ? itemRow.item.content.substring(0, 209) + "..."
                  : itemRow.item.content}{" "}
                |
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#5D576B",
                  fontWeight: "800",
                  shadowOpacity: 0.1,
                  shadowColor: "black",
                }}
              >
                {moment(itemRow.item.Date).format("DD/MM/yyyy")}{" "}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Hoter;
