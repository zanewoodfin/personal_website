import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewBook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [review, setReview] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  }

  const onSubmit = (event, setFunction) => {
    event.preventDefault();
    const url = "/api/v1/books"
    const body = { title, author, review };
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        };
      })
      .then((response) => navigate(`/books/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <h1>Add a new book</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="book_title">Title</label>
        <input
          type="text"
          name="title"
          id="book_title"
          required
          onChange={(event) => onChange(event, setTitle)}
        />
        <label htmlFor="book_author">Author</label>
        <input
          type="text"
          name="author"
          id="book_author"
          required
          onChange={(event) => onChange(event, setAuthor)}
        />
        <label htmlFor="book_review">Review</label>
        <textarea
          name="review"
          id="book_review"
          onChange={(event) => onChange(event, setReview)}
        />
        <input type="submit" value="Create Book" />
      </form>
    </>
  );
};
export default NewBook;
