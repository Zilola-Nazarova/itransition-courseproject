import mongoose from 'mongoose';
import User from '../models/user.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id ${_id}`);
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id ${_id}`);
  try {
    await User.findByIdAndDelete(_id);
    res.status(200).json({ message: `User with id ${_id} has been deleted`, _id });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
