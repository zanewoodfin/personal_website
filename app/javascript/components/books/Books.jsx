import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const url = "/api/v1/books";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        };
      })
      .then((response) => setBooks(response))
      .catch(() => navigate("/"));
  }, []);

  const allBooks = books.map((book, index) => (
    <div key={index}>
      <p>
        <Link to={`/books/${book.id}`}>
          {book.title}
        </Link>
      </p>
    </div>
  ));

  const noBooks = (
    <p>No books have been added.</p>
  );

  return (
    <>
      <Link to="/books/new">
        Create New Book
      </Link>
      <div id="books">
        {books.length > 0 ? allBooks : noBooks}
      </div>
    </>
  );
};

export default Books;
