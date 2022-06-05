import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Picker = () =>{
  const [SelectedImage, setSelectedImage] = useState(null);
  const [dbURL, setdbURL] = useState("");
  const [isLoding, setIsLoding] = useState(false);
  
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

  const UploadToCloudinary = async () => {
    try {
      console.log(SelectedImage);
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

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/diqd3odjk/image/upload",
        {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const results = await response.json();

      setdbURL(results.secure_url);
    } catch (error) {
      console.log(error);
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
            paddingRight:10,
            }}
        />
        {
            SelectedImage == null ?
            (
                <Avatar
                size={60}
                title="fuck off"
                source={{
                  uri:
                  "https://tse1.mm.bing.net/th?id=OIP.DfbvP4LXGsNlhGino3DA6QHaHa&pid=Api&P=0&w=169&h=169"
                }}
              />
            ):(
                <Avatar
                size={60}
                title="fuck off"
                source={{
                  uri:
                  SelectedImage.localUri
                }}
              />
            )
        }
        <FontAwesome5
          raised
          name="camera"
          size={35}
          color="green"
          onPress={() => selectImageFromCamera()}
          style={{
            paddingLeft:10,
            }}
        />
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#Acd",
  },
});
export default Picker;