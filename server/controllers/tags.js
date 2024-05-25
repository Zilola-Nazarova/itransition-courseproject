import mongoose from 'mongoose';
import Tag from '../models/tag.js';
const ObjectId = mongoose.Types.ObjectId;

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find().exec();
    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getTagItems = async (req, res) => {
  try {
    const { tagId } = req.params;
    const items = await Tag.aggregate([
      { $lookup: { from: 'itemtags', localField: 'items', foreignField: '_id', as: 'items' } },
      { $lookup: { from: 'items', localField: 'items.item', foreignField: '_id', as: 'items' } },
      { $match: { _id: ObjectId.createFromHexString(tagId) } }
    ]);
    res.status(200).json(items[0]);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getTagsCloud = async (req, res) => {
  try {
    const tags = await Tag.aggregate([
      { $project: { tagname: 1, itemCount: { $size: '$items' } } },
      { $sort: { itemCount: -1 } },
      { $limit: 3 }
    ]);
    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
