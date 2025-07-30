const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  createIssue,
  getAllIssues,
  getIssue,
  updateIssue
} = require('../controllers/issueController');

// Apply authentication middleware to all issue routes
router.use(authenticate);

// POST /api/issues - Create new issue
router.post('/', createIssue);

// GET /api/issues - Get all issues
router.get('/', getAllIssues);

// GET /api/issues/:id - Get single issue
router.get('/:id', getIssue);

// PUT /api/issues/:id - Update issue
router.put('/:id', updateIssue);

module.exports = router;