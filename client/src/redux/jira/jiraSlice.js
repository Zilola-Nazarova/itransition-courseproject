import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const createIssue = createAsyncThunk(
  'jira/createIssue',
  async (formData, thunkAPI) => {
    try {
      const created = await API.post('jira/issues', formData);
      const resp = await API.get(`jira/issues/${created.data.key}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getIssues = createAsyncThunk(
  'jira/getIssues',
  async ({ startAt, maxResults }, thunkAPI) => {
    try {
      const resp = await API.get(`jira/issues?startAt=${startAt}&maxResults=${maxResults}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getIssueByID = createAsyncThunk(
  'jira/getIssueByID',
  async (issueKey, thunkAPI) => {
    try {
      const resp = await API.get(`jira/issues/${issueKey}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getIssuesByUser = createAsyncThunk(
  'jira/getIssuesByUser',
  async ({ startAt, maxResults }, thunkAPI) => {
    try {
      const resp = await API.get(`jira/user-issues?startAt=${startAt}&maxResults=${maxResults}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  pageCount: null,
  issue: null,
  newIssueKey: null,
  value: [],
  error: undefined,
  isLoading: false,
};

export const jiraSlice = createSlice({
  name: 'jira',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIssues.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getIssues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = action.payload.issues;
        state.pageCount = Math.ceil(
          action.payload.total / action.payload.maxResults,
        );
      })
      .addCase(getIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.value = [];
      })
      .addCase(getIssuesByUser.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getIssuesByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = action.payload.issues;
        state.pageCount = Math.ceil(
          action.payload.total / action.payload.maxResults,
        );
      })
      .addCase(getIssuesByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.value = [];
      })
      .addCase(getIssueByID.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getIssueByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.issue = action.payload;
      })
      .addCase(getIssueByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.issue = null;
      })
      .addCase(createIssue.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.newIssueKey = action.payload.key;
        state.value.push(action.payload);
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.newIssueKey = null;
      });
  },
});

export default jiraSlice.reducer;
