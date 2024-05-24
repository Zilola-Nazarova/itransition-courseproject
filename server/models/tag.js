import mongoose from 'mongoose';

const tagSchema = mongoose.Schema(
  {
    tagname: {
      type: String,
      unique: true,
      required: true
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ItemTag'
    }]
  },
  {
    timestamps: true
  }
);

tagSchema.index({ tagname: 'text' });

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
