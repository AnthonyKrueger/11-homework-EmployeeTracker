const sequelize = require("../config/config.js")
const {DataTypes} = require("sequelize");

const Department = sequelize.define("Department", {
    name: {
        type: DataTypes.STRING,
        allownull: false
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allownull: false,
        primaryKey: true,
        autoIncrement: true
    }
})


const Role = sequelize.define("Role", {
    title: {
        type: DataTypes.STRING,
        allownull: false
    },
    salary: {
        type: DataTypes.INTEGER
    },
    roleId: {
        type: DataTypes.INTEGER,
        allownull: false,
        primaryKey: true,
        autoIncrement: true
    }
})

const Employee = sequelize.define("Employee", {
    firstName: {
        type: DataTypes.STRING,
        allownull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allownull: false,
        primaryKey: true,
        autoIncrement: true
    }

})

Employee.belongsTo(Role, {
    foreignKey: "roleId",
})

Role.belongsTo(Department, {
    foreignKey: "departmentId"
})



module.exports = {Department, Role, Employee};