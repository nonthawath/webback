var express = require('express');
const historyBorrow = require('../models/historyBorrow');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const fs = require('fs-extra') 
var cpUpload = upload.fields([{ name: 'ImgInventory', maxCount: 1 }, { name: 'ImgHuman', maxCount: 1 }])

/* GET home page. */
router.post('/Borrow', cpUpload ,async (req, res, next) => {
    try {
        const {SubjectID , 
            Sec } = req.body
        if(req.files){
            let ImgInventory = req.files.ImgInventory
            let ImgHuman = req.files.ImgHuman
            let filenameImgInventory = `${ImgInventory[0].filename}.${ImgInventory[0].mimetype.split("/")[1]}` /// vdo/mp4 <<< have to choose mp4 
            let filenameImgHuman = `${ImgHuman[0].filename}.${ImgHuman[0].mimetype.split("/")[1]}`
            fs.moveSync(ImgInventory[0].path , `./ImgHistory/${filenameImgInventory}`) /// img.path == picture in folder upload 
            fs.removeSync(ImgInventory[0].path)
            fs.moveSync(ImgHuman[0].path , `./ImgHistory/${filenameImgHuman}`)
            fs.removeSync(ImgHuman[0].path)
            let history = new historyBorrow({
                borrowname: req.body.borrowname,
                ImgInventory: `http://localhost:3000/GetImage/${filenameImgInventory}`,
                ImgHuman: `http://localhost:3000/GetImage/${filenameImgHuman}`,
                SubjectID: SubjectID,
                Sec: Sec,
                status: req.body.status,

            })
            await history.save()
        }
        res.send({ error : false , msg : 'BorrowSuccess' }) 
    } catch (error) {
        res.send({ error : true , msg : error.toString() }) 
    }
});




module.exports = router;
