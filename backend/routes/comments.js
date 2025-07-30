const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  addComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

// Apply authentication middleware to all comment routes
router.use(authenticate);

// POST /api/issues/:id/comments - Add comment
router.post('/:id/comments', addComment);

// PUT /api/issues/:id/comments/:commentId - Update comment
router.put('/:id/comments/:commentId', updateComment);

// DELETE /api/issues/:id/comments/:commentId - Delete comment
router.delete('/:id/comments/:commentId', deleteComment);

module.exports = router;