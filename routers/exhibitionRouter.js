const {Router} = require('express')
const router = new Router()
const controller = require('../controllers/exhibitionController')
const roleMiddleware = require('../middleware/roleMiddleware')

// router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)
// router.delete('/deleteUser',roleMiddleware(['ADMIN']), controller.deleteUser)
// router.post('/addUser', roleMiddleware(['ADMIN']), controller.addUser)
// router.put('/editUser', roleMiddleware(['ADMIN']), controller.editUser)
router.get('/getExhs', controller.getExhs)
router.post('/addExh', roleMiddleware(['ADMIN', 'MANAGER']), controller.addExh)
router.get('/getInWorks/:names', controller.getInWorks)
router.get('/getInWorks', controller.getInWorks)
router.get('/getOutWorks/:names', roleMiddleware(['ADMIN', 'MANAGER']), controller.getOutWorks)
router.get('/getOutWorks', roleMiddleware(['ADMIN', 'MANAGER']), controller.getOutWorks)
router.put('/editExh', roleMiddleware(['ADMIN', 'MANAGER']), controller.editExh)
router.put('/addWorkToExh', roleMiddleware(['ADMIN', 'MANAGER']), controller.addWorkToExh)
router.put('/popWorkFromExh', roleMiddleware(['ADMIN', 'MANAGER']), controller.popWorkFromExh)
router.post('/buyTicket', controller.buyTicket)
router.get('/getFeedbacks/:names', controller.getFeedbacks)
router.post('/addFeedback', controller.addFeedback)
router.delete('/deleteFeedback',roleMiddleware(['ADMIN', 'MANAGER']), controller.deleteFeedback)
router.delete('/deleteExh',roleMiddleware(['ADMIN', 'MANAGER']), controller.deleteExh)









module.exports = router