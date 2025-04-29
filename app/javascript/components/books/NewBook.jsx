import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
      <h1>New Book</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="book_title">Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            id="book_title"
            required
            onChange={(event) => onChange(event, setTitle)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="book_author">Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            id="book_author"
            required
            onChange={(event) => onChange(event, setAuthor)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="book_review">Review</Form.Label>
          <Form.Control
            as="textarea"
            rows="10"
            name="review"
            id="book_review"
            onChange={(event) => onChange(event, setReview)}
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">Create Book</Button>
      </Form>
    </>
  );
};
export default NewBook;
