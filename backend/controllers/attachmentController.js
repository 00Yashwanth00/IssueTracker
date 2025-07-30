const path = require('path');
const fs = require('fs');
const Issue = require('../models/Issue');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

exports.addAttachment = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new BadRequestError('No file uploaded');
    }

    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      // Clean up orphaned file
      fs.unlinkSync(req.file.path);
      throw new NotFoundError('Issue not found');
    }

    const newAttachment = {
      filename: req.file.originalname,
      path: req.file.path.replace(/\\/g, '/'), // Ensure consistent path format
      uploadedBy: req.user.userId
    };

    issue.attachments.push(newAttachment);
    const savedIssue = await issue.save();

    // Get the newly created attachment with ID
    const savedAttachment = savedIssue.attachments[savedIssue.attachments.length - 1];

    res.status(201).json({
      success: true,
      id: savedAttachment._id,
      data: {
        filename: newAttachment.filename,
        path: `/uploads/${path.basename(newAttachment.path)}`,
        uploadedAt: new Date()
      }
    });

  } catch (err) {
    // Clean up file if error occurred
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(err);
  }
};

exports.deleteAttachment = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      throw new NotFoundError('Issue not found');
    }

    const attachment = issue.attachments.id(req.params.attachmentId);
    if (!attachment) {
      throw new NotFoundError('Attachment not found');
    }

    // Check permissions
    if (attachment.uploadedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      throw new ForbiddenError('Not authorized to delete this attachment');
    }

    // Delete file from filesystem
    if (fs.existsSync(attachment.path)) {
      fs.unlinkSync(attachment.path);
    }

    // Remove from array
    issue.attachments.pull(attachment._id);
    await issue.save();

    res.json({
      success: true,
      data: {}
    });

  } catch (err) {
    next(err);
  }
};