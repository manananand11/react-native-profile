import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import EditProfileModal from "../components/EditProfileModal";
import EditExpProfileModal from "../components/EditExpProfileModal";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, IconButton } from "react-native-paper";
import API_URL from "../constants/apiConfig";

export default function Dashboard({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [expModalVisible, setExpModalVisible] = useState(false);
  const [avatarUri, setAvatarUri] = useState(
    "https://cdn-icons-png.flaticon.com/512/3178/3178179.png"
  );
  const [activeTab, setActiveTab] = useState("experience");

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

      fetch(API_URL + "api/dashboard", {
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
    AsyncStorage.removeItem("authToken");

    // Reset navigation to the StartScreen
    navigation.reset({
      index: 0,
      routes: [{ name: "StartScreen" }],
    });
  };
  const handleEditProfile = () => {
    setModalVisible(true);
  };
  const handleEditExperience = () => {
    console.log("exp");
    setExpModalVisible(true);
  };
  const handleSaveChanges = (updatedData) => {
    console.log(updatedData + "this is");
    fetch(API_URL + "api/dashboard", {
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
        setExpModalVisible(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSelectImage = async () => {
    console.log("Change Image");
  };

  return (
    <Background>
      <EditProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveChanges}
        userData={userData}
      />
      <EditExpProfileModal
        visible={expModalVisible}
        onClose={() => setExpModalVisible(false)}
        onSave={handleSaveChanges}
        userData={userData}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <IconButton
              icon="logout"
              color="#FFF"
              size={20}
              style={styles.logoutButton}
              onPress={handleLogout}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <IconButton
            icon="pencil"
            color="#000"
            size={20}
            onPress={handleEditProfile}
            style={styles.editButton}
          />

          <View style={styles.imageContainer}>
            <Image style={styles.avatar} source={{ uri: avatarUri }} />

            <IconButton
              icon="close"
              size={20}
              color="red"
              onPress={handleSelectImage}
              style={styles.photoButton}
            />
          </View>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.designation}>{userData.designation}</Text>
          {/* <Text style={styles.info}>{userData.email}</Text> */}
          <View style={styles.contactContainer}>
            <IconButton
              icon="card-account-phone"
              color="#FFF"
              size={20}
              style={styles.logoutButton}
              onPress={handleLogout}
            />
            <Text style={styles.contactText}>{userData.phone}</Text>
          </View>
          <View style={styles.contactContainer}>
            <IconButton
              icon="email"
              color="#FFF"
              size={20}
              style={styles.logoutButton}
              onPress={handleLogout}
            />
            <Text style={styles.contactText}>{userData.email}</Text>
          </View>

          {/* <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => {}} style={styles.button}>
              Message
            </Button>
            <Button mode="contained" onPress={() => {}} style={styles.button}>
              Connect
            </Button>
          </View> */}
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.heading}>About Me</Text>
          <Paragraph style={styles.paragraph}>{userData.about}</Paragraph>
        </View>

        <View style={styles.skillsContainer}>
          <Text style={styles.heading}>Skills</Text>
          <View style={styles.skillItemContainer}>
            {userData.skillSets.map((skill, index) => (
              <View style={styles.skillItem} key={index}>
                <Text>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.experienceContainer}>
          <IconButton
            icon="pencil"
            color="#000"
            size={20}
            onPress={handleEditExperience}
            style={styles.expButton}
          />
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "experience" && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab("experience")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "experience" && styles.activeTabText,
                ]}
              >
                Past Experience
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "education" && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab("education")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "education" && styles.activeTabText,
                ]}
              >
                Education
              </Text>
            </TouchableOpacity>
          </View>
          {activeTab === "experience" && (
            <View style={styles.tabContent}>
              {userData.experiences.map((experience, index) => (
                <View key={index} style={styles.expContainer}>
                  <Text style={styles.designation}>
                    {experience.designation}
                  </Text>
                  <Text style={styles.tabContentText}>
                    {experience.organisation}
                  </Text>
                  <Text style={styles.tabContentText}>
                    {experience.startDate} - {experience.endDate}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === "education" && (
            <View style={styles.tabContent}>
              {userData.educationalQualifications.map(
                (educationalQualification, index) => (
                  <View key={index} style={styles.expContainer}>
                    <Text style={styles.designation}>
                      {educationalQualification.degree}-{" "}
                      {educationalQualification.year}
                    </Text>
                    <Text style={styles.tabContentText}>
                      {educationalQualification.schoolName}
                    </Text>
                    <Text style={styles.tabContentText}>
                      {educationalQualification.percentage}
                    </Text>
                  </View>
                )
              )}
            </View>
          )}
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#F5F5F5",
    height: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 20,
    marginBottom: 20,
  },
  logoutButton: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
  },
  profileContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 20,
  },
  imageContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 22,
    color: "#000",
    fontWeight: "600",
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginBottom: 10,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  contactText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 5,
  },
  designation: {
    fontSize: 16,
    color: "#696969",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    width: "50%",
  },
  aboutContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "#000",
    lineHeight: 24,
  },
  skillItemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillsContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  skills: {
    fontSize: 16,
    color: "#000",
    lineHeight: 24,
  },
  skillItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  experienceContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  activeTabText: {
    color: "#000",
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  expButton: {
    position: "absolute",
    top: -10,
    right: 10,
  },
  photoButton: {
    position: "absolute",
    top: -5,
    right: -7,
    backgroundColor: "red",
  },
  tabContentContainer: {
    marginTop: 20,
  },
  tabContent: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabContentText: {
    fontSize: 14,
  },
  expContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
});
