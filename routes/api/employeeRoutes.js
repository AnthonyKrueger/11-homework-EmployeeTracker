const router = require('express').Router();
const {Department, Role, Employee} = require("../../models/constructors.js")

router.get('/', async (req, res) => {
    const employeeData = await Employee.findAll({
        attributes: ['firstName', 'lastName', 'employeeId', 'roleId'],
        include: {
            model: Role
        }
    });
    return res.json(employeeData);
})

router.post('/', async (req, res) => {
    const employeeData = await Employee.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        roleId: req.body.roleId
    })
    return res.json(employeeData);
})

router.post('/updateRole', async (req, res) => {
    const id = req.body.employeeId
    const newRoleId = req.body.roleId
    console.log(id)
    console.log(newRoleId)
    await Employee.update({ roleId: newRoleId }, {
        where: {
            employeeId: id
        }
    }
    ).then((data) => {
        console.log("done")
        res.json(data);
    })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const destroyedEmployeeData = await Employee.destroy({
        where: {
            employeeId: id
        }
    })
    return res.json(destroyedEmployeeData);
})

module.exports = router;