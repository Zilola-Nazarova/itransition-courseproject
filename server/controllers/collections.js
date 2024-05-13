import mongoose from 'mongoose';
import Collection from '../models/collection.js';

export const getCollections = async (req, res) => {
  try {
    const collection = await Collection.find();
    res.status(200).json(collection);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCollection = async (req, res) => {
  const collection = req.body;
  const newCollection = new Collection(collection);
  try {
    await newCollection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCollection = async (req, res) => {
  const { id: _id } = req.params;
  const collection = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No collection with id ${_id}`);
  try {
    const updatedCollection = await Collection.findByIdAndUpdate(_id, collection, { new: true });
    res.status(201).json(updatedCollection);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteCollection = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No collection with id ${id}`);
  try {
    await Collection.findByIdAndDelete(id);
    res.status(200).json({ message: `Collection with id ${id} has been deleted` });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
