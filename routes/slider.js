const express = require('express');
const router = express.Router();
const auth = require('../auth');
const { sponsorSliderController, bannerSliderController } = require('../controller/sliderController');

router.post('/sponsor/add', auth.authorization, sponsorSliderController.add);

router.get('/sponsor/', auth.authorization, sponsorSliderController.getAll)

router.get('/sponsor/:id', auth.authorization, sponsorSliderController.getOne)

router.put('/sponsor/update/:id', auth.authorization, sponsorSliderController.update);

router.put('/sponsor/delete/:id', auth.authorization, sponsorSliderController.delete);

router.post('/banner/add', auth.authorization, bannerSliderController.add);

router.get('/banner/', auth.authorization, bannerSliderController.getAll)

router.get('/banner/:id', auth.authorization, bannerSliderController.getOne)

router.put('/banner/update/:id', auth.authorization, bannerSliderController.update);

router.put('/banner/delete/:id', auth.authorization, bannerSliderController.delete);

module.exports = router
