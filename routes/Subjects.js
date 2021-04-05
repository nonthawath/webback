var express = require('express');
var router = express.Router();
const Subjects = require('../models/Subjects')
/* GET home page. */
router.post('/createSubject', async (req, res, next) => {
    try {
       let {
            SubjectName,
            SubjectID,
            Professor,
            Students,
            Sec
        } = req.body
       let Subject = new Subjects({
        SubjectName: SubjectName, 
        SubjectID: SubjectID, 
        Professor: Professor,
        Students: Students, 
        Sec: Sec,
       })
       await Subject.save()
       res.send({ error : false , msg : 'CreateSuccess'})
    } catch (error) {
        res.send({ error: true , msg : error.toString() })
    }
});

router.get('/:Professor', async (req, res, next) => {
    try {
       let { Professor } = req.params
       let Subject
       if(Professor == 'all'){
        Subject = await Subjects.find({ }) 
       }else{
         Subject = await Subjects.find({ Professor : Professor }) 
       }
       
    //    console.log( Subject )
       res.send({ error : false , data : Subject })
    } catch (error) {
        res.send({ error: true , msg : error.toString() })
    }
});

router.post('/getStudent', async (req, res, next) => {
    try {
        let {
            SubjectID,
            Sec
        } = req.body
       let Subject = await Subjects.findOne({ SubjectID :SubjectID , Sec :Sec })
       console.log( Subject )
       res.send({ error : false , data : Subject.Students })
    } catch (error) {
        res.send({ error: true , msg : error.toString() })
    }
});

router.post('/CheckPermission', async (req, res, next) => {
    try {
       let { Student,
        SubjectName,
        SubjectID,
        Sec } = req.body
       let Subject = await Subjects.findOne({
            SubjectName: SubjectName,
            SubjectID: SubjectID,
            Sec: Sec }) 
        console.log(Student)
        console.log(Subject.Students.includes(Student))
        if(Subject != null){
            if(Subject.Students.includes(Student)){
                res.send({ check : true })
            }else{
                res.send({ check : false  })
            }
        }else{
            res.send({ check : false  }) 
        }
    //    console.log( Subject )
       
    } catch (error) {
        res.send({ error: true , msg : error.toString() })
    }
});

router.post('/UpdateSubject', async (req, res, next) => {
    try {
       let { Students,
        SubjectName,
        SubjectID,
        Sec } = req.body
       let Subject = await Subjects.findOne({
            SubjectName: SubjectName,
            SubjectID: SubjectID,
            Sec: Sec }) 
        Subject.Students = Students
        Subject.SubjectName = SubjectName
        Subject.SubjectID = SubjectID
        Subject.Sec = Sec
        Subject.markModified('Students')
        await Subject.save()
        res.send({ error : false , msg : 'updateSuccess'})
    //    console.log( Subject )
       
    } catch (error) {
        res.send({ error: true , msg : error.toString() })
    }
});

module.exports = router;
