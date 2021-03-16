var express = require('express');
var router = express.Router();
const queue = require('../models/queue')

router.post('/', async (req, res, next) =>  {
    try {
        let Time = []
        req.body.Time.forEach( e => {
            Time.push({ Time : e , Booking : []})
        });
        let newqeueue = new queue({
            SubjectName: req.body.SubjectName,
            Time: Time,
            Date: req.body.Date,
        })
        await newqeueue.save()
        res.send({ msg : "success" })
    } catch (error) {
      console.log( error.toString() )
      res.send({ error : 'error' , msg : error.toString() })
    }
  });

router.get('/:SubjectName' , async (req , res , next) => {
    try {
        let dataqueue  = await queue.findOne({ SubjectName: req.params.SubjectName })
        res.send(dataqueue)
    } catch (error) {
        console.log(error.toString())
        res.send({ error : true , msg : error.toString() })
    }
})  

router.post('/Booking' , async (req , res , next) => {
    try {
        let indexTime = req.body.indexTime
        let email = req.body.email
        let dataqueue  = await queue.findOne({ SubjectName: req.body.SubjectName })
        dataqueue.Time[indexTime].Booking.push( email )
        dataqueue.markModified('Time');
        await dataqueue.save()
        res.send(dataqueue)
    } catch (error) {
        console.log(error.toString())
        res.send({ error : true , msg : error.toString() })
    }
}) 
  
  module.exports = router;