import mongoose from 'mongoose';
import Item from '../models/item.js';

export const getItems = async (req, res) => {
  try {
    const item = await Item.find();
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  const item = req.body;
  const newItem = new Item(item);
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  const { id: _id } = req.params;
  const item = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No item with id ${_id}`);
  try {
    const updatedItem = await Item.findByIdAndUpdate(_id, item, { new: true });
    res.status(201).json(updatedItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No item with id ${_id}`);
  try {
    await Item.findByIdAndDelete(_id);
    res.status(200).json({ message: `Item with id ${_id} has been deleted`, _id });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
