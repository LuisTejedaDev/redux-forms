import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {appSlice, formSlice, userSlice} from './slices';
import thunk from 'redux-thunk';

applyMiddleware
export const store = configureStore({
    reducer: {
        navApp: appSlice,
        navReduxForm: formSlice,
        navUsers: userSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
}, applyMiddleware(thunk))