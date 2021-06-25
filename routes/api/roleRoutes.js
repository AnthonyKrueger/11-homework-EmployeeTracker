const router = require('express').Router();
const sqlfunctions = require("../../assets/javascript/sqlfunctions")
const {Department, Role, Employee} = require("../../models/constructors.js")

router.get('/', async (req, res) => {
    const roleData = await Role.findAll();
    return res.json(roleData);
})

router.post('/', async (req, res) => {
    const roleData = await sqlfunctions.newRole(req.body.title, req.body.salary, req.body.departmentId)
    return res.json(roleData);
})

module.exports = router;