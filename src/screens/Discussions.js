import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { styles } from "../utility/DiscussionsStyle.js";
import Hoter from "../components/Hoter.js";
import OrderBy from "../components/OrderBy.js";

import { useDispatch, useSelector } from "react-redux";
import * as disActions from "../../store/GetAllDataAction";

const Discussions = (props) => {
  const [loading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(props.route.params.username);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderMethod, setOrderMethod] = useState("R");
  const [author, setAuthor] = useState("");
  const [search, setIsSearch] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllData();

    wait(2000).then(() => setRefreshing(false));
  }, []);

  ///------------//
  const dispatch = useDispatch();

  const getAllData = useCallback(async () => {
    let action = disActions.get_disccusion_action();
    setIsLoading(true);
    try {
      await dispatch(action);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, [setIsLoading, dispatch, disActions.get_disccusion_action]);

  useEffect(() => {
    getAllData();
  }, []);

  const allDisccusions = useSelector((state) => state.allData);

  const FindAuthorDisccusions = () => {
    setIsSearch(true);
    if (author === "")
      return setIsSearch(false) & Alert.alert("Please Type The Author Name"); //the beauty of javascript (glad that you arrived here :) )
    const data = allDisccusions?.allData?.Disccusions;

    const filterData = data?.filter((x) => {
      return x.author.toUpperCase() === author.toUpperCase();
    });
    if (filterData.length > 0) {
      console.log(data.length);
      setOrderMethod("A");
      setIsSearch(false);
      return (
        <Hoter
          username={username}
          navigation={props.navigation}
          by={orderMethod}
          author={author}
        />
      );
    }
    setIsSearch(false);
    return Alert.alert("author not found");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}

      >
        {loading ? (
          <ActivityIndicator color="#F7567C" size="large" />
        ) : (
          <View style={{ width: "100%", height: "100%", marginTop: 10 }}>
            <View style={{ flexDirection: "row", paddingVertical: 8 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.category}> Whats HOT </Text>
              </View>
              <View>
                <MaterialCommunityIcons
                  color={"#8aa"}
                  name="filter-variant-plus"
                  size={30}
                  style={{ alignSelf: "flex-end", marginRight: 12 }}
                  onPress={() => setModalVisible(!modalVisible)}
                />
                <OrderBy
                  setModalVisible={setModalVisible}
                  modalVisible={modalVisible}
                  setOrderMethod={setOrderMethod}
                />
              </View>
            </View>
            {search ? (
              <ActivityIndicator color={"#a11"} size={"large"} />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: "40%",
                  borderBottomColor: "#1aa",
                  borderBottomWidth: 0.8,
                  marginBottom: 15,
                }}
              >
                <Hoter
                  username={username}
                  navigation={props.navigation}
                  by={orderMethod}
                  author={author}
                />
              </View>
            )}
            <View >
              <Text
                style={styles.txt}
              >
                are you looking for a specific author ?
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={{
                    padding: 15,
                    backgroundColor: "white",
                    width: "75%",
                    shadowColor: "#8aa18a",
                    shadowOpacity: 1,
                    marginBottom:18
                  }}
                  value={author}
                  onChangeText={(text) => setAuthor(text)}
                  placeholder="type the name of the author"
                  placeholderTextColor={"grey"}
                  keyboardType="default"
                />
                <MaterialCommunityIcons
                  name="account-search-outline"
                  size={35}
                  color={"#18a"}
                  onPress={() => FindAuthorDisccusions()}
                  style={{ marginLeft: 17 }}
                />
              </View>
            </View>

            <View
              style={{
                shadowColor: "black",
                shadowOpacity: 0.3,
                alignItems:"center",
                marginTop:30
              }}
            >
              < Text style={styles.txt} >  Lets Make it Hot |   </Text>
              <TouchableOpacity
                style={styles.btnAdd}
                onPress={() =>
                  props.navigation.navigate("AddNew", { author: username })
                }
              >
                <Text style={styles.add}>Add New Discussion |</Text>
                <FontAwesome5
                  raised
                  name="fire-alt"
                  size={28}
                  color="#15ab"
                  style={{
                    marginLeft: 2,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export const screenOption = (navData) => {
  return {
    headerTitle: "Hello " + navData.route.params.username,
  };
};

export default Discussions;
