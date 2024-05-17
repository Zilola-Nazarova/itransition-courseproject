import mongoose from 'mongoose';
import Item from '../models/item.js';
import User from '../models/user.js';
import Collection from '../models/collection.js';

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().lean();
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCollectionItems = async (req, res) => {
  try {
    const { collectionId, userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(collectionId)) return res.status(404).json(`No collection with id ${collectionId}`);
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json(`No user with id ${userId}`);
    const items = await Item.find({ coll: collectionId, author: userId }).exec();
    if (!items) return res.status(400).json({ message: 'Items not found' });
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItem = async (req, res) => {
  try {
    const { userId, collectionId, itemId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json(`No item with id ${userId}`);
    if (!mongoose.Types.ObjectId.isValid(collectionId)) return res.status(404).json(`No item with id ${collectionId}`);
    if (!mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).json(`No item with id ${itemId}`);
    const item = await Item.find({ _id: itemId, coll: collectionId, author: userId }).lean();
    if (!item) return res.status(400).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const { collectionId, userId } = req.params;
    const { title, text } = req.body;
    if (!title || !text) return res.status(400).json({ message: 'All fields are required' });
    const collection = await Collection.findOne({ _id: collectionId, author: userId });
    if (!collection) return res.status(400).json({ message: 'Collection not found' });
    const author = await User.findById(userId);
    if (!author) return res.status(400).json({ message: 'Author not found' });
    const newItem = await Item.create({ title, text, author: userId, coll: collectionId });
    author.items.push(newItem._id);
    collection.items.push(newItem._id);
    await collection.save();
    await author.save();
    if (newItem) res.status(201).json(newItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { itemId, collectionId, userId } = req.params;
    const { title, text } = req.body;
    if (!title || !text) return res.status(400).json({ message: 'All fields are required' });
    if (!mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).json(`No item with id ${itemId}`);
    if (!mongoose.Types.ObjectId.isValid(collectionId)) return res.status(404).json(`No collection with id ${collectionId}`);
    const updatedItem = await Item.findOneAndUpdate(
      { _id: itemId, coll: collectionId, author: userId },
      { title, text },
      { new: true }
    );
    if (!updatedItem) return res.status(400).json({ message: 'Item not found' });
    res.status(201).json(updatedItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { userId, collectionId, itemId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(collectionId)) return res.status(404).json(`No collection with id ${collectionId}`);
    if (!mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).json(`No item with id ${itemId}`);
    const collection = await Collection.findById(collectionId).exec();
    collection.items.filter((id) => id !== itemId);
    const author = await User.findById(userId).exec();
    author.items.filter((id) => id !== itemId);
    const result = await Item.findOneAndDelete({ _id: itemId, coll: collectionId, author: userId });
    if (!result) return res.status(400).json({ message: 'Item not found' });
    res.status(200).json({ message: `Item with id ${itemId} has been deleted`, itemId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
