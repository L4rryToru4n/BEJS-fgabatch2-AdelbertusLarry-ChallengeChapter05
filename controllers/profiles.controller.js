const PROFILES = require("../models/profiles.model");

async function getProfiles(req, res) {
  try {
    let profile = await PROFILES.getProfiles();

    const data = JSON.stringify(profile, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(404).json({
      "status": false,
      "message": "No profiles have been found."
    });
  }
}

async function getProfile(req, res) {
  try {
    const profile_id = req.params.id;
    let profile = await PROFILES.getProfile(profile_id);

    const data = JSON.stringify(profile, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(404).json({
      "status": false,
      "message": "No profile has been found."
    });
  }
}

async function createProfile(req, res) {
  try {
    const body = req.body;
    let profile = await PROFILES.createProfile(body);

    const data = JSON.stringify(profile, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({
      "status": false,
      "message": "Create profile failed. Please complete your data request."
    });
  }
}

async function updateProfile(req, res) {
  try {
    const body = req.body;
    const profile_id = req.params.id
    let profile = await PROFILES.updateProfile(profile_id, body);

    const data = JSON.stringify(profile, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      "status": false,
      "message": "Update profile failed. Please complete your data request."
    });
  }
}

async function deleteProfile(req, res) {
  try {
    const profile_id = req.params.id
    let profile = await PROFILES.deleteProfile(profile_id);

    const data = JSON.stringify(profile, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      "status": false,
      "message": "Delete profile failed. Please complete your data request."
    });
  }
}

module.exports = {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile
};