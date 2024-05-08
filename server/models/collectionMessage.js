import mongoose from 'mongoose';

const collectionSchema = mongoose.Schema({
  title: String,
  description: String
});

const CollectionMessage = mongoose.model('CollectionMessage', collectionSchema);

export default CollectionMessage;
