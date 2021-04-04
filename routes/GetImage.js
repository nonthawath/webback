const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs-extra')

router.get( '/:imageName' , async (req , res , next ) => {  
    try {
        let directory =  `./ImgHistory/${req.params.imageName}`   
        res.sendFile(path.resolve(directory))
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

module.exports = router;