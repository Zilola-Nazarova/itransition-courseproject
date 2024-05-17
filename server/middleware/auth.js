import jwt from 'jsonwebtoken';
import axios from 'axios';
import User from '../models/user.js';

const auth = async (req, res, next) => {
  try {
    const GOOGLE_API_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const type = req.headers.authorization.split(' ')[0];
    const token = req.headers.authorization.split(' ')[1];
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
    if (!user) return res.status(401).json({ message: 'This user is not registered' });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Authorization failed' });
  }
};

export default auth;
