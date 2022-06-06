import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React from "react";

const ShowAllComments = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ padding: 5 }}>
      <Modal
        animationType="fade"
        visible={isVisible}
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
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "95%",
              // padding: 30,
              //  margin: 30,
              borderRadius: 10,
              // shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/face3_cbnzio.png",
              }}
              resizeMode="cover"
              style={{ height: "50%", width: 90 }}
            />

            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{
                alignItems: "center",
                width: "100%",
                paddingVertical: 20,
                borderRadius: 10,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                }}
              >
                GOT IT!
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
