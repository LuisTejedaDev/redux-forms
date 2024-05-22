import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [
        {
            id: 1,
            name: 'Matias Jesús',
            gender: 1
        },
        {
            id: 2,
            name: 'Veronica Castro',
            gender: 2
        },
    ],
    actionType: 1,
    section: 1,
    temporalId: null,
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setActionType: (state, action) => {state.actionType = action.payload},
        setSection: (state, action) => {state.section = action.payload},
        setTemporalId: (state, action) => {state.temporalId = action.payload},
        addUser: (state, action) => {state.users = [action.payload, ...state.users]},
        editUser: (state, action) => {state.users = state.users.map(x => x.id === action.payload.id ? ({...x, ...action.payload.edited}) : x)},
        deleteUser: (state, action) => {state.users = state.users.filter(x => x.id !== action.payload)},
    }
})

export const {setActionType, setSection, setTemporalId, addUser, editUser, deleteUser} = navSlice.actions

export const selectUsers = (state) => state.navUsers.users;
export const selectActionType = (state) => state.navUsers.actionType;
export const selectSection = (state) => state.navUsers.section;
export const selectTemporalId = (state) => state.navUsers.temporalId;

export default navSlice.reducer