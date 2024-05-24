import { categories } from '../models/collection.js';

export const getCategories = async (req, res) => {
  try {
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
