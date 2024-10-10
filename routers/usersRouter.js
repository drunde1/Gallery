const {Router} = require('express')
const router = new Router()
const controller = require('../controllers/usersController')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/users/:filters', roleMiddleware(['ADMIN']), controller.getUsers)
router.delete('/deleteUser',roleMiddleware(['ADMIN']), controller.deleteUser)
router.post('/addUser', roleMiddleware(['ADMIN']), controller.addUser)
router.put('/editUser', roleMiddleware(['ADMIN']), controller.editUser)

module.exports = router
