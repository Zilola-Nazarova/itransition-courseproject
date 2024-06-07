import Item from '../models/item.js';
import Comment from '../models/comment.js';
import User from '../models/user.js';

export const getComments = async (req, res) => {
  try {
    const { itemId } = req.params;
    const comments = await Comment.find({ item: itemId }).populate('author').lean();
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { itemId } = req.params;
    const commenterId = req.userId;
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'All fields are required' });
    const item = await Item.findById(itemId);
    if (!item) return res.status(400).json({ message: 'Item not found' });
    const commenter = await User.findById(commenterId);
    const newComment = await Comment.create({ text, author: commenterId, item: itemId }).populate('author');
    commenter.comments.push(newComment._id);
    item.comments.push(newComment._id);
    await commenter.save();
    await item.save();
    if (newComment) res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const currentUser = req.userId;
    const { commentId } = req.params;
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'All fields are required' });
    const comment = await Comment.findById(commentId).populate('author');
    if (!comment) return res.status(400).json({ message: 'Comment not found' });
    if (currentUser !== comment.author._id.toString()) {
      return res.status(404).json({ message: 'You can not perform actions on behalf of other users' });
    }
    comment.text = text;
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const currentUser = req.userId;
    const { itemId, commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(400).json({ message: 'Comment not found' });
    if (currentUser !== comment.author._id.toString()) {
      return res.status(404).json({ message: 'You can not perform actions on behalf of other users' });
    }
    const item = await Item.findById(itemId).exec();
    item.comments = item.comments.filter((id) => id.toString() !== commentId);
    await item.save();
    const commenter = await User.findById(req.userId).exec();
    commenter.comments = commenter.comments.filter((id) => id.toString() !== commentId);
    await commenter.save();
    const result = await comment.deleteOne();
    if (!result) return res.status(400).json({ message: 'Comment not found' });
    res.status(200).json({ message: `Comment with id ${commentId} has been deleted`, _id: commentId });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
