import ItemMessage from '../models/itemMessage.js';

export const getItems = async (req, res) => {
  try {
    const itemMessages = await ItemMessage.find();
    res.status(200).json(itemMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
