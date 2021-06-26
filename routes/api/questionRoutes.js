const router = require('express').Router();
const questions = require('../../assets/javascript/questions');
require('dotenv').config();
const fetch = require("node-fetch");
const chalk = require("chalk");
const cTable = require('console.table');

const green = chalk.green
const red = chalk.red
const yellow = chalk.yellow
const magenta = chalk.magenta
const cyan = chalk.cyan


const fetchString = `http://${process.env.DB_HOST}:3001`

router.get('/', async (req, res) => {

    const nextAction = await questions.menuQuestion()

    switch(nextAction){

        case magenta("Add New Department"):
            let depBody = await questions.departmentQuestion()
            const postedDep = await fetch(`${fetchString}/api/departments`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(depBody)
            }).then(async (data) => {
                const depAdded = await data.json()
                console.log(green(`\nDepartment ${magenta(depAdded.name)} added to database with departmentId: ${yellow(depAdded.departmentId)}\n`));
                await fetch(`${fetchString}/api/questions`)
            })
            break;

        case cyan("Add New Role"):
            let roleBody = await questions.roleQuestion()
            if(roleBody != false) {
                const postedRole = await fetch(`${fetchString}/api/roles`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(roleBody)
                }).then(async (data) => {
                    const roleAdded = await data.json()
                    console.log(green(`\nRole ${cyan(roleAdded.title)} added to database with roleId: ${yellow(roleAdded.roleId)}\n`));
                    await fetch(`${fetchString}/api/questions`)
                })
            }
            else {
                console.log(red(`\nError: You need to add a Department before you can add a Role.\n`));
                await fetch(`${fetchString}/api/questions`)
            }
            break;

        case yellow("Add New Employee"):
            let employeeBody = await questions.employeeQuestion()
            if(employeeBody != false) {
                const postedEmployee = await fetch(`${fetchString}/api/employees`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(employeeBody)
                }).then(async (data) => {
                    const employeeAdded = await data.json()
                    console.log(green(`\nEmployee ${yellow(employeeAdded.firstName)} ${yellow(employeeAdded.lastName)} added to database with employeeId: ${yellow(employeeAdded.employeeId)}\n`));
                    await fetch(`${fetchString}/api/questions`)
                })
            }
            else {
                console.log(red(`\nError: You need to add a Role before you can add an Employee.\n`));
                await fetch(`${fetchString}/api/questions`)
            }
            break;

        case magenta("View All Departments"):
            const depos = await fetch(`${fetchString}/api/departments`, {
                method: "GET"
            }).then((data) => data.json())
            console.log(magenta(`\n Departments List\n -----------------------------`))
            console.table(await depos);
            console.log(magenta(`\n -----------------------------`))
            await fetch(`${fetchString}/api/questions`) 
            break;

        case magenta("View A Departments Budget"):
            const depoId = await questions.viewBudgetQuestion()
            const chosenRoles = await fetch(`${fetchString}/api/departments/budget/${depoId}`)
            .then((data) => data.json())
            let budget = 0;
            chosenRoles.forEach((role) => {
                if(role.employees.length) {
                    role.employees.forEach((employee) => {
                        budget += role.salary
                    })
                }
                else {
                    budget = 0;
                }
            })
            console.log(magenta(`\nThis departments total budget is ${green("$" + budget)}\n`));
            await fetch(`${fetchString}/api/questions`) 
            break;

        case cyan("View All Roles"):
            const roles = await fetch(`${fetchString}/api/roles`, {
                method: "GET"
            }).then((data) => data.json())
            await roles.forEach((role) => {
                role.department = role.department.name;
            })
            console.log(cyan(`\n Roles List\n -----------------------------`))
            console.table(await roles);
            console.log(cyan(`\n -----------------------------`))
            await fetch(`${fetchString}/api/questions`) 
            break;

        case yellow("View All Employees"):
            const employees = await fetch(`${fetchString}/api/employees`, {
                method: "GET"
            }).then((data) => data.json())
            await employees.forEach((employee) => {
                employee.id = employee.employeeId
                employee.Name = `${employee.firstName} ${employee.lastName}`
                employee.title = employee.role.title;
                employee.salary = employee.role.salary
                employee.departmentId = employee.role.departmentId
                delete employee.role
                delete employee.employeeId
                delete employee.roleId
                delete employee.firstName
                delete employee.lastName
            })
            console.log(yellow(`\n Employees List\n -----------------------------`))
            console.table(await employees);
            console.log(yellow(`\n -----------------------------`))
            await fetch(`${fetchString}/api/questions`) 
            break;

        case yellow("Update An Employee's Role"):
            const updateInfo = await questions.updateEmployeeQuestion()
            console.log(updateInfo);
            const updateEmployee = await fetch(`${fetchString}/api/employees/updateRole`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateInfo)
            }).then((data) => data.json())
            console.log(yellow(`\nEmployee Role Updated!\n`))
            await fetch(`${fetchString}/api/questions`) 
            break;
            
        case yellow("Delete An Employee"):
            const deleteId = await questions.deleteEmployeeQuestion()
            if(deleteId) {
                const deletedEmployee = await fetch(`${fetchString}/api/employees/${await deleteId}`, {
                    method: "DELETE"
                }).then((data) => data.json())
                console.log(red(`\nDeleted Employee\n`))
            }
            else {
                console.log(red("\nError: No Employees to Delete.\n"))
            }
            await fetch(`${fetchString}/api/questions`) 
            break;

        case cyan("Delete A Role"):
            const deleteRoleId = await questions.deleteRoleQuestion()
            if(deleteRoleId) {
                const deletedRole = await fetch(`${fetchString}/api/roles/${await deleteRoleId}`, {
                    method: "DELETE"
                }).then((data) => data.json())
                console.log(red(`\nDeleted Role\n`))
            }
            else {
                console.log(red("\nError: No Roles to Delete.\n"))
            }
            await fetch(`${fetchString}/api/questions`) 
            break;

        case magenta("Delete A Department"):
            const deleteDepartmentId = await questions.deleteDepartmentQuestion()
            if(deleteDepartmentId) {
                const deletedDepartment = await fetch(`${fetchString}/api/departments/${await deleteDepartmentId}`, {
                    method: "DELETE"
                }).then((data) => data.json())
                console.log(red(`\nDeleted Department\n`))
            }
            else {
                console.log(red("\nError: No Departments to Delete.\n"))
            }
            await fetch(`${fetchString}/api/questions`) 
            break;

        default:
            console.log(red("Not an option (How'd you get here????)"))
            await fetch(`${fetchString}/api/questions`) 
    }
})





module.exports = router;