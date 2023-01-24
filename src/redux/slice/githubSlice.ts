import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GithubUser } from '../../interfaces/githubInterfaces';

const initialState: GithubUser = {
    singleUser: null,
    users:[],
    repositories:[]
}

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        setUsers:(state, action:PayloadAction<any>) =>{
            // state.users = action.payload.sort((a:any,b:any)=>(a.id - b.id))
            state.users = action.payload
        },
        setUserById:(state, action) =>{
            state.singleUser = action.payload
        },
        setRepositories:(state, action:PayloadAction<any>) =>{
            state.repositories = action.payload
        }
    }
});

export const { setUsers, setUserById, setRepositories } = userSlice.actions;

export default userSlice.reducer;