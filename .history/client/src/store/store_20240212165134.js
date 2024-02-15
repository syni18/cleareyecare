// import { combineReducers, applyMiddleware } from "redux";
// import {thunk} from "redux-thunk";
// import cartReducer from "./cartReducer"; // We will create this file next
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
