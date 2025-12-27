const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    employeeId: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    department: { 
        type: String, 
        enum: ["HR", "IT", "Sales", "Marketing"], 
        required: true 
    },

    designation: { type: String, required: true }, 
    dateOfJoining: { type: Date, required: true }, 
    contactNumber: { type: String, required: true }, 
    status: { 
        type: String, 
        enum: ["Active", "Inactive"],
        default: "Active" 
    },
    location: { type: String, required: true }, 
    profilePicture: { type: String }, 
}, { timestamps: true }); 

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = EmployeeModel;
