import express from 'express';
import { auth } from '../middleware/auth.js';
import { getIssueByID, getIssues, getIssuesByUser, createIssue } from '../controllers/jira.js';

const router = express.Router();

router.get('/issues', auth, getIssues);
router.get('/user-issues', auth, getIssuesByUser);
router.get('/issues/:issueKey', auth, getIssueByID);
router.post('/issues', auth, createIssue);

export default router;
