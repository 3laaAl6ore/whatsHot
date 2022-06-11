import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

const OrderBy = (props) => {
  const Order = (val) => {
    switch (val) {
      case "O":
        props.setOrderMethod("O");
        props.setModalVisible(!props.modalVisible);
        break;
      case "H":
        props.setOrderMethod("H");
        props.setModalVisible(!props.modalVisible);
        break;
      case "R":
        props.setOrderMethod("R");
        props.setModalVisible(!props.modalVisible);
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView>
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
              shadowOpacity: 0.31,
              shadowRadius: 20,
              shadowColor: "black",
              height: "50%",
              backgroundColor: "white",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                alignSelf: "center",
                color: "#8aa",
                shadowColor: "#5D576B",
                shadowOpacity: 0.4,
                marginTop: 8,
              }}
            >
              how you want to order the discussions
            </Text>
            <TouchableOpacity
              onPress={() => {
                Order("R");
              }}
              style={styles.orderBy}
            >
              <Text style={styles.orderTitle}>Most Recent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Order("H");
              }}
              style={styles.orderBy}
            >
              <Text style={styles.orderTitle}>Most Hot</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Order("O");
              }}
              style={styles.orderBy}
            >
              <Text style={styles.orderTitle}>Most Old</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default OrderBy;

const styles = StyleSheet.create({
  orderBy: {
    alignItems: "center",
    width: "80%",
    borderRadius: 20,
    backgroundColor: "#89cd",
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
  },
  orderTitle: {
    fontSize: 17,
    color: "#FCFCFC",
    shadowColor: "black",
    shadowOpacity: 0.9,
    fontWeight: "bold",
  },
});
