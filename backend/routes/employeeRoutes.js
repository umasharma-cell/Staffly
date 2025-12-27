const express = require("express");
const { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

const router = express.Router();

// Create Employee with Profile Picture Upload
router.post("/", authMiddleware , upload.single("profilePicture"), createEmployee);

// Get All Employees
router.get("/", getEmployees);

// Get Single Employee by ID
router.get("/:id", getEmployeeById);

// Update Employee
router.put("/:id", upload.single("profilePicture"), updateEmployee);

// Delete Employee
router.delete("/:id", deleteEmployee);

module.exports = router;
