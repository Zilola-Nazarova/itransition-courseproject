import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: `Email ${email} is not registered` });
    }
    const correctPassword = await bcrypt.compare(password, existingUser.password);
    if (!correctPassword) {
      return res.status(404).json({ message: `Invalid password` });
    }
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {expiresIn: '1h'});
    res.status(201).json({ user: existingUser, token: { token, type: 'jwt' } });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmedPassword } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const duplicateName = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();
    if (duplicateName) {
      return res.status(409).json({ message: `Name ${username} is taken` });
    }
    if (duplicateEmail) {
      return res.status(409).json({ message: `Email ${email} is taken` });
    }
    if (password !== confirmedPassword) {
      return res.status(400).json({ message: 'Incorrect password confirmation' });
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPwd });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', {expiresIn: '1h'});
    if (newUser) {
      res.status(201).json({  user: newUser, token: { token, type: 'jwt' } });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
