import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const type = req.headers.authorization.split(' ')[0];
    const token = req.headers.authorization.split(' ')[1];
    let decodedData;
    if (type === 'Bearer') {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    } else if (type === 'Basic') {
      decodedData = jwt.verify(token, 'test');
      req.userId = decodedData?.indexOf;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are not authorized to access this page!' });
  }
}

export default auth;
