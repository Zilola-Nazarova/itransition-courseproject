import mongoose from 'mongoose';

export const checkParams = async (req, res, next) => {
  try {
    const params = req.params;
    Object.values(params).forEach((value, index) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return res.status(404).json(`Invalid param ${value}`);
      }
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
