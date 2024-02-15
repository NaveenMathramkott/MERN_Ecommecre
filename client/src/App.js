import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Contact from "./pages/contact/Contact";
import Product from "./pages/product/Product";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/routes/Admin";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import UserRoute from "./components/routes/UserRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
