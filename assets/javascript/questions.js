const inquirer = require("inquirer");

async function menuQuestion() {
    const question = [
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "Add New Department"
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
            message: "What is the name of this department?",
            name: "name"
        }
    ]
    const department = await inquirer.prompt(question)
    const newDepartment = {"name": `${department.name}`}
    return newDepartment
}

module.exports = {menuQuestion, departmentQuestion}