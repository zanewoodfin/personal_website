import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      .then((response) => {
        setBooks(response)
        setLoading(false)
      })
      .catch(() => navigate("/"));
  }, []);

  const allBooks = books.map((book, index) => (
    <tr key={index}>
      <td>
        <Link to={`/books/${book.id}`}>
          {book.title}
        </Link>
      </td>
      <td>
        {book.author}
      </td>
    </tr>
  ));

  const noBooks = (
    <tr>
      <td colSpan="3">
        {
          loading ? (
            <div className="text-center">
              <Spinner animation="border"/>
            </div>
          ) : (
            "No books have been added."
          )
        }
      </td>
    </tr>
  );

  return (
    <>
      <h1>Books</h1>
      <Table hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? allBooks : noBooks}
        </tbody>
      </Table>
    </>
  );
};

export default Books;
