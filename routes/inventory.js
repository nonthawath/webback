var express = require('express');
var router = express.Router();
const inventoryBox = require('../models/inventoryBox')
const history = require('../models/history')
const fs = require('fs');
const historyBorrow = require('../models/historyBorrow');
const HistoryInventoryRepo = require('../models/inventoryBoxHistory');

router.post('/borrow', async (req, res, next) =>  {
    try {
      let re = await inventoryBox.findOne({ boxid : req.body.boxid , SubjectID : req.body.SubjectID, Sec: req.body.Sec, })
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
            SubjectID : req.body.SubjectID,
            Sec : req.body.Sec,
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
            SubjectID : req.body.SubjectID,
            Sec : req.body.Sec,
            DmgItem : req.body.DmgItem,
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
            listItem : req.body.listItem,
            SubjectID : req.body.SubjectID,
            Sec: req.body.Sec,
            })
      await Box.save()
      res.send({ msg : 'Success' , data : Box })
    } catch (error) {
      console.log( error.toString() )
      res.send({ error : 'error' , msg : error.toString() })
    }
  });

  router.get('/getall/:SubjectID/:Sec', async (req, res, next) =>  {
    try {
      let { SubjectID,
        Sec} = req.params
      var re = await inventoryBox.find({SubjectID : SubjectID , Sec: Sec })
      res.send({ msg : 'Success' , data : re })
    } catch (error) {
      console.log( error.toString() )
      res.send({ error : 'error' , msg : error.toString() })
    }
  });

  router.get('/getallhistory/:SubjectID/:Sec', async (req, res, next) =>  {
    try {
      let { SubjectID,
        Sec} = req.params
      var re = await history.find({SubjectID : SubjectID , Sec: Sec })
      res.send({ msg : 'Success' , data : re })
    } catch (error) {
      console.log( error.toString() )
      res.send({ error : 'error' , msg : error.toString() })
    }
  });
  
  router.get('/getallhistoryNoneTa/:SubjectID/:Sec', async (req, res, next) =>  {
    try {
      let { SubjectID,
        Sec} = req.params
      var re = await historyBorrow.find({SubjectID : SubjectID , Sec: Sec })
      // var re = await historyBorrow.find({ })
      res.send({ msg : 'Success' , data : re })
    } catch (error) {
      console.log( error.toString() )
      res.send({ error : 'error' , msg : error.toString() })
    }
  });

  router.get('/getbox/:boxid/:SubjectID/:Sec', async (req, res, next) =>  {
    try {
      let { SubjectID, boxid ,
        Sec} = req.params
      let re = await inventoryBox.findOne({ boxid: boxid, SubjectID : SubjectID , Sec: Sec })
      console.log(re)
      res.send({ msg : 'Success' , data : re.listItem })
    } catch (error) {
      console.log( error.toString() )
      res.send({ error : 'error' , msg : error.toString() })
    }
  });


  router.post('/deleteListItem', async (req, res, next) =>  {
    try {
      let { SubjectID, boxid,
        Sec , ListItem } = req.body
      let re = await inventoryBox.findOne({ boxid: boxid, SubjectID : SubjectID , Sec: Sec })
      let newlist = re.listItem.filter(e => {
          return (!ListItem.includes(e.name))
      })
      re.listItem = newlist
      re.markModified('listItem')
      await re.save()
      res.send({ msg : 'Success' , data : re.listItem })
    } catch (error) {
      console.log( error.toString() )
      res.send({ error : 'error' , msg : error.toString() })
    }
});

router.post('/updateListItem', async (req, res, next) =>  {
  try {
    console.log(req.body)
    let { SubjectID, boxid, Sec, Listitem } = req.body
    let prevData = await inventoryBox.findOne({ boxid, SubjectID , Sec })
    
    // map missing count list item 
    console.log(Listitem)
    let newListItem = Listitem.map((e, i) => {
      return {
        name: e.name,
        missingItem: parseInt(prevData.listItem[i].count) - parseInt(e.count),
        count: e.count
      }
    }) 

    let newHistory = new HistoryInventoryRepo({
      boxid,
      subject: prevData.subject,
      SubjectID,
      Sec,
      boxName: prevData.boxName,
      listItem: newListItem,
    })

    prevData.listItem = Listitem
    prevData.markModified('listItem')

    await newHistory.save()
    await prevData.save()
    res.send({ msg : 'Success' , data : Listitem })
  } catch (error) {
    console.log( error.toString() )
    res.send({ error : 'error' , msg : error.toString() })
  }
});

router.get('/historyInventoryBox', async (req, res, next) =>  {
  try {
    let histories = await HistoryInventoryRepo.find({})
    res.send({ msg : 'Success' , data : histories })
  } catch (error) {
    console.log( error.toString() )
    res.send({ error : 'error' , msg : error.toString() })
  }
});

module.exports = router;