const router = require('express').Router();
const sqlfunctions = require("../../assets/javascript/sqlfunctions")
const {Department, Role, Employee} = require("../../models/constructors.js")

router.get('/', async (req, res) => {
    const departmentData = await Department.findAll();
    return res.json(departmentData);
})

router.post('/', async (req, res) => {
    const departmentData = await sqlfunctions.newDepartment(req.body.name)
    return res.json(departmentData);
})

module.exports = router;