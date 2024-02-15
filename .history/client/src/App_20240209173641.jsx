import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from './components/nav/Navigation'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Recovery from './components/auth/Recovery';
import Cart from './components/cart/Cart';
import Banner from './components/banner/Banner';
import HomePage from './components/homepage/HomePage';
import Footer from './components/footer/Footer';
import Profile from './components/profile/Profile';
import ProfileInfo from './components/profile/ProfileInfo';
import ManageAddress from './components/address/ManageAddress';
import PANUpload from './components/PANupload/PANUpload';
import SavedAuthPayCard from './components/savedauthpayment/SavedAuthPayCard';
import SavedAuthPayUPI from './components/savedauthpayment/SavedAuthPayUPI';
import GiftCard from './components/giftcard/GiftCard';
import Coupons from './components/coupons-offers/Coupons';
import Watchlist from './components/watchlist/Watchlist';
import Orders from './components/orders/Orders';
import SpecificOrders from './components/orders/SpecificOrders';
import ResetPassword from './components/auth/ResetPassword';
import ItemDetails from './components/products/ItemDetails';
import SizeChart from './components/sizechart/SizeChart';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navigation />
        <Banner />
        <HomePage />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/recovery",
    element: (
      <>
        <Recovery />
      </>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <>
        <ResetPassword />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Navigation />
        <Cart />
        <Footer/>
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Navigation />
        <Profile />
        <Footer />
      </>
    ),
    children: [
      {
        path: "",
        element: (
          <>
            <ProfileInfo />
          </>
        ),
      },
      {
        path: "userinfo",
        element: (
          <>
            <ProfileInfo />
          </>
        ),
      },
      {
        path: "manage-address",
        element: (
          <>
            <ManageAddress />
          </>
        ),
      },
      {
        path: "pan-upload",
        element: (
          <>
            <PANUpload />
          </>
        ),
      },
      {
        path: "saved-auth-payment-cards",
        element: (
          <>
            <SavedAuthPayCard />
          </>
        ),
      },
      {
        path: "saved-auth-payment-upi",
        element: (
          <>
            <SavedAuthPayUPI />
          </>
        ),
      },
      {
        path: "saved-auth-giftCards",
        element: (
          <>
            <GiftCard />
          </>
        ),
      },
      {
        path: "myCoupons",
        element: (
          <>
            <Coupons />
          </>
        ),
      },
      {
        path: "reviews-ratings",
        element: (
          <>
            <GiftCard />
          </>
        ),
      },
      {
        path: "watchlist",
        element: (
          <>
            <Watchlist />
          </>
        ),
      },
    ],
  },
  {
    path: "/orders",
    element: (
      <>
        <Navigation />
        <Orders />
        <Footer />
      </>
    ),
  },
  {
    path: "/specific-orders",
    element: (
      <>
        <Navigation />
        <SpecificOrders />
        <Footer />
      </>
    ),
  },
  {
    path: "/item/:id",
    element:(
      <>
        <Navigation/>
        <ItemDetails/>
        <Footer/>
      </>
    ),
    children: [
      {
        path: "",
        element:(
          <>
          <SizeChart/>
          </>
        )
      },
    ]
  },
  {
    path: "/sizechart"

  }
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App
