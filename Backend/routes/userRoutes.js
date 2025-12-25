const express = require("express");
const router = express.Router();
const {getUser, postUser, updateUser, deleteUser} = require("../controller/userController.js")

router.get("/", getUser)
router.post("/", postUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router ;