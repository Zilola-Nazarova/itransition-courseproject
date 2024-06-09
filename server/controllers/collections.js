import Collection from '../models/collection.js';
import User from '../models/user.js';
import Item from '../models/item.js';
import crypto from 'crypto';
import sharp from 'sharp';
import { uploadFile, deleteFile, getObjectSignedUrl } from '../middleware/s3.js';

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find().lean();
    if (!collections) return res.status(400).json({ message: 'Collections not found' });
    for (const collection of collections) {
      if (collection.image) {
        collection.imageUrl = await getObjectSignedUrl(collection.image);
      }
    }
    res.status(200).json(collections);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserCollections = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page } = req.query;
    const LIMIT = 3;
    const startIndex = (Number(page) - 1) * LIMIT;
    let collections = await Collection.find({ author: userId }).sort({ updatedAt: -1 }).lean();
    if (!collections) return res.status(400).json({ message: 'Collections not found' });
    const total = collections.length;
    collections = collections.slice(startIndex, startIndex + LIMIT);
    for (const collection of collections) {
      if (collection.image) {
        collection.imageUrl = await getObjectSignedUrl(collection.image);
      }
    }
    res.status(200).json({ data: collections, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCollection = async (req, res) => {
  try {
    const { userId, collectionId } = req.params;
    const collection = await Collection
      .findOne({ _id: collectionId, author: userId })
      .populate('author')
      .lean();
    if (!collection) return res.status(400).json({ message: 'Collection not found' });
    if (collection.image) {
      collection.imageUrl = await getObjectSignedUrl(collection.image);
    }
    res.status(200).json(collection);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCollection = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, text, category } = req.body;
    const file = req.file;
    let image;
    if (!title || !text || !category) return res.status(400).json({ message: 'All fields are required' });
    const author = await User.findById(userId);
    if (!author) return res.status(400).json({ message: 'User not found' });
    if (file) {
      const buffer = await sharp(file.buffer).resize(800, 800, { fit: 'inside' }).jpeg({ quality: 80 }).toBuffer();
      image = randomImageName();
      await uploadFile(buffer, image, file.mimetype);
    }
    const created = await Collection.create({ title, text, category, image, author: userId });
    const collection = await Collection.findById(created._id).lean();
    if (collection.image) {
      collection.imageUrl = await getObjectSignedUrl(collection.image);
    }
    author.colls.push(collection._id);
    await author.save();
    if (collection) res.status(201).json(collection);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const { collectionId, userId } = req.params;
    const { title, text, category } = req.body;
    let { image, deleteImage } = req.body;
    const file = req.file;
    if (!title || !text || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if ((image !== 'null') && (deleteImage === 'true')) {
      await deleteFile(image);
    }
    if (file) {
      const buffer = await sharp(file.buffer).resize(800, 800, { fit: 'inside' }).jpeg({ quality: 80 }).toBuffer();
      image = randomImageName();
      await uploadFile(buffer, image, file.mimetype);
    } else {
      image = null;
    }
    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: collectionId, author: userId },
      { title, text, category, image },
      { new: true }
    )
      .populate('author')
      .lean();
    if (!updatedCollection) return res.status(400).json({ message: 'Collection not found' });
    if (updatedCollection.image) {
      updatedCollection.imageUrl = await getObjectSignedUrl(updatedCollection.image);
    }
    res.status(201).json(updatedCollection);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const { userId, collectionId } = req.params;
    const item = await Item.findOne({ coll: collectionId }).lean().exec();
    if (item) return res.status(400).json({ message: 'Collection has items' });
    const author = await User.findById(userId).exec();
    author.colls = author.colls.filter((id) => id.toString() !== collectionId);
    await author.save();
    const collection = await Collection.findOne({ _id: collectionId, author: userId });
    if (!collection) return res.status(400).json({ message: 'Collection not found' });
    if (collection.image) await deleteFile(collection.image);
    await collection.deleteOne();
    res.status(200).json({ message: `Collection with id ${collectionId} has been deleted`, _id: collectionId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getLargestCollections = async (req, res) => {
  try {
    const collections = await Collection.aggregate([
      { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
      { $unwind: '$author' },
      { $project: { title: 1, text: 1, image: 1, category: 1, author: { _id: 1, username: 1 }, itemCount: { $size: '$items' } } },
      { $sort: { itemCount: -1 } },
      { $limit: 5 }
    ]);
    for (const collection of collections) {
      if (collection.image) {
        collection.imageUrl = await getObjectSignedUrl(collection.image);
      }
    }
    res.status(200).json(collections);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
