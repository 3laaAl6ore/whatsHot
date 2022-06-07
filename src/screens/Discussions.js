import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { baseURL } from "../utility/consts";
import { styles } from "../utility/DiscussionsStyle.js";
import MostRecent from "../components/MostRecent.js";
import Hoter from "../components/Hoter.js";
import Oldest from "../components/Oldest.js";

import { useDispatch, useSelector } from "react-redux";
import * as disActions from "../../store/GetAllDataAction";

const Discussions = (props) => {
  const [allData, setAllData] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(props.route.params.username);
  const [refreshing, setRefreshing] = useState(false);

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

  //const allDisccusions = useSelector((state) => state.allData);
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? (
        <ActivityIndicator color="#F7567C" size="large" />
      ) : (
        <View style={{ width: "100%", height: "100%" }}>
          <Text style={styles.category}> Most Recent </Text>
          <MostRecent username={username}  navigation={props.navigation}/>

          <Text style={styles.category}> Most Hot </Text>
            <Hoter  username={username} navigation={props.navigation} /> 

            <Text style={styles.category}> Most old </Text>
            <Oldest  username={username} navigation={props.navigation} /> 


          <View style={{ shadowColor: "black", shadowOpacity: 0.3 }}>
            <TouchableOpacity
              style={styles.btnAdd}
              onPress={() =>
                props.navigation.navigate("AddNew", { author: username })
              }
            >
              <Text style={styles.add}>Add New Discussion |</Text>
              <MaterialCommunityIcons
                raised
                name="plus-box-outline"
                size={30}
                color="#8aa"
                style={{
                  marginLeft: 2,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export const screenOption = (navData) => {
  return {
    headerTitle: "Hello " + navData.route.params.username,
  };
};

export default Discussions;
