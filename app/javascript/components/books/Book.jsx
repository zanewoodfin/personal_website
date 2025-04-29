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

  const deleteBook = () => {
    const url = `/api/v1/books/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        };
      })
      .then(() => navigate("/books"))
      .catch((error) => console.log(error.message));
  };

  return(
    <div id="book">
      <h1>{book.title}</h1>
      <p>By: {book.author}</p>
      <p>{book.review}</p>
      <div>
        <Button variant="outline-primary" onClick={deleteBook}>
          Delete Book
        </Button>
      </div>
    </div>
  );
};

export default Book;
