const Router = require("express")
const router = new Router()
const boardsController = require("../controllers/boardController")

router.post('/', boardsController.create) // create board
router.put('/:id', boardsController.update) // update board
router.get('/', boardsController.getAll) // get all boards
router.get('/:id', boardsController.getOne) // get board by id
router.delete('/:id', boardsController.delete) // delete board by id

router.post('/:boardId', boardsController.addUserToBoard) // add user to board

module.exports = router