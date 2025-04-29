import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from './BookForm';

const NewBook = () => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const url = "/api/v1/books"
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      <BookForm handleSubmit={handleSubmit} initialData={null}/>
    </>
  );
};

export default NewBook;
