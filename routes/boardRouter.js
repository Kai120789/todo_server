const Router = require("express")
const router = new Router()
const boardsController = require("../controllers/boardController")
const authMiddleware = require("../middleware/authMiddleware")

router.post('/', authMiddleware, boardsController.create) // create board
router.put('/:id', authMiddleware, boardsController.update) // update board
router.get('/', authMiddleware, boardsController.getAll) // get all boards
router.get('/:id', authMiddleware, boardsController.getOne) // get board by id
router.delete('/:id', authMiddleware, boardsController.delete) // delete board by id

router.post('/add/:boardId', authMiddleware, boardsController.addUserToBoard) // add user to board
router.get('/user/:userId', authMiddleware, boardsController.getAllBoardsByUserID) // get all boards

module.exports = router