const Router = require("express")
const router = new Router()
const statusController = require("../controllers/statusController")
const authMiddleware = require("../middleware/authMiddleware")

router.post('/', authMiddleware, statusController.create)
router.get('/', authMiddleware, statusController.getAll)
router.delete('/:id', authMiddleware, statusController.delete)

module.exports = router