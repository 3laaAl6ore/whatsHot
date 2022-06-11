import React, {useState} from "react";
import { View, Text, TextInput, Alert,
     TouchableOpacity, StyleSheet} from 'react-native';

const Login = props => {

    const [username, setUsername] = useState("hello");

    const letstalk = () => {
        if(username != ''){
            props.navigation.navigate('Discussions', {username: username});
        } else {
            Alert.alert('Please enter your name');
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome to WhatsHOT
            </Text>
            <Text style={styles.context}>
                Please enter your name to start a new discussion or comment to others
            </Text>
            <TextInput
                style={styles.input}
                keyboardType="default"
                value={username}
                placeholder="Enter Your Name"
                placeholderTextColor={"white"}
                onChangeText={text => setUsername(text)}
            />
            <TouchableOpacity onPress={letstalk} style={styles.btn}>
                <Text style={styles.btnText}>Let's Talk</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn:{
        width:'100%',
        marginTop:12,
        alignItems:'center',
        paddingVertical:20,
        borderRadius:15,
        backgroundColor:'#5D576B'
    },
    context:{
        textAlign:'center',
        fontSize:18,
        color:'#393334',
        fontWeight:'400'
    },
    title:{
        fontSize:28,
        color:'#aacc',
        fontWeight:'bold'
    },
    btnText:{
        fontSize:18,
        color:'white',
        fontWeight:'bold'
    },
    input: {
        marginTop:20,
        width:'100%',
        paddingVertical:20,
        borderRadius:10,
        paddingHorizontal:20,
        fontSize:18,
        backgroundColor:'#1aa'
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      padding:30
    },
  });
  
export default Login;