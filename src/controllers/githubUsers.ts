import { setRepositories, setUserById, setUsers } from '../redux/slice/githubSlice';
import axiosInstance from '../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, GithubRepository } from '../interfaces/githubInterfaces';

interface dataPage {
    since: number;
    per_page: number;
}

export const getUsers = createAsyncThunk<User[], dataPage>(
    '/users',
    async (data:dataPage, thunkApi) => {
        try {
            
            const response = await axiosInstance.get(`/api/users?since=${data.since}&per_page=${data.per_page}`);
            thunkApi.dispatch(setUsers(response.data));
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

interface dataSingleUser {
    user: any;
}

export const getSingleUser = createAsyncThunk<User, dataSingleUser>(
    '/single-user',
    async (data:dataSingleUser, thunkApi) => {
        try {
            
            const response = await axiosInstance.get(`/api/users/${data.user}/details`);
            // const response = await axiosInstance.get(`/users/${data.user}`);
            
            thunkApi.dispatch(setUserById(response.data));
            
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

interface dataRepository {
    user: any;
}

export const getRepositories = createAsyncThunk<GithubRepository[], dataRepository>(
    '/repositories',
    async (data:dataRepository, thunkApi) => {
        try {
            
            const response = await axiosInstance.get(`/api/users/${data.user}/repos`);
            
            thunkApi.dispatch(setRepositories(response.data));

            return response.data;
            
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

