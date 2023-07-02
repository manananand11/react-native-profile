import React, { useEffect, useState } from "react";
import { Modal, TextInput, View, StyleSheet, Text, ScrollView } from "react-native";
import Background from "./Background";
import Button from "../components/Button";
import { IconButton } from "react-native-paper";

const EditExpProfileModal = ({ visible, onClose, onSave, userData }) => {
  const [experiences, setExperiences] = useState([]);
  const [educationalQualifications, setEducationalQualifications] = useState([]);
  const [editedPhone, setEditedPhone] = useState("");

  useEffect(() => {
    if (userData && userData.experiences) {
      setExperiences(userData.experiences);
      setEducationalQualifications(userData.educationalQualifications);
      setEditedPhone(userData.phone);
    }
  }, [userData]);

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const handleDeleteExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedQualifications = [...educationalQualifications];
    updatedQualifications[index][field] = value;
    setEducationalQualifications(updatedQualifications);
  };

  const handleDeleteEducation = (index) => {
    const updatedQualifications = [...educationalQualifications];
    updatedQualifications.splice(index, 1);
    setEducationalQualifications(updatedQualifications);
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { designation: "", organisation: "", startDate: "", endDate: "" },
    ]);
  };

  const handleAddEducation = () => {
    setEducationalQualifications([
      ...educationalQualifications,
      { degree: "", schoolName: "", percentage: "", year: "" },
    ]);
  };

  const handleSaveChanges = () => {
    const updatedData = {
      phone: editedPhone,
      experiences: experiences,
      educationalQualifications: educationalQualifications,
    };
    console.log(updatedData);
    onSave(updatedData);
  };

  return (
    <Background>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text>Experience</Text>
              <View style={styles.experienceContainer}>
                {experiences.map((experience, index) => (
                  <View key={index} style={styles.experienceItemContainer}>
                    <TextInput
                      style={styles.experienceInput}
                      value={experience.designation}
                      onChangeText={(text) =>
                        handleExperienceChange(index, "designation", text)
                      }
                      placeholder="Designation"
                    />
                    <TextInput
                      style={styles.experienceInput}
                      value={experience.organisation}
                      onChangeText={(text) =>
                        handleExperienceChange(index, "organisation", text)
                      }
                      placeholder="Organisation"
                    />
                    <TextInput
                      style={styles.experienceInput}
                      value={experience.startDate}
                      onChangeText={(text) =>
                        handleExperienceChange(index, "startDate", text)
                      }
                      placeholder="Start Date"
                    />
                    <TextInput
                      style={styles.experienceInput}
                      value={experience.endDate}
                      onChangeText={(text) =>
                        handleExperienceChange(index, "endDate", text)
                      }
                      placeholder="End Date"
                    />
                    <IconButton
                      icon="close"
                      size={20}
                      color="red"
                      onPress={() => handleDeleteExperience(index)}
                      style={styles.deleteButton}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.addButtonContainer}>
                <IconButton
                  icon="plus"
                  size={30}
                  color="#fff"
                  onPress={handleAddExperience}
                  style={styles.addButton}
                />
              </View>
              <Text>Education</Text>
              <View style={styles.educationContainer}>
                {educationalQualifications.map((education, index) => (
                  <View key={index} style={styles.educationItemContainer}>
                    <TextInput
                      style={styles.educationInput}
                      value={education.degree}
                      onChangeText={(text) =>
                        handleEducationChange(index, "degree", text)
                      }
                      placeholder="Degree"
                    />
                    <TextInput
                      style={styles.educationInput}
                      value={education.schoolName}
                      onChangeText={(text) =>
                        handleEducationChange(index, "schoolName", text)
                      }
                      placeholder="School Name"
                    />
                    <TextInput
                      style={styles.educationInput}
                      value={education.percentage}
                      onChangeText={(text) =>
                        handleEducationChange(index, "percentage", text)
                      }
                      placeholder="Percentage"
                    />
                    <TextInput
                      style={styles.educationInput}
                      value={education.year}
                      onChangeText={(text) =>
                        handleEducationChange(index, "year", text)
                      }
                      placeholder="Year"
                    />
                    <IconButton
                      icon="close"
                      size={20}
                      color="red"
                      onPress={() => handleDeleteEducation(index)}
                      style={styles.deleteButton}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.addButtonContainer}>
                <IconButton
                  icon="plus"
                  size={30}
                  color="#fff"
                  onPress={handleAddEducation}
                  style={styles.addButton}
                />
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={handleSaveChanges}>
                Save Changes
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button mode="outlined" onPress={onClose}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Background>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
  },
  experienceContainer: {
    marginBottom: 15,
  },
  experienceItemContainer: {
    flexDirection: "column",
    marginBottom: 20,
  },
  experienceInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  educationContainer: {
    marginBottom: 20,
  },
  educationItemContainer: {
    flexDirection: "column",
    marginBottom: 10,
  },
  educationInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  deleteButton: {
    position: "absolute",
    top: 178,
    right: 77,
    backgroundColor:"red"
  },
  addButtonContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007aff",
    borderRadius: 100,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default EditExpProfileModal;
