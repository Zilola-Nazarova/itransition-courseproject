import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import collectionRoutes from './routes/collection.js';
import itemRoutes from './routes/item.js';
import likeRoutes from './routes/like.js';
import commentRoutes from './routes/comment.js';
import tagRoutes from './routes/tag.js';
import authRoutes from './routes/auth.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
userRoutes.use('/:userId/collections', collectionRoutes);
collectionRoutes.use('/:collectionId/items', itemRoutes);
itemRoutes.use('/:itemId/likes', likeRoutes);
itemRoutes.use('/:itemId/comments', commentRoutes);
app.use('/tags', tagRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
