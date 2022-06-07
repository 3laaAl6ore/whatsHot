import { Text, View, TouchableOpacity, Image, FlatList , ActivityIndicator} from "react-native";
import React, { useState ,useEffect } from "react";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../utility/DiscussionsStyle.js";
import { useSelector } from "react-redux";

const MostRecent = (props, { navigation }) => {
  console.log("---------in most recent--two ---------");
  //console.log(props);
  const allDisccusions = useSelector((state) => state.allData);

  const data = allDisccusions?.allData?.Disccusions;

  const sorted = () => {
   return data?.sort((x, y) => {
      return x.Date < y.Date;
    });
  
  };
  const sortedData = sorted();

  useEffect(()=>{
    sorted();
  },[sorted])

  const username = props.username;
  return (
    <View>
  
            <FlatList
        data={sortedData}
        keyExtractor={(item) => item._id}
        horizontal
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
                    style={styles.avatar}
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

            <View style={{ width: "50%", marginLeft: 10 }}>
              <Text style={styles.postTitle}>
                {itemRow.item.title.length > 15
                  ? itemRow.item.title.substring(0, 15) + "..."
                  : itemRow.item.title}{" "}
                | {itemRow.item.author}
              </Text>
              <Text style={styles.postContent}>
                {itemRow.item.content.length > 250
                  ? itemRow.item.content.substring(0, 249) + "..."
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

export default MostRecent;
