import mongoose from 'mongoose';
import Item from '../models/item.js';
import User from '../models/user.js';
import Collection from '../models/collection.js';
import Tag from '../models/tag.js';
import ItemTag from '../models/item_tag.js';

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
    const total = await Collection.countDocuments({});
    if (!mongoose.Types.ObjectId.isValid(collectionId)) return res.status(404).json(`No collection with id ${collectionId}`);
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json(`No user with id ${userId}`);
    let items = await Item
      .find({ coll: collectionId, author: userId })
      .sort({ updated_at: -1 }).limit(LIMIT).skip(startIndex)
      .populate({
        path: 'tags',
        populate: {
          path: 'tag'
        }
      }).lean();
    if (!items) return res.status(400).json({ message: 'Items not found' });
    items = items.map((item) => ({ ...item, tags: item.tags.map((itemtag) => itemtag.tag) }));
    res.status(200).json({ data: items, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
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
    const itemTags = await ItemTag.find({ item: itemId }).populate('tag');
    const tags = itemTags.map((itemtag) => itemtag.tag);
    const item = await Item.findOne({ _id: itemId, coll: collectionId, author: userId }).lean();
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
    if (!title || !text || !tags || tags.length === 0) return res.status(400).json({ message: 'All fields are required' });
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
    if (!title || !text || !tags || tags.length === 0) return res.status(400).json({ message: 'All fields are required' });
    if (!mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).json(`No item with id ${itemId}`);
    if (!mongoose.Types.ObjectId.isValid(collectionId)) return res.status(404).json(`No collection with id ${collectionId}`);
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
    if (!mongoose.Types.ObjectId.isValid(collectionId)) return res.status(404).json(`No collection with id ${collectionId}`);
    if (!mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).json(`No item with id ${itemId}`);
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
