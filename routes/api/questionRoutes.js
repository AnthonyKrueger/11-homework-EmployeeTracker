const router = require('express').Router();
const questions = require('../../assets/javascript/questions');
const fetch = require("node-fetch");

router.get('/', async (req, res) => {
    const nextAction = await questions.menuQuestion()
    switch(nextAction){
        case "Add New Department":
            const depQuestion = await fetch("http://localhost:3001/api/questions/adddepartment", {
                method: "GET"
            }).then((res) => res.json)
            break;
        case "View All Departments":
            const depos = await fetch("http://localhost:3001/api/departments", {
                method: "GET"
            }).then((data) => data.json())
            console.log(await depos);
            const nextAction = await fetch("http://localhost:3001/api/questions") 
            break;
        default:
            console.log("Not an option")
    }
})

router.get('/adddepartment', async (req, res) => {
    const department = await questions.departmentQuestion()
    console.log(department);
    const postedDep = await fetch("http://localhost:3001/api/departments", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(department)
    })
    const nextAction = await fetch("http://localhost:3001/api/questions")
})




module.exports = router;