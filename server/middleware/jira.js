import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;
const projectKey = process.env.PROJECT_KEY;
export const baseUrl = `https://${domain}.atlassian.net`;
const auth = { username, password };
const priorities = {
  low: '4',
  medium: '3',
  high: '2'
};
export const config = { headers: { 'Content-Type': 'application/json' }, auth };

export const createUser = async (email) => {
  const data = {
    emailAddress: email,
    products: ['jira-software']
  };
  const response = await axios.post(`${baseUrl}/rest/api/3/user`, data, config);
  return response.data;
};

export const findUser = async (email) => {
  const response = await axios.get(`${baseUrl}/rest/api/3/user/search?query=${email}`, config);
  return response.data;
};

export const generateData = (priority, accountId, description, url, collectionData) => {
  const data = {
    fields: {
      project: { key: projectKey },
      issuetype: { id: '10005' },
      summary: 'Issue from Collection of Things page',
      priority: { id: priorities[priority] },
      reporter: { id: accountId },
      description: {
        content: [
          {
            content: [
              {
                text: description,
                type: 'text'
              }
            ],
            type: 'paragraph'
          }
        ],
        type: 'doc',
        version: 1
      },
      customfield_10034: url,
      customfield_10033: collectionData
    }
  };
  return data;
};
