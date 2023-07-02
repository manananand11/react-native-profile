import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import EditProfileModal from "../components/EditProfileModal";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "react-native-paper";

export default function Dashboard({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarUri, setAvatarUri] = useState(
    "https://cdn-icons-png.flaticon.com/512/3178/3178179.png"
  );

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setAuthToken(token);
          console.log(token);
        }
      } catch (error) {
        console.error("Error retrieving auth token:", error);
      }
    };

    getAuthToken();
  }, []);

  useEffect(() => {
    if (authToken) {
      // Fetch user data from the API (requires authentication)

      fetch("http://127.0.0.1:3000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching user data");
          }
          return response.json();
        })
        .then((data) => {
          // Handle successful data retrieval
          console.log("User data:", data);
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [authToken]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    // Reset navigation to the StartScreen
    navigation.reset({
      index: 0,
      routes: [{ name: "StartScreen" }],
    });
  };
  const handleEditProfile = () => {
    setModalVisible(true);
  };
  const handleSaveChanges = (updatedData) => {
    fetch("http://127.0.0.1:3000/api/dashboard", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating user data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User data updated:", data);
        setUserData(data);
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Background>
      <EditProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveChanges}
        userData={userData}
      />
      <Logo></Logo>
      <View style={styles.container}>
        <View style={styles.header}></View>

        <Image style={styles.avatar} source={{ uri: avatarUri }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.info}>{userData.email}</Text>
            <Text style={styles.description}>{userData.phone}</Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleEditProfile}
            >
              <Text>Edit</Text>
            </TouchableOpacity>
            <Button mode="outlined" onPress={handleLogout}>
              Logout
            </Button>
          </View>
        </View>
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 230,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    overflow: 'hidden',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
    color: "white",
  },
});
