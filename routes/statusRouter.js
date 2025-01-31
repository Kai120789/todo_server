const Router = require("express")
const router = new Router()
const statusCollector = require("../controllers/statusController")
const authMiddleware = require("../middleware/authMiddleware")

router.post('/', authMiddleware, statusCollector.create)
router.delete('/:id', authMiddleware, statusCollector.delete)

module.exports = router