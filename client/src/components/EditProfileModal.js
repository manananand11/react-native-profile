import React, { useEffect, useState } from "react";
import { Modal, TextInput, View, StyleSheet, Text } from "react-native";
import Background from "./Background";
import Button from "../components/Button";
import { IconButton } from "react-native-paper";

const EditProfileModal = ({ visible, onClose, onSave, userData }) => {
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedDesignation, setEditedDesignation] = useState("");
  const [editedAbout, setEditedAbout] = useState("");
  const [editedSkills, setEditedSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (userData) {
      setEditedName(userData.name);
      setEditedEmail(userData.email);
      setEditedPhone(userData.phone);
      setEditedDesignation(userData.designation);
      setEditedAbout(userData.about);
      setEditedSkills(userData.skillSets || []);
    }
  }, [userData]);

  const handleSaveChanges = () => {
    const updatedData = {
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
      designation: editedDesignation,
      about: editedAbout,
      skillSets: editedSkills,
    };
    onSave(updatedData);
  };
  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setEditedSkills([...editedSkills, newSkill]);
      setNewSkill("");
    }
  };
  const handleDeleteSkill = (index) => {
    const updatedSkills = [...editedSkills];
    updatedSkills.splice(index, 1);
    setEditedSkills(updatedSkills);
  };

  return (
    <Background>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Name"
            />
            <TextInput
              style={styles.modalInput}
              value={editedDesignation}
              onChangeText={setEditedDesignation}
              placeholder="Designation"
            />
            <TextInput
              style={styles.modalInput}
              value={editedEmail}
              onChangeText={setEditedEmail}
              placeholder="Email"
            />
            <TextInput
              style={[styles.modalInput , { backgroundColor: '#f0f0f0' }]}
              value={editedPhone}
              onChangeText={setEditedPhone}
              placeholder="Phone"
              editable={false}
              
            />
            <TextInput
              style={styles.modalInput}
              value={editedAbout}
              onChangeText={setEditedAbout}
              placeholder="About"
            />
            <View style={styles.skillContainer}>
              <View style={styles.skillItemContainer}>
                {editedSkills.map((skill, index) => (
                  <View style={styles.skillItem} key={index}>
                    <Text>{skill}</Text>
                    <IconButton
                      icon="close"
                      size={20}
                      color="red"
                      onPress={() => handleDeleteSkill(index)}
                      style={styles.deleteButton}
                    />
                  </View>
                ))}
              </View>

              <View style={styles.skillInputContainer}>
                <TextInput
                  style={styles.skillInput}
                  value={newSkill}
                  onChangeText={setNewSkill}
                  placeholder="Add Skill"
                />
                <View style={styles.skillButton}>
                  <Button mode="contained" onPress={handleAddSkill}>
                    Add
                  </Button>
                </View>
              </View>
            </View>
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
  },
  modalInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  skillButton: {
    flexWrap: "wrap",
  },
  skillContainer: {
    marginBottom: 10,
  },
  skillItemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  skillInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  skillInput: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: -23,
    right: -23,
  }
});

export default EditProfileModal;
