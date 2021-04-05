var express = require('express');
var router = express.Router();
const queue = require('../models/queue')

router.post('/', async (req, res, next) =>  {
    try {
        let Time = req.body.Time
        let newqeueue = await queue.findOne({ SubjectID: req.body.SubjectID ,  Sec: req.body.Sec })
        Time.map( e => e.Booking = [])
        if(newqeueue){
            newqeueue.Time = Time
            newqeueue.markModified('Time')
        }else{
            newqeueue = new queue({
                SubjectName: req.body.SubjectName,
                SubjectID: req.body.SubjectID,
                Sec: req.body.Sec,
                Time: Time,
            })
        }
        await newqeueue.save()
        res.send({ msg : "success" })
    } catch (error) {
      console.log( error.toString() )
      res.send({ error : 'error' , msg : error.toString() })
    }
  });

router.get('/:SubjectName/:SubjectID/:Sec' , async (req , res , next) => {
    try {
        const { SubjectName,
            SubjectID,
            Sec} = req.params
        let dataqueue  = await queue.findOne({ SubjectName: SubjectName , SubjectID: SubjectID , Sec: Sec})
        console.log(dataqueue)
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
        let dataqueue  = await queue.findOne({ SubjectID: req.body.SubjectID , Sec: req.body.Sec  })
        console.log(indexTime)
        if(dataqueue){
            dataqueue.Time[indexTime].Booking.push( email )
            dataqueue.markModified('Time');
            await dataqueue.save()
            res.send(dataqueue)
        }else{
            res.send({ error: true })
        }
        
    } catch (error) {
        console.log(error.toString())
        res.send({ error : true , msg : error.toString() })
    }
}) 
  
  module.exports = router;