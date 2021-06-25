const router = require('express').Router();
const employees = require('./employeeRoutes');
const roles = require('./roleRoutes');
const departments = require('./departmentRoutes');
const questions = require('./questionRoutes');

router.use('/employees', employees);
router.use('/roles', roles);
router.use('/departments', departments);
router.use('/questions', questions);

module.exports = router;