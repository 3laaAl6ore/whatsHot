import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import React ,{useState}from "react";
import {baseURL}from "../utility/consts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const ShowAllComments = (props) => {
  const comments = props.comments;
  const disccusionId = props.disccusionId;
  console.log("arrive");
  console.log(props);
  ///likeComment/:disccusionId/:commentId
  const [color , setColor] = useState("#88a");

  const SendLikeToComment = async(commentItem) => {
    const data = await fetch(baseURL + "/dis/likeComment/"+disccusionId+"/"+commentItem._id,{
      method:"put",
      headers:{ 
        'Content-Type':'application/json'
      }
    });
    const response = await data.json();
  //  console.log(response);
  
  }

  return (
    <View>
      <Modal
        animationType="content"
        visible={props.modalVisible}
        transparent={true}
        style={{ flex: 1 }}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
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
                    borderBottomColor: "#58a",
                    borderBottomWidth: 2,
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
                      {/* {itemRow.item._id} */}
                    </Text>
                    <View>
                      <MaterialCommunityIcons
                        name="heart"
                        size={25}
                        color={color}
                        style={{
                          alignSelf: "flex-end",
                          paddingEnd: 15,
                          marginTop: -33,
                        }}
                        onPress={() =>SendLikeToComment(itemRow.item)}

                        
                        />
                      <Text
                        style={{
                          fontSize: 15,
                          paddingEnd: 15,
                          paddingBottom: 15,
                          color: "black",
                          alignSelf: "flex-end",
                        }}
                      >
                        {" "}
                        {itemRow.item.likes.length >0 ?itemRow.item.likes.length:""}{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
            <TouchableOpacity
              onPress={() => {
                props.setModalVisible(!props.modalVisible);
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
  );
};

export default ShowAllComments;

const styles = StyleSheet.create({});
