import Item from '../models/item.js';
import Like from '../models/like.js';
import User from '../models/user.js';

export const getLikes = async (req, res) => {
  try {
    const { itemId } = req.params;
    const likes = await Like.find({ item: itemId });
    res.status(200).json(likes);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createLike = async (req, res) => {
  try {
    const { itemId } = req.params;
    const authorId = req.userId;
    const item = await Item.findById(itemId);
    if (!item) return res.status(400).json({ message: 'Item not found' });
    const liker = await User.findById(authorId);
    const newLike = await Like.create({ author: authorId, item: itemId });
    liker.likes.push(newLike._id);
    item.likes.push(newLike._id);
    await liker.save();
    await item.save();
    if (newLike) res.status(201).json(newLike);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const deleteLike = async (req, res) => {
  try {
    const { itemId, likeId } = req.params;
    const item = await Item.findById(itemId).exec();
    item.likes.filter((id) => id !== likeId);
    const user = await User.findById(req.userId).exec();
    user.likes.filter((id) => id !== likeId);
    const result = await Like.findByIdAndDelete(likeId);
    if (!result) return res.status(400).json({ message: 'Like not found' });
    res.status(200).json({ message: `Like with id ${likeId} has been deleted`, _id: likeId });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
