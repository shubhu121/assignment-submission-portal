const express = require('express');
const {
    uploadAssignment,
    getAssignments,
    acceptAssignment,
    rejectAssignment,
} = require('../controllers/assignmentController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/upload', protect, uploadAssignment);
router.get('/assignments', protect, admin, getAssignments);
router.post('/assignments/:id/accept', protect, admin, acceptAssignment);
router.post('/assignments/:id/reject', protect, admin, rejectAssignment);

module.exports = router;
