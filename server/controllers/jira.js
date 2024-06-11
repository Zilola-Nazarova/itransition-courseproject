import axios from 'axios';
import User from '../models/user.js';
import Collection from '../models/collection.js';
import {
  createUser, findUser, generateData, config, baseUrl
} from '../middleware/jira.js';

export const createIssue = async (req, res) => {
  try {
    const { url, collId, description, priority } = req.body;
    const currentUser = await User.findById(req.userId).lean();
    let collectionData = 'Not defined';
    if (collId) {
      const collection = await Collection.findById(collId).lean();
      collectionData = `title: ${collection.title}, id: ${collection._id}`;
    }
    let jiraUser = await findUser(currentUser.email);
    if (jiraUser.length === 0) {
      jiraUser = await createUser(currentUser.email);
    } else {
      jiraUser = jiraUser[0];
    }
    const data = generateData(priority, jiraUser.accountId, description, url, collectionData);
    const response = await axios.post(`${baseUrl}/rest/api/3/issue`, data, config);
    res.status(201).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const getIssues = async (req, res) => {
  try {
    const { startAt, maxResults } = req.query;
    const response = await axios.get(
      `${baseUrl}/rest/api/3/search?fields=summary,description,status&startAt=${startAt}&maxResults=${maxResults}`,
      config
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const getIssuesByUser = async (req, res) => {
  try {
    const { startAt, maxResults } = req.query;
    const currentUser = await User.findById(req.userId).lean();
    const jiraUser = await findUser(currentUser.email);
    if (jiraUser.length === 0) {
      return res.status(200).json({ message: 'User has no tickets' });
    }
    const response = await axios.get(
      `${baseUrl}/rest/api/3/search?jql=reporter=${jiraUser[0].accountId}&fields=summary,description,status&startAt=${startAt}&maxResults=${maxResults}`,
      config
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const getIssueByID = async (req, res) => {
  try {
    const { issueKey } = req.params;
    const response = await axios.get(`${baseUrl}/rest/api/3/issue/${issueKey}?fields=summary,description,status`, config);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};
