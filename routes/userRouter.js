const Router = require("express")
const router = new Router()
const userController = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/', authMiddleware, userController.check)
router.delete('/logout', authMiddleware, userController.logout)

module.exports = router