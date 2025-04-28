import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Books from "../components/books/Books";
import Book from "../components/books/Book";
import NewBook from "../components/books/NewBook";

export default (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/books" exact element={<Books />} />
      <Route path="/books/new" element={<NewBook />} />
      <Route path="/books/:id" exact element={<Book />} />
    </Routes>
  </Router>
);
