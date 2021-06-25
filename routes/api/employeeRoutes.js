const router = require('express').Router();
const sqlfunctions = require("../../assets/javascript/sqlfunctions")
const {Department, Role, Employee} = require("../../models/constructors.js")

router.get('/', async (req, res) => {
    const employeeData = await Employee.findAll({
        include: {
            model:Role
        }
    });
    return res.json(employeeData);
})

router.post('/', async (req, res) => {
    const employeeData = await sqlfunctions.newEmployee(req.body.firstName, req.body.lastName, req.body.roleId)
    return res.json(employeeData);
})

module.exports = router;