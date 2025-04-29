import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from './BookForm';

const EditBook = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

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

  const handleSubmit = (data) => {
    const id = data.id;
    delete data.id;
    const url = `/api/v1/books/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "PUT",
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
      <h1>Edit Book</h1>
      <BookForm handleSubmit={handleSubmit} initialData={book}/>
    </>
  );
};

export default EditBook;
