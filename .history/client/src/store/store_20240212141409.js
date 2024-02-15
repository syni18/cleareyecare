import {create} from 'zustand';
export const useAuthStore = create((set) => ({
    auth: {
        username: '',
        useremail: '',
        active: false
    },
    setFullname: (username)=> set((state) => ({auth: {...state.auth, username: username}})),
    setUseremail: (useremail)=> set((state) => ({auth: {...state.auth, useremail: useremail}}))
}))


import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import cartReducer from "./reducers/cartReducer"; // We will create this file next

const rootReducer = combineReducers({
  cart: cartReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

