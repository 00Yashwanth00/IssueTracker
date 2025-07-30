const Issue = require('../models/Issue.js');
const ForbiddenError = require('../errors/ForbiddenError.js');
const NotFoundError = require('../errors/NotFoundError.js');

exports.addComment = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) throw new NotFoundError('Issue not found');

    const comment = {
      text: req.body.text,
      postedBy: req.user.userId
    };

    issue.comments.push(comment);
    await issue.save();

    res.status(201).json({
      message: 'Comment added',
      comment: issue.comments[issue.comments.length - 1]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const issue = await Issue.findOne({
      _id: req.params.id,
      'comments._id': req.params.commentId
    });

    if (!issue) throw new NotFoundError('Issue or comment not found');

    const comment = issue.comments.id(req.params.commentId);
    if (comment.postedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      throw new ForbiddenError('Not authorized to update this comment');
    }

    comment.text = req.body.text;
    comment.updatedAt = Date.now();
    await issue.save();

    res.json({ message: 'Comment updated', comment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) throw new NotFoundError('Issue not found');

    const comment = issue.comments.id(req.params.commentId);
    if (!comment) throw new NotFoundError('Comment not found');

    if (comment.postedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      throw new ForbiddenError('Not authorized to delete this comment');
    }

    comment.remove();
    await issue.save();

    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};