const {Router} = require('express')
const router = new Router()
const controller = require('../controllers/worksController')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/addWork', roleMiddleware(['ADMIN', 'MANAGER']), controller.addWork)
router.get('/getWorks/:filters', roleMiddleware(['ADMIN','MANAGER']), controller.getWorks)
router.delete('/deleteWork', roleMiddleware(['ADMIN','MANAGER']), controller.deleteWork)

module.exports = router