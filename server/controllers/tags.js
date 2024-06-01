import mongoose from 'mongoose';
import Tag from '../models/tag.js';
import ItemTag from '../models/item_tag.js';

const ObjectId = mongoose.Types.ObjectId;

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.aggregate([
      { $project: { tagname: 1, itemCount: { $size: '$items' } } },
      { $sort: { itemCount: -1 } },
    ]);
    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getTagItems = async (req, res) => {
  try {
    const { tagId } = req.params;
    const { page } = req.query;
    const LIMIT = 3;
    const startIndex = (Number(page) - 1) * LIMIT;
    const tag = await Tag.findById(tagId);
    let items = await ItemTag.aggregate([
      { $match: { tag: ObjectId.createFromHexString(tagId) } },
      { $lookup: { from: 'items', localField: 'item', foreignField: '_id', as: 'item' } },
      { $unwind: '$item' },
      { $lookup: { from: 'itemtags', localField: 'item._id', foreignField: 'item', as: 'item.tags' } },
      { $lookup: { from: 'tags', localField: 'item.tags.tag', foreignField: '_id', as: 'item.tags' } },
      { $sort: { updatedAt: -1 } }
    ]);
    const total = items.length;
    items = items.map((item) => item.item).slice(startIndex, startIndex + LIMIT);
    res.status(200).json({
      data: { tag, items },
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT)
    });
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
