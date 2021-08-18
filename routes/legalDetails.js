const express = require('express');
const router = express.Router();
tncController=require('../controller/tncController')

//route for getting terms and conditions & privacy policy
router.get('/',tncController.view)

// route for adding /updating terms and conditions & privacy policy
router.post('/add',tncController.add)

//get route for terms and conditions & privacy policy
router.delete('/delete',tncController.delete)   

module.exports = router
