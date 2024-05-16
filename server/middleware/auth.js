import jwt from 'jsonwebtoken';
import axios from 'axios';

const auth = async (req, res, next) => {
  try {
    const GOOGLE_API_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const type = req.headers.authorization.split(' ')[0];
    const token = req.headers.authorization.split(' ')[1];
    let decodedData;
    if (type === 'Bearer') {
      decodedData = await axios.get(GOOGLE_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      req.userId = decodedData.sub;
    } else if (type === 'Basic') {
      decodedData = jwt.verify(token, 'test');
      req.userId = decodedData.id;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'You are not authorized to access this page!' });
  }
}

export default auth;
