const Issue = require('../models/Issue');
const NotFoundError = require('../errors/NotFoundError.js');
const ForbiddenError = require('../errors/ForbiddenError.js');
const User = require('../models/User.js');

exports.createIssue = async (req, res) => {
  try {
    const { title, description, type, priority, assignedTo } = req.body;
    
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) throw new NotFoundError("Assigned user not found");
    }

    const issue = await Issue.create({
      title,
      description,
      type,
      priority,
      createdBy: req.user.userId,
      assignedTo: assignedTo || null
    });

    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create issue' });
  }
};

exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate('createdBy', 'username email')
      .populate('assignedTo', 'username email');
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
};

exports.getIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('createdBy', 'username email')
      .populate('assignedTo', 'username email')
      .populate('comments.postedBy', 'username');

    if (!issue) throw new NotFoundError('Issue not found');
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issue' });
  }
};

exports.updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) throw new NotFoundError('Issue not found');

    if (issue.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      throw new ForbiddenError('Not authorized to update this issue');
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'status', 'priority', 'type', 'assignedTo'];
    
    updates.forEach(update => {
      if (allowedUpdates.includes(update)) issue[update] = req.body[update];
    });

    await issue.save();
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update issue' });
  }
};