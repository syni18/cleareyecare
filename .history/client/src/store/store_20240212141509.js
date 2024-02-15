import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import cartReducer from "./cartReducer"; // We will create this file next
import {create} from 'zustand';
const initialState = {};

const middleware = [thunk];

export const useAuthStore = create((set) => ({
    auth: {
        username: '',
        useremail: '',
        active: false
    },
    setFullname: (username)=> set((state) => ({auth: {...state.auth, username: username}})),
    setUseremail: (useremail)=> set((state) => ({auth: {...state.auth, useremail: useremail}}))
}))



const rootReducer = combineReducers({
  cart: cartReducer,
});


const store = create(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

