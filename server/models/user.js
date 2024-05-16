import mongoose from 'mongoose';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: {
        values: ['User', 'Admin'],
        message: "Role can be only 'User' or 'Admin')"
      },
      default: 'User'
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(AutoIncrement, {
  id: 'user_seq',
  inc_field: 'seq_no',
  start_seq: 0
});

const User = mongoose.model('User', userSchema);

export default User;
