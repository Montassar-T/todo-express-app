const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
router.use(require('../middlewares/verifyJWT'))


router.use(require('../middlewares/verifyJWT'));

router.route('/add/:userId')
.post(todoController.addTodo)

router.route('/update')
.post(todoController.updateTodo)

router.route('/delete/:id')
.post(todoController.deleteTodo)

router.route('/getAll/:userId').get(todoController.getAll)





module.exports = router;
