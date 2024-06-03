import mongoose from 'mongoose';
import Item from '../models/item.js';
import User from '../models/user.js';
import Collection from '../models/collection.js';
import Tag from '../models/tag.js';
import ItemTag from '../models/item_tag.js';
const ObjectId = mongoose.Types.ObjectId;

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
    const { page } = req.query;
    const LIMIT = 3;
    const startIndex = (Number(page) - 1) * LIMIT;
    let items = await Item.aggregate([
      {
        $match: {
          coll: ObjectId.createFromHexString(collectionId),
          author: ObjectId.createFromHexString(userId)
        }
      },
      { $sort: { updatedAt: -1 } },
      { $lookup: { from: 'itemtags', localField: '_id', foreignField: 'item', as: 'tags' } },
      { $lookup: { from: 'tags', localField: 'tags.tag', foreignField: '_id', as: 'tags' } }
    ]);
    const total = items.length;
    items = items.slice(startIndex, startIndex + LIMIT);
    if (!items) return res.status(400).json({ message: 'Items not found' });
    res.status(200).json({
      data: items,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT)
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItem = async (req, res) => {
  try {
    const { userId, collectionId, itemId } = req.params;
    const itemTags = await ItemTag.find({ item: itemId }).populate('tag');
    const tags = itemTags.map((itemtag) => itemtag.tag);
    const item = await Item.findOne(
      { _id: itemId, coll: collectionId, author: userId }
    ).populate('author').lean();
    if (!item) return res.status(400).json({ message: 'Item not found' });
    res.status(200).json({ ...item, tags });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const { collectionId, userId } = req.params;
    const { title, text, tags } = req.body;
    if (!title || !text || !tags || tags.length === 0) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const collection = await Collection.findOne({ _id: collectionId, author: userId });
    if (!collection) return res.status(400).json({ message: 'Collection not found' });
    const author = await User.findById(userId);
    if (!author) return res.status(400).json({ message: 'Author not found' });
    const newItem = await new Item({ title, text, author: userId, coll: collectionId });
    author.items.push(newItem._id);
    collection.items.push(newItem._id);
    await collection.save();
    await author.save();
    const newTags = [];
    let tag;
    for (const tagname of tags) {
      tag = await Tag.findOne({ tagname });
      if (!tag) {
        tag = await Tag.create({ tagname });
      }
      const itemTag = await ItemTag.create({ item: newItem._id, tag: tag._id });
      newTags.push(tag);
      newItem.tags.push(itemTag._id);
      tag.items.push(itemTag._id);
      await tag.save();
    };
    await newItem.save();
    if (newItem) res.status(201).json({ ...newItem.toObject(), tags: newTags });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    let tag;
    const { itemId, collectionId, userId } = req.params;
    const { title, text, tags } = req.body;
    if (!title || !text || !tags || tags.length === 0) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    await ItemTag.deleteMany({ item: itemId });
    const newTags = [];
    for (const tagname of tags) {
      tag = await Tag.findOne({ tagname });
      if (!tag) {
        tag = await Tag.create({ tagname });
      }
      const itemTag = await ItemTag.create({ item: itemId, tag: tag._id });
      newTags.push(tag);
      tag.items.push(itemTag._id);
      await tag.save();
    };
    const updatedItem = await Item.findOneAndUpdate(
      { _id: itemId, coll: collectionId, author: userId },
      { title, text, tags: newTags.map((tag) => tag._id) },
      { new: true }
    );
    if (!updatedItem) return res.status(400).json({ message: 'Item not found' });
    res.status(201).json({ ...updatedItem.toObject(), tags: newTags });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { userId, collectionId, itemId } = req.params;
    const collection = await Collection.findById(collectionId).exec();
    collection.items = collection.items.filter((id) => id.toString() !== itemId);
    await collection.save();
    const author = await User.findById(userId).exec();
    author.items = author.items.filter((id) => id.toString() !== itemId);
    await author.save();
    const itemtags = await ItemTag.find({ item: itemId });
    for (const itemtag of itemtags) {
      const tag = await Tag.findById(itemtag.tag);
      tag.items = tag.items.filter((id) => id.toString() !== itemId);
      await tag.save();
    }
    await ItemTag.deleteMany({ item: itemId });
    const result = await Item.findOneAndDelete({ _id: itemId, coll: collectionId, author: userId });
    if (!result) return res.status(400).json({ message: 'Item not found' });
    res.status(200).json({ message: `Item with id ${itemId} has been deleted`, _id: itemId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getLatestItems = async (req, res) => {
  try {
    const result = await Item.aggregate([
      { $lookup: { from: 'itemtags', localField: 'tags', foreignField: '_id', as: 'tags' } },
      { $lookup: { from: 'tags', localField: 'tags.tag', foreignField: '_id', as: 'tags' } },
      { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
      { $lookup: { from: 'collections', localField: 'coll', foreignField: '_id', as: 'coll' } },
      { $unwind: '$author' },
      { $unwind: '$coll' },
      { $project: { title: 1, text: 1, tags: 1, author: { _id: 1, username: 1 }, coll: { _id: 1, title: 1 } } },
      { $sort: { createdAt: -1 } },
      { $limit: 10 }
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
