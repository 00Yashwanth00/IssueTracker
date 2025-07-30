const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.js');
const upload = require('../middleware/upload.js');
const {
  addAttachment,
  deleteAttachment
} = require('../controllers/attachmentController.js');

// POST /api/issues/:id/attachments
router.post('/:id/attachments', authenticate, upload, addAttachment);

// DELETE /api/issues/:id/attachments/:attachmentId
router.delete('/:id/attachments/:attachmentId', authenticate, deleteAttachment);

module.exports = router;