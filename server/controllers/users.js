import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Collection from '../models/collection.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').lean();
    if (!users?.length) {
      return res.status(400).json({ message: 'No users found' });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role, active } = req.body;
    if (!username || !email || !password || !Array.isArray(role) || !role.length || typeof active !== 'boolean') {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const duplicateName = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();
    if (duplicateName || duplicateEmail) {
      return res.status(409).json({ message: 'Duplicate username/email' });
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    const userObject = { username, email, password: hashedPwd, role, active };
    const newUser = new User(userObject);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id, username, email, password, role, active } = req.body;
    if (!_id || !email || !username || !Array.isArray(role) || !role.length || typeof active !== 'boolean') {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id ${_id}`);
    const user = await User.findById(_id).exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const duplicateName = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();
    if ((duplicateName && duplicateName?._id.toString() !== _id) || (duplicateEmail && duplicateEmail?._id.toString() !== _id)) {
      return res.status(409).json({ message: 'Duplicate username/email' });
    }
    user.username = username;
    user.email = email;
    user.role = role;
    user.active = active;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ message: 'User ID required' });
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id ${_id}`);
    const collection = await Collection.findOne({ user: _id }).lean().exec();
    if (collection) {
      return res.status(400).json({ message: 'User has assigned collections' });
    }
    const user = await User.findById(_id).exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    await user.deleteOne();
    res.status(200).json({ message: `User with id ${_id} has been deleted`, _id });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
