
const {Department, Role, Employee} = require("../../models/constructors.js")


const newRole = async (title, salary, departmentId) => {
    const role = await Role.create({
        title: title,
        salary: salary,
        departmentId: departmentId
    })
    return role;
}

const newEmployee = async (firstName, lastName, roleId) => {
    const employee = await Employee.create({
        firstName: firstName,
        lastName: lastName,
        roleId: roleId
    })
    return employee;
}

const newDepartment = async (name) => {
    const department = await Department.create({
        name: name,
    })
    return department;
}

module.exports = {newRole, newEmployee, newDepartment}