import {create} from 'zustand';
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../components/cart/"; // Ensure this path is correct
import thunk from "redux-thunk";

export const useAuthStore = create((set) => ({
    auth: {
        username: '',
        useremail: '',
        active: false
    },
    setFullname: (username)=> set((state) => ({auth: {...state.auth, username: username}})),
    setUseremail: (useremail)=> set((state) => ({auth: {...state.auth, useremail: useremail}}))
}))

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
