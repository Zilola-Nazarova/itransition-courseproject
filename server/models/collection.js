import mongoose from 'mongoose';

const collectionSchema = mongoose.Schema({
  title: String,
  description: String
});

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;
