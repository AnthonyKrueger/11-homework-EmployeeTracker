const router = require('express').Router();
const sequelize = require('../../config/config.js');
const {Department, Role, Employee} = require("../../models/constructors.js")

router.get('/', async (req, res) => {
    const roleData = await Role.findAll({
        attributes: ['title', 'salary', 'roleId', 'departmentId'],
        include: {
            model: Department
        }
    });
    return res.json(roleData);
})

router.post('/', async (req, res) => {
    const roleData = await Role.create({
        title: req.body.title,
        salary: req.body.salary,
        departmentId: req.body.departmentId
    })
    return res.json(await roleData);
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const destroyedRoleData = await Role.destroy({
        where: {
            roleId: id
        }
    })
    return res.json(destroyedRoleData);
})

module.exports = router;