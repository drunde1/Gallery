const {Router} = require('express')
const router = new Router()
const controller = require('../controllers/cabinetController')
//const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/user', controller.getUser)
router.put('/editUser', controller.editUser)
router.get('/tickets', controller.getTickets)

// router.get('/users/:filters', roleMiddleware(['ADMIN']), controller.getUsers)
// router.delete('/deleteUser',roleMiddleware(['ADMIN']), controller.deleteUser)
// router.post('/addUser', roleMiddleware(['ADMIN']), controller.addUser)
// router.put('/editUser', roleMiddleware(['ADMIN']), controller.editUser)

module.exports = router
