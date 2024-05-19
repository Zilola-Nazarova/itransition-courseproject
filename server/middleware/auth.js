import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import User from '../models/user.js';

export const auth = async (req, res, next) => {
  try {
    const GOOGLE_API_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const [type, token] = req.headers.authorization.split(' ');
    let decodedData;
    if (type === 'Bearer') {
      decodedData = await axios.get(GOOGLE_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      req.userId = decodedData.sub;
    } else if (type === 'Basic') {
      decodedData = jwt.verify(token, 'test');
      req.userId = decodedData.id;
    } else {
      return res.status(401).json({ message: 'Invalid token type provided. Use Basic or Bearer' });
    }
    const user = await User.findById(req.userId);
    if (!user) return res.status(401).json({ message: 'You are not registered' });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Authorization failed' });
  }
};

export const ownerCheck = async (req, res, next) => {
  try {
    const currentUser = req.userId;
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json(`No user with id ${userId}`);
    if (currentUser !== userId) return res.status(404).json({ message: 'You can not perform actions on behalf of other users' });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Authorization failed' });
  }
};
