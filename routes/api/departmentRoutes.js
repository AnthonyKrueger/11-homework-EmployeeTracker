const router = require('express').Router();
const {Department, Role, Employee} = require("../../models/constructors.js")

router.get('/', async (req, res) => {
    let departmentData = await Department.findAll({
        attributes: ['name', 'departmentId'],
    });
    return res.json(departmentData);
})

router.get('/budget/:id', async (req, res) => {
    const id = req.params.id
    let departmentData = await Role.findAll({
        include: {
            model: Employee
        },
        where: {
            departmentId: id
        }
    });
    return res.json(departmentData);
})

router.post('/', async (req, res) => {
    const departmentData = await Department.create({
        name: req.body.name,
    })
    return res.json(await departmentData);
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const destroyedDepartmentData = await Department.destroy({
        where: {
            departmentId: id
        }
    })
    return res.json(destroyedDepartmentData);
})

module.exports = router;