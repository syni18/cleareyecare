import  { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/nav/Navigation";
import Footer from "./components/footer/Footer";
import "./App.css"; // Ensure global CSS is imported

// Dynamic imports
const HomePage = lazy(() => import("./components/homepage/HomePage"));
const Login = lazy(() => import("./components/auth/Login"));
const Signup = lazy(() => import("./components/auth/Signup"));
const Recovery = lazy(() => import("./components/auth/Recovery"));
const ProtectedRoute = lazy(() => import("./components/protected/ProtectedRoute"));
const ShoppingBag = lazy(() => import("./components/cart/ShoppingBag"));
const Profile = lazy(() => import("./components/profile/Profile"));
const ProfileInfo = lazy(() => import("./components/profile/ProfileInfo"));
const ManageAddress = lazy(() => import("./components/address/ManageAddress"));
const PANUpload = lazy(() => import("./components/PANupload/PANUpload"));
const SavedAuthPayCard = lazy(() => import("./components/savedauthpayment/SavedAuthPayCard"));
const SavedAuthPayUPI = lazy(() => import("./components/savedauthpayment/SavedAuthPayUPI"));
const GiftCard = lazy(() => import("./components/giftcard/GiftCard"));
const Coupons = lazy(() => import("./components/coupons-offers/Coupons"));
const Watchlist = lazy(() => import("./components/watchlist/Watchlist"));
const Orders = lazy(() => import("./components/orders/Orders"));
const SpecificOrders = lazy(() => import("./components/orders/SpecificOrders"));
const ItemDetails = lazy(() => import("./components/products/ItemDetails"));
const SizeChart = lazy(() => import("./components/sizechart/SizeChart"));
const RateProductForm = lazy(() => import("./components/rateproductform/RateProductForm"));
const ProductView = lazy(() => import("./components/products/ProductView"));
const BillingAddress = lazy(() => import("./components/cart/BillingAddress"));
const CartLogin = lazy(() => import("./components/empty/CartLogin"));
// const Banner = lazy(() => import("./components/banner/Banner"));
const Dashboard = lazy(() => import("./components/game/compnents/Dashboard"));

import { AuthProvider } from "./redux/context/AuthContext";
import { UserProvider } from "./redux/context/UserContext";

// Layout Component
// eslint-disable-next-line react/prop-types
const Layout = ({ children, showHeaderFooter = true }) => (
  <>
    {showHeaderFooter && <Navigation />}
    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    {/*{showHeaderFooter && <Footer />}*/}
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        {/* <Banner /> */}
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout showHeaderFooter={false}>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: (
      <Layout showHeaderFooter={false}>
        <Signup />
      </Layout>
    ),
  },
  {
    path: "/recovery",
    element: (
      <Layout showHeaderFooter={false}>
        <Recovery />
      </Layout>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Layout showHeaderFooter={false}>
        <ProtectedRoute />
      </Layout>
    ),
  },
  {
    path: "/cart",
    element: (
      <Layout>
        <ShoppingBag />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
    children: [
      { path: "", element: <ProfileInfo /> },
      { path: "userinfo", element: <ProfileInfo /> },
      { path: "manage-address", element: <ManageAddress /> },
      { path: "pan-upload", element: <PANUpload /> },
      { path: "saved-auth-payment-cards", element: <SavedAuthPayCard /> },
      { path: "saved-auth-payment-upi", element: <SavedAuthPayUPI /> },
      { path: "saved-auth-giftCards", element: <GiftCard /> },
      { path: "myCoupons", element: <Coupons /> },
      { path: "reviews-ratings", element: <GiftCard /> },
      { path: "watchlist", element: <Watchlist /> },
    ],
  },
  {
    path: "/orders",
    element: (
      <Layout>
        <Orders />
      </Layout>
    ),
  },
  {
    path: "/specific-orders/:id",
    element: (
      <Layout>
        <SpecificOrders />
      </Layout>
    ),
  },
  {
    path: "/item/:id",
    element: (
      <Layout>
        <ItemDetails />
      </Layout>
    ),
    children: [{ path: "", element: <SizeChart /> }],
  },
  {
    path: "/rate&review-pkg",
    element: (
      <Layout>
        <RateProductForm />
      </Layout>
    ),
  },
  {
    path: "/search-items",
    element: (
      <Layout>
        <ProductView />
      </Layout>
    ),
  },
  {
    path: "/cart-address",
    element: (
      <Layout>
        <BillingAddress />
      </Layout>
    ),
  },
  {
    path: "/cart-login",
    element: (
      <Layout>
        <CartLogin />
      </Layout>
    ),
  },
  {
    path: "/game",
    element: (
      <Layout showHeaderFooter={false}>
        <Dashboard />
      </Layout>
    ),
  },
],{future: {v7_fetcherPersist: true}});

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <main>
          <RouterProvider router={router} />
        </main>
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
