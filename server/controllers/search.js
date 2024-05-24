import Comment from '../models/comment.js';
import Item from '../models/item.js';
import Collection from '../models/collection.js';

export const getItemsBySearch = async (req, res) => {
  try {
    const { searchQuery, page } = req.query;
    const LIMIT = 3;
    const startIndex = (Number(page) - 1) * LIMIT;
    const promises = [];
    promises.push(Item.aggregate([
      { $match: { $text: { $search: searchQuery } } },
      { $lookup: { from: 'itemtags', localField: 'tags', foreignField: '_id', as: 'tags' } },
      { $lookup: { from: 'tags', localField: 'tags.tag', foreignField: '_id', as: 'tags' } },
      { $project: { type: 'item', title: 1, text: 1, tags: { tagname: 1, _id: 1 }, author: 1, coll: 1, score: { $meta: 'textScore' } } },
      { $sort: { score: 1 } }
    ]));
    promises.push(Collection.aggregate([
      { $match: { $text: { $search: searchQuery } } },
      { $project: { type: 'collection', title: 1, text: 1, category: 1, author: 1, items: 1, itemCount: { $size: '$items' }, score: { $meta: 'textScore' } } },
      { $lookup: { from: 'items', localField: 'items', foreignField: '_id', as: 'items' } },
      { $sort: { score: 1 } }
    ]));
    promises.push(Comment.aggregate([
      { $match: { $text: { $search: searchQuery } } },
      { $lookup: { from: 'items', localField: 'item', foreignField: '_id', as: 'item' } },
      { $unwind: '$item' },
      { $lookup: { from: 'itemtags', localField: 'item._id', foreignField: 'item', as: 'item.tags' } },
      { $lookup: { from: 'tags', localField: 'item.tags.tag', foreignField: '_id', as: 'item.tags' } },
      { $project: { type: 'comment', text: 1, author: 1, item: 2, score: { $meta: 'textScore' } } },
      { $sort: { score: 1 } }
    ]));
    Promise.all(promises).then((results) => {
      let result = [...results[0], ...results[1], ...results[2]];
      const total = result.length;
      result = result.sort((a, b) => b.score - a.score).slice(startIndex, startIndex + LIMIT);
      return res.status(200).json({ data: result, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    }).catch((error) => { throw (error); });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
