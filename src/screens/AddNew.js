import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { baseURL } from "../utility/consts";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const AddNew = (props) => {
  const [dbURL, setdbURL] = useState("");
  const [isLoding, setIsLoding] = useState(false);
  const [SelectedImage, setSelectedImage] = useState(null);
  const [author, setAuthor] = useState(props.route.params.author);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const selectImageFromCamera = async () => {
    try {
      let permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.granted == false) {
        console.log("We need your permission to use your media");
        return;
      }
      let pickerResults = await ImagePicker.launchCameraAsync();
      setSelectedImage({ localUri: pickerResults.uri });
    } catch (error) {
      console.log(error);
    }
  };

  const MakeItHot = async () => {
    setIsLoding(true);
    if (content == "" || title == "" || SelectedImage == null) {
      setIsLoding(false);
      Alert.alert("Please fill allData");
    } else {
      const source = SelectedImage.localUri;
      const newFile = {
        file: SelectedImage.file,
        uri: source,
        type: `test/${source.split(".")[1]}`,
        name: `test.${source.split(".")[1]}`,
      };
      const data = new FormData();
      data.append("file", newFile);
      data.append("upload_preset", "ml_default"); // folder
      data.append("cloud_name", "diqd3odjk"); // wepsite
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/diqd3odjk/image/upload",
        {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const results = await res.json();

      const newDis = await fetch(baseURL + "/dis/uploadDisccusionSub", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          author: author,
          postImage: results.secure_url,
        }),
      });
      const response = await newDis.json();
      console.log(response);
      if (response.status) {
        console.log(response);
        setIsLoding(false);
        Alert.alert("uploded");
      } else {
        setIsLoding(false);
        Alert.alert("not uploded");
      }
    }
  };
  const selectImageFromGallery = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted == false) {
      Alert.alert("Please provide a media library permission");
      return;
    }
    let pickerResults = await ImagePicker.launchImageLibraryAsync();
    setSelectedImage({ localUri: pickerResults.uri });
  };

  return (
    <View style={styles.container}>
      {SelectedImage == null ? (
        <Text
          style={{
            fontSize: 21,
            fontWeight: "bold",
            color: "#55d",
            shadowColor: "black",
            shadowOpacity: 0.25,
          }}
        >
          {" "}
          Please upload image{" "}
        </Text>
      ) : (
        <Avatar
          size={250}
          avatarStyle={{
            borderRadius: 25,
          }}
          source={{
            uri: SelectedImage.localUri,
          }}
        />
      )}
      <View
        style={{
          width: "100%",
          padding: 6,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <FontAwesome5
          raised
          name="image"
          size={35}
          color="green"
          onPress={() => selectImageFromGallery()}
          style={{
            paddingRight: 10,
          }}
        />
        <FontAwesome5
          raised
          name="camera"
          size={35}
          color="green"
          onPress={() => selectImageFromCamera()}
          style={{
            paddingLeft: 10,
            marginRight: 12,
          }}
        />
      </View>
      <TextInput
        placeholder="title"
        placeholderTextColor={"grey"}
        style={styles.body}
        onChangeText={(text) => setTitle(text)}
      />

      <TextInput
        placeholder="content"
        placeholderTextColor={"grey"}
        style={styles.body}
        onChangeText={(text) => setContent(text)}
      />

      <TouchableOpacity
        style={{
          padding: 20,
          width: "45%",
          alignItems: "center",
          backgroundColor: "#dcf",
        }}
        onPress={() => MakeItHot()}
      >
        <Text>make it hot </Text>
      </TouchableOpacity>
    </View>
  );
};
export const screenOption = (navData) => {
  return {
    headerTitle: "Let's Talk ",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    backgroundColor: "#dcd",
    padding: 22,
    width: "90%",
    alignContent: "center",
    margin: 12,
  },
});

export default AddNew;
