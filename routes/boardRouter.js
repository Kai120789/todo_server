const Router = require("express")
const router = new Router()

router.post('/') // create board
router.put('/:id') // update board
router.get('/') // get all boards
router.get('/:id') // get board by id
router.delete('/:id') // delete board by id

router.post('/:id') // add user to board

module.exports = router