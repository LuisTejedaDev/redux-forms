import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux'
import {store} from './src/store'
import App from './src/index.js';

console.error = (error) => error.apply;
export default () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};