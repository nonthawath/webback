
const express = require('express');
const router = express.Router();
const User = require('../models/Users')
/* GET users listing. */
router.get('/:id', async (req, res, next) =>  {
  try {
    let id = req.params.id
    let re = await User.findOne({ username : id})
    res.send(re)
  } catch (error) {
    console.log( error.toString() )
    res.send({ error : 'error' , msg : error.toString() })
  }
});

module.exports = router;