import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./redux/store";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";

function App() {
  return (
    <BrowserRouter basename="/">
      <Provider store={store}>
        <Header />
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<Home />} />

          <Route path="/pokemon/:name" element={<Details />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
