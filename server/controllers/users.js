import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Collection from '../models/collection.js';
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json(`No user with id ${userId}`);
    const user = await User.findById(userId).select('-password').lean();
    if (!user) return res.status(400).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role, active } = req.body;
    if (!username || !email || !password || !role || typeof active !== 'boolean') {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const duplicateName = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();
    if (duplicateName) return res.status(409).json({ message: `Name ${username} is taken` });
    if (duplicateEmail) return res.status(409).json({ message: `Email ${email} is taken` });
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPwd, role, active });
    if (newUser) res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password, role, active } = req.body;
    if (!email || !username || !role || typeof active !== 'boolean') {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findById(userId).exec();
    if (!user) return res.status(400).json({ message: 'User not found' });
    const duplicateName = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();
    if (duplicateName && duplicateName?._id.toString() !== userId) {
      return res.status(409).json({ message: `Name ${username} is taken` });
    }
    if (duplicateEmail && duplicateEmail?._id.toString() !== userId) {
      return res.status(409).json({ message: `Email ${email} is taken` });
    }
    user.username = username;
    user.email = email;
    user.role = role;
    user.active = active;
    if (password) user.password = await bcrypt.hash(password, 10);
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).exec();
    if (!user) return res.status(400).json({ message: 'User not found' });
    const collection = await Collection.findOne({ author: userId }).lean().exec();
    if (collection) return res.status(400).json({ message: 'User has assigned collections' });
    await user.deleteOne();
    res.status(200).json({ message: `User with id ${userId} has been deleted`, userId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
