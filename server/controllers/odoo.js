import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Collection from '../models/collection.js';
import dotenv from 'dotenv';

const ObjectId = mongoose.Types.ObjectId;
dotenv.config();

export const createOdooToken = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    const token = jwt.sign({ email: currentUser.email, id: currentUser._id }, 'test', { expiresIn: '1h' });
    res.status(201).json({ odooToken: token });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getOdooCollections = async (req, res) => {
  try {
    const odooToken = req.headers.authorization.split(' ')[1];
    const decodedData = jwt.verify(odooToken, 'test');
    const includeRecordsRaw = await Collection.aggregate([
      { $match: { author: ObjectId.createFromHexString(decodedData.id), odoo_id: null } },
      { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
      { $unwind: '$author' },
      { $project: { title: 1, text: 1, category: 1, author: { username: 1 }, itemsCount: { $size: '$items' } } }
    ]);
    const includeRecords = includeRecordsRaw.map((item) => {
      const { title, text, category, author, itemsCount } = item;
      return {
        title,
        description: text,
        category,
        author: author.username,
        itemsCount
      };
    });
    res.status(200).json(includeRecords);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
