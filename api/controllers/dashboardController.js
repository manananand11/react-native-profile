// dashboardController.js

const User = require("../models/user");

const getDashboard = async (req, res) => {
  try {
    const { phone } = req.user;
    const user = await User.findOne({ phone }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error getting dashboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createProfile = async (req, res) => {
  try {
    const { phone } = req.user;
    const {
      photo,
      name,
      email,
      experiences,
      skillSets,
      educationalQualifications,
      designation,
      about,
    } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { phone },
      {
        photo,
        name,
        email,
        experiences,
        skillSets,
        educationalQualifications,
        designation,
        about,
      },
      { new: true, upsert: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { phone } = req.user;
    const {
      photo,
      name,
      email,
      experiences,
      skillSets,
      educationalQualifications,
      designation,
      about,
    } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { phone },
      {
        photo,
        name,
        email,
        experiences,
        skillSets,
        educationalQualifications,
        designation,
        about,
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getDashboard, createProfile, updateProfile };
