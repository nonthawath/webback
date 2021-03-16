var express = require('express');
var router = express.Router();
const inventoryBox = require('../models/inventoryBox')
const history = require('../models/history')

router.post('/borrow', async (req, res, next) =>  {
    try {
      let re = await inventoryBox.findOne({ boxid : req.body.boxid })
      console.log(re)
      if(re == null){
        res.send({ msg : 'ไม่มีเลขชุดอุปกรณ์นี้ใน ระบบ'})
      }
      if(re.status == 'Ready'){
        if(req.body.status == 'borrow'){
          re.borrow_by = req.body.email
          re.borrow_at = Date.now()
          re.borrow_by_id = req.body.id
          re.status = 'Not Ready'
          await re.save()
          let historys = new history({
            boxid: req.body.boxid,
            boxname: re.boxname,          
            borrow_by: re.borrow_by,
            borrow_at: re.borrow_at,
            borrow_by_id: re.borrow_by_id,
            status: 'ยืม'
          })
          await historys.save()
          res.send({ msg : 'ยืมสำเร็จ'})
        }else{
          res.send({ msg : 'อุปกรณืยังไม่ถูกยืม'})
        }
      }else{
        if(req.body.status == 'backed'){
          let historys = new history({
            boxid: req.body.boxid,
            boxname: re.boxname,          
            borrow_by: re.borrow_by,
            borrow_at: re.borrow_at,
            borrow_by_id: re.borrow_by_id,
            status: 'คืน'
          })
          await historys.save()
          re.borrow_by = ''
          re.borrow_at = ''
          re.borrow_by_id = ''
          re.status = 'Ready'
          await re.save()
          res.send({ msg : 'คืนอุปกรณ์สำเร็จ'})
        }else{
          res.send({ msg : 'กล่องอุปกรณืนี้ไม่พร้อมใช้งงาน'})
        }
      }
    //   res.send(re)
    } catch (error) {
      console.log( error.toString() )
      res.send({ error : 'error' , msg : error.toString() })
    }
  });

  router.post('/createbox', async (req, res, next) =>  {
    try {
        var Box = new inventoryBox({
            boxid : req.body.boxid,
            boxname : req.body.boxname,
            })
      await Box.save()
      res.send({ msg : 'Success' , data : Box })
    } catch (error) {
      console.log( error.toString() )
      res.send({ error : 'error' , msg : error.toString() })
    }
  });

  router.get('/getall', async (req, res, next) =>  {
    try {
      var re = await inventoryBox.find({ })
      res.send({ msg : 'Success' , data : re })
    } catch (error) {
      console.log( error.toString() )
      res.send({ error : 'error' , msg : error.toString() })
    }
  });

  router.get('/getallhistory', async (req, res, next) =>  {
    try {
      var re = await history.find({ })
      res.send({ msg : 'Success' , data : re })
    } catch (error) {
      console.log( error.toString() )
      res.send({ error : 'error' , msg : error.toString() })
    }
  });
  
  module.exports = router;