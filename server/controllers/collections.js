import CollectionMessage from '../models/collectionMessage.js';

export const getCollections = async (req, res) => {
  try {
    const collectionMessages = await CollectionMessage.find();
    res.status(200).json(collectionMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
