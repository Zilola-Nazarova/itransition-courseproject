import CollectionMessage from '../models/collectionMessage.js';

export const getCollections = async (req, res) => {
  try {
    const collectionMessages = await CollectionMessage.find();
    res.status(200).json(collectionMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCollection = async (req, res) => {
  const collection = req.body;
  const newCollection = new CollectionMessage(collection);
  try {
    await newCollection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
