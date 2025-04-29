import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const BookForm = ({ handleSubmit, initialData }) => {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    if (initialData) {
      setId(initialData.id);
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setReview(initialData.review);
    };
  }, [initialData]);

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  }

  const onSubmit = (event, setFunction) => {
    event.preventDefault();
    const data = { id, title, author, review };
    handleSubmit(data);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="book_title">Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          id="book_title"
          required
          defaultValue={title}
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
          defaultValue={author}
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
          defaultValue={review}
          onChange={(event) => onChange(event, setReview)}
        />
      </Form.Group>
      <Button variant="outline-primary" type="submit">Create Book</Button>
    </Form>
  );
};

export default BookForm;
