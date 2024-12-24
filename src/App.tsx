import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter basename="/">
      <Header />
      <Breadcrumb />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<Home />} />
          <Route path="/pokemon/:name" element={<Details />} />
        </Routes>
      </Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
