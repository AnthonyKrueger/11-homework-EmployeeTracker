const inquirer = require("inquirer");
const fetch = require("node-fetch");
const chalk = require("chalk");

const fetchString = `http://${process.env.DB_HOST}:3001`

const green = chalk.green
const red = chalk.red
const yellow = chalk.yellow
const magenta = chalk.magenta
const cyan = chalk.cyan


const confirmAnswerValidator = async (input) => {
    if (input == null || input == "") {
       return 'Input Required';
    }
    return true;
 };


async function menuQuestion() {
    const question = [
        {
            type: "list",
            message: green("What would you like to do?"),
            choices: [
                new inquirer.Separator(),
                magenta("View All Departments"),
                magenta("Add New Department"),
                magenta("Delete A Department"),
                magenta("View A Departments Budget"),
                new inquirer.Separator(),
                cyan("View All Roles"),
                cyan("Add New Role"),
                cyan("Delete A Role"),
                new inquirer.Separator(),
                yellow("View All Employees"),
                yellow("Add New Employee"),
                yellow("Delete An Employee"),
                yellow("Update An Employee's Role")
            ],
            name: "choice"
        }
    ]
    const nextAction = await inquirer.prompt(question)
    return nextAction.choice
}

async function departmentQuestion() {
    const question = [
        {
            type: "input",
            message: magenta("What is the name of this department?"),
            name: "name",
            validate: confirmAnswerValidator
        }
    ]
    const department = await inquirer.prompt(question)
    const newDepartment = {"name": `${department.name}`}
    return newDepartment
}

async function roleQuestion() {
    const departmentsList = await fetch(`${fetchString}/api/departments`)
    .then((res) => res.json()) 
    if(departmentsList.length) {
        const depNames = await departmentsList.map((object) => {
            return `${object.name} ID:${object.departmentId}`
        })
        const questions = [
            {
                type: "input",
                message: cyan("What is the title of this role?"),
                name: "title",
                validate: confirmAnswerValidator
            },
            {
                type: "number",
                message: cyan("What salary does this role earn?"),
                name: "salary",
                validate: confirmAnswerValidator
            },
            {
                type: "list",
                message: cyan("What department does this role belong to?"),
                choices: depNames,
                name: "department"
            }
        ]
        let role = await inquirer.prompt(questions)
        const preDepartmentId = role.department.split(":")[1]
        role.departmentId = preDepartmentId
        const newRole = {"title": `${role.title}`, "salary": role.salary, "departmentId": role.departmentId}
        return newRole
    }
    else {
        return false;
    }
}

async function employeeQuestion() {
    const rolesList = await fetch(`${fetchString}/api/roles`)
    .then((res) => res.json()) 
    if(rolesList.length) {
        const roleTitles = await rolesList.map((object) => {
            return `${object.title} - Department:${object.department.name} - RoleID:${object.roleId}`
        })
        const questions = [
            {
                type: "input",
                message: yellow("What is the employees first name?"),
                name: "firstName",
                validate: confirmAnswerValidator
            },
            {
                type: "input",
                message: yellow("What is the employeees last name?"),
                name: "lastName",
                validate: confirmAnswerValidator
            },
            {
                type: "list",
                message: yellow("What role does this employee belong to?"),
                choices: roleTitles,
                name: "role"
            }
        ]
        let employee = await inquirer.prompt(questions)
        const preRoleId = employee.role.split(":")[2] 
        console.log(preRoleId);
        employee.roleId = preRoleId
        const newEmployee = {"firstName": `${employee.firstName}`, "lastName": `${employee.lastName}`, "roleId": employee.roleId}
        return newEmployee
    }
    else {
        return false;
    }
}

async function deleteEmployeeQuestion() {
    const employeeList = await fetch(`${fetchString}/api/employees`)
    .then((res) => res.json()) 
    if(employeeList.length) {
        const employeeStrings = employeeList.map((employee) => {
            return (`${employee.firstName} ${employee.lastName} ID:${employee.employeeId}`)
        })
        const question = {
            type: 'list',
            message: yellow("Which Employee would you like to delete?"),
            choices: employeeStrings,
            name: 'choice'
        }
        const employee = await inquirer.prompt(question)
        const employeeId = employee.choice.split(":")[1]
        return employeeId;
    }
    else {
        return false;
    }
}

async function updateEmployeeQuestion() {
    const employeeList = await fetch(`${fetchString}/api/employees`)
    .then((res) => res.json()) 
    const rolesList = await fetch(`${fetchString}/api/roles`)
    .then((res) => res.json()) 
    if(employeeList.length) {
        const employeeStrings = employeeList.map((employee) => {
            return (`${employee.firstName} ${employee.lastName} ID:${employee.employeeId}`)
        })
        const roleTitles = await rolesList.map((object) => {
            return `${object.title} - Department:${object.department.name} - RoleID:${object.roleId}`
        })
        const questions = [{
            type: 'list',
            message: yellow("Which Employee would you like to update?"),
            choices: employeeStrings,
            name: 'employee'
        },
        {
            type: 'list',
            message: cyan("Which Role would you like to make them?"),
            choices: roleTitles,
            name: 'role'
        }
    ]
        const choices = await inquirer.prompt(questions)
        const employeeId = choices.employee.split(":")[1]
        const roleId = choices.role.split(":")[2]
        return {employeeId, roleId};
    }
    else {
        return false;
    }
}

async function deleteRoleQuestion() {
    const roleList = await fetch(`${fetchString}/api/roles`)
    .then((res) => res.json()) 
    if(roleList.length) {
        const roleStrings = roleList.map((role) => {
            return (`${role.title} - Department: ${role.department.name} RoleID:${role.roleId}`)
        })
        const question = {
            type: 'list',
            message: yellow("Which Role would you like to delete?"),
            choices: roleStrings,
            name: 'choice'
        }
        const role = await inquirer.prompt(question)
        const roleId = role.choice.split(":")[2]
        return roleId;
    }
    else {
        return false;
    }
}

async function viewBudgetQuestion() {
    const deptList = await fetch(`${fetchString}/api/departments`)
    .then((res) => res.json()) 
    if(deptList.length) {
        const deptStrings = deptList.map((dept) => {
            return (`${dept.name} - DepartmentID:${dept.departmentId}`)
        })
        const question = {
            type: 'list',
            message: magenta("Which Department would you like to view the budget of?"),
            choices: deptStrings,
            name: 'choice'
        }
        const dept = await inquirer.prompt(question)
        const deptId = dept.choice.split(":")[1]
        return deptId;
    }
    else {
        return false;
    }
}

async function deleteDepartmentQuestion() {
    const deptList = await fetch(`${fetchString}/api/departments`)
    .then((res) => res.json()) 
    if(deptList.length) {
        const deptStrings = deptList.map((dept) => {
            return (`${dept.name} - DepartmentID:${dept.departmentId}`)
        })
        const question = {
            type: 'list',
            message: magenta("Which Department would you like to delete?"),
            choices: deptStrings,
            name: 'choice'
        }
        const dept = await inquirer.prompt(question)
        const deptId = dept.choice.split(":")[1]
        return deptId;
    }
    else {
        return false;
    }
}

module.exports = {
    menuQuestion, 
    departmentQuestion, 
    roleQuestion, 
    employeeQuestion, 
    deleteEmployeeQuestion, 
    deleteRoleQuestion,
    deleteDepartmentQuestion,
    updateEmployeeQuestion,
    viewBudgetQuestion
}