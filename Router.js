const express = require("express");
const model = require("./Model");
const multer = require("multer");
const route = express.Router();
//const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwb2p1beg",
  api_key: "322161612968939",
  api_secret: "C6NcXplFwdHcQBay5HdcfAeJ0ww",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb("unsuported format");
  }
};

const ImageUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 25,
  },
});

route.post("/", ImageUpload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const newData = {
      name: req.body.name,
      department: req.body.department,
      image: result.secure_url,
      cloud_id: result.public_id,
    };
    const newEntry = await model.create(newData);
    res.status(200).json({
      message: "created successfully",
      data: newData,
    });
  } catch (error) {
    res.json(error.message);
  }
});

route.get("/", async (req, res) => {
  try {
    //const result = await cloudinary.uploader.upload(req.file.path);
    const newData = await model.find();
    res.status(200).json({ newData });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

route.get("/id", async (req, res) => {
  try {
    const newData = await model.findById(req.params.id);
    res.status(200).json({
      message: "found successfully",
      data: newData,
    });
  } catch (err) {
    res.json(err.message);
  }
});

route.patch("/id", ImageUpload.single("image"), async (req, res) => {
  try {
    const findID = await model.findById(req.params.id);
    if (findID) {
      await cloudinary.uploader.destroy(findID.cloud_id);
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const entry = {
      name: req.body.name,
      department: req.body.department,
      phoneNo: req.body.phoneNo,
      image: result.secure_url,
      cloud_id: result.public_id,
    };
    const newData = await model.findByIdAndUpdate(req.params.id, entry, {
      new: true,
    });
    res.status(200).json(newData);
  } catch (err) {
    res.json(err.message);
  }
});

route.delete("/:id", ImageUpload.single("image"), async (req, res) => {
  try {
    const findID = await model.findById(req.params.id);
    await cloudinary.uploader.destroy(findID.cloud_id);
    const newData = await model.findByIdAndDelete(req.params.id, req.body);
    res, json(newData);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = route;
