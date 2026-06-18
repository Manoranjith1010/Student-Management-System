const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/students.controller');
const requireAuth = require('../middleware/auth');

// Public: list and read
router.get('/', ctrl.getStudents);
router.get('/:id', ctrl.getStudent);

// Protected: create/update/delete
router.post('/', requireAuth, ctrl.createStudent);
router.put('/:id', requireAuth, ctrl.updateStudent);
router.delete('/:id', requireAuth, ctrl.deleteStudent);

module.exports = router;
