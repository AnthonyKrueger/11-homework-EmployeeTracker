const sequelize = require("../config/config.js")
const {DataTypes} = require("sequelize");

const Department = sequelize.define("department", {
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


const Role = sequelize.define("role", {
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

const Employee = sequelize.define("employee", {
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


Department.hasMany(Role, {
    foreignKey: 'departmentId',
    onDelete: 'cascade'
})

Role.belongsTo(Department, {
    foreignKey: "departmentId",
    onDelete: 'cascade'
})

Role.hasMany(Employee, {
    foreignKey: 'roleId',
    onDelete: 'cascade'
})

Employee.belongsTo(Role, {
    foreignKey: "roleId",
    onDelete: 'cascade'
})




module.exports = {Department, Role, Employee};