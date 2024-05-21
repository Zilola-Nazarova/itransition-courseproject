import mongoose from 'mongoose';
import Collection from '../models/collection.js';
import User from '../models/user.js';
import Item from '../models/item.js';

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find().lean();
    res.status(200).json(collections);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserCollections = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json(`No user with id ${userId}`);
    const collections = await Collection.find({ author: userId }).exec();
    if (!collections) return res.status(400).json({ message: 'Collections not found' });
    res.status(200).json(collections);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCollection = async (req, res) => {
  try {
    const { userId, collectionId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json(`No user with id ${userId}`);
    if (!mongoose.Types.ObjectId.isValid(collectionId)) return res.status(404).json(`No collection with id ${collectionId}`);
    const collection = await Collection.findOne({ _id: collectionId, author: userId }).exec();
    if (!collection) return res.status(400).json({ message: 'Collection not found' });
    res.status(200).json(collection);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCollection = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, text, category, image } = req.body;
    if (!title || !text || !category) return res.status(400).json({ message: 'All fields are required' });
    const author = await User.findById(userId);
    if (!author) return res.status(400).json({ message: 'User not found' });
    const newCollection = await Collection.create({ title, text, category, image, author: userId });
    author.colls.push(newCollection._id);
    await author.save();
    if (newCollection) res.status(201).json(newCollection);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const { collectionId, userId } = req.params;
    const { title, text, category, image } = req.body;
    if (!title || !text || !category || !image) return res.status(400).json({ message: 'All fields are required' });
    if (!mongoose.Types.ObjectId.isValid(collectionId)) return res.status(404).json(`No collection with id ${collectionId}`);
    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: collectionId, author: userId },
      { title, text, category, image },
      { new: true }
    );
    if (!updatedCollection) return res.status(400).json({ message: 'Collection not found' });
    res.status(201).json(updatedCollection);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const { userId, collectionId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(collectionId)) return res.status(404).json(`No collection with id ${collectionId}`);
    const item = await Item.findOne({ coll: collectionId }).lean().exec();
    if (item) return res.status(400).json({ message: 'Collection has items' });
    const author = await User.findById(userId).exec();
    author.colls = author.colls.filter((id) => id.toString() !== collectionId);
    await author.save();
    const result = await Collection.findOneAndDelete({ _id: collectionId, author: userId });
    if (!result) return res.status(400).json({ message: 'Collection not found' });
    res.status(200).json({ message: `Collection with id ${collectionId} has been deleted`, _id: collectionId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
