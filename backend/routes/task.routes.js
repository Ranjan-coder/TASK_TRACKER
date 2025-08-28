const router = require('express').Router()
const { CreateTask, GetAllTask, DeleteTask, UpdateTask, ImportantTask, CompleteTask, GetImpTask, GetCompleteTask, GetIncompleteTask } = require('../controller/taskController')
const AuthMiddleware = require('../middleware/middleware')

router.post('/createtask',AuthMiddleware,CreateTask)
router.get('/alltask',AuthMiddleware,GetAllTask)
router.delete('/delete/:id',AuthMiddleware,DeleteTask)
router.put('/update/:id',AuthMiddleware,UpdateTask)
router.put('/importantmarked/:id',AuthMiddleware,ImportantTask)
router.put('/completemarked/:id',AuthMiddleware,CompleteTask)
router.get('/getimportanttask',AuthMiddleware,GetImpTask)
router.get('/getcompletetask',AuthMiddleware,GetCompleteTask)
router.get('/getincompletetask',AuthMiddleware,GetIncompleteTask)

module.exports = router