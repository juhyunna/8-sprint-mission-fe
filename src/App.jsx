import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/global/global.css";
import "./styles/font/fonts.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Registration from "./pages/Registration/Registration";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Privacy from "./pages/Privacy/Privacy";
import FAQ from "./pages/FAQ/FAQ";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Products />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
