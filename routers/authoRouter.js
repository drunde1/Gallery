const {Router} = require('express')
const router = new Router()
const controller = require('../controllers/authoController')
const {check} = require('express-validator')
//const userMiddleware = require('../middleware/userMiddleware')
//const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/registration',[
 check('username', 'Некорректный никнейм').notEmpty(),
 check('password', 'Пароль должен быть от 5 до 14 символов').isLength({min: 5, max: 14})
], controller.registration)
console.log("POST");
router.post('/login', controller.login)
//router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

module.exports = router