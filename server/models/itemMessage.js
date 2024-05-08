import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
  title: String,
  description: String
});

const ItemMessage = mongoose.model('ItemMessage', itemSchema);

export default ItemMessage;
