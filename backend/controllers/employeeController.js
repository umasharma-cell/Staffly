const Employee = require("../models/Employee");
const cloudinary = require("cloudinary").v2;

// Create Employee
// 
exports.createEmployee = async (req, res) => {
    try {
        const { employeeId, name, email, age, department, designation, dateOfJoining, contactNumber, status, location } = req.body;
        const profilePic = req.file ? req.file.path : null;
        const userId = req.user.id;  // ✅ Now correctly assigned

        console.log("Creating employee by user:", userId);
        
        let imageUrl = "";
        if (profilePic) {
            const result = await cloudinary.uploader.upload(profilePic, {
                folder: "employees",
            });
            imageUrl = result.secure_url;
        }

        const newEmployee = new Employee({
            employeeId,
            name,
            email,
            age,
            department,
            designation,
            dateOfJoining,
            contactNumber,
            status,
            location,
            profilePicture: imageUrl,
            createdBy: userId,  // ✅ Stores the creator's ID
        });
        
        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } catch (error) {
        console.error("Error during employee creation:", error);
        res.status(500).json({ message: "Server error during employee creation" });
    }
};

// Get All Employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error: error.message });
    }
};

// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employee", error: error.message });
    }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const { name, email, age, department, designation, dateOfJoining, contactNumber, status, location } = req.body;
        const profilePic = req.file ? req.file.path : null;
        let imageUrl = "";

        if (profilePic) {
            const result = await cloudinary.uploader.upload(profilePic, {
                folder: "employees",
            });
            imageUrl = result.secure_url;
        }

        const updatedData = {
            name, email, age, department, designation, dateOfJoining, contactNumber, status, location
        };

        if (imageUrl) {
            updatedData.profilePicture = imageUrl;
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });

        res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: "Error updating employee", error: error.message });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee", error: error.message });
    }
};
