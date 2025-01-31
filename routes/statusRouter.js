const Router = require("express")
const router = new Router()
const statusController = require("../controllers/statusController")
const authMiddleware = require("../middleware/authMiddleware")

router.post('/', authMiddleware, statusController.create)
router.delete('/:id', authMiddleware, statusController.delete)

module.exports = router