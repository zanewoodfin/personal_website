import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Book = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", author: "", review: "" });

  useEffect(() => {
    const url = `/api/v1/books/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        };
      })
      .then((response) => setBook(response))
      .catch(() => navigate("/books"));
  }, [params.id]);

  return(
    <div id="book">
      <h1>{book.title}</h1>
      <p>By: {book.author}</p>
      <p>{book.review}</p>
    </div>
  );
};

export default Book;
